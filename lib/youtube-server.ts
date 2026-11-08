import { cacheLife } from "next/cache";
import { site } from "@/lib/site";
import type { YoutubeVideo } from "@/lib/youtube";

function playlistId(channelId: string, prefix: "UULF" | "UUSH") {
  if (!channelId.startsWith("UC")) return "";
  return `${prefix}${channelId.slice(2)}`;
}

function decodeXml(value: string) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function inner(block: string, tag: string) {
  const match = block.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? decodeXml(match[1].trim()) : "";
}

function attr(block: string, tag: string, name: string) {
  const match = block.match(new RegExp(`<${tag}[^>]*\\s${name}="([^"]+)"[^>]*\\/?\\>`, "i"));
  return match ? decodeXml(match[1]) : "";
}

function parseFeed(xml: string): YoutubeVideo[] {
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) ?? [];
  return entries.map((entry) => {
    const id = inner(entry, "yt:videoId");
    const title = inner(entry, "title");
    const published = inner(entry, "published");
    const thumbnail = attr(entry, "media:thumbnail", "url") || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    const link = attr(entry, "link", "href") || `https://www.youtube.com/watch?v=${id}`;
    const views = attr(entry, "media:statistics", "views");
    return { id, title, published, thumbnail, url: link, views };
  }).filter((video) => video.id && video.title);
}

async function fetchPlaylist(id: string): Promise<YoutubeVideo[]> {
  if (!id) return [];
  try {
    const res = await fetch(`https://www.youtube.com/feeds/videos.xml?playlist_id=${id}`, {
      headers: { "user-agent": "RaghuveerPortfolio/1.0" },
      signal: AbortSignal.timeout(8_000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    return parseFeed(await res.text()).slice(0, 8);
  } catch {
    return [];
  }
}

export async function getYoutubeVideos(channelId = site.youtube.channelId): Promise<YoutubeVideo[]> {
  "use cache";
  cacheLife("hours");
  return fetchPlaylist(playlistId(channelId, "UULF"));
}

export async function getYoutubeShorts(channelId = site.youtube.channelId): Promise<YoutubeVideo[]> {
  "use cache";
  cacheLife("hours");
  return fetchPlaylist(playlistId(channelId, "UUSH"));
}
