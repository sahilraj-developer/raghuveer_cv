import { cacheLife } from "next/cache";

export type InstagramMedia = {
  id: string;
  permalink: string;
  caption: string;
  image: string;
  kind: "reel" | "post";
  live: boolean;
};

type GraphMedia = {
  id: string;
  caption?: string;
  media_type?: string;
  media_product_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
};

function kindOf(item: GraphMedia): "reel" | "post" {
  if (item.media_product_type === "REELS" || item.media_type === "VIDEO") {
    return "reel";
  }
  return "post";
}

function fromEnvUrls(): InstagramMedia[] {
  const raw = process.env.INSTAGRAM_POST_URLS ?? "";
  return raw
    .split(",")
    .map((url) => url.trim())
    .filter(Boolean)
    .map((permalink, index) => {
      try {
        const parsed = new URL(permalink);
        const host = parsed.hostname.toLowerCase();
        if (!["instagram.com", "www.instagram.com"].includes(host)) return null;
        if (!["http:", "https:"].includes(parsed.protocol)) return null;
        return {
          id: `url-${index}`,
          permalink: parsed.toString(),
          caption: parsed.pathname.includes("/reel/") ? "Latest Reel" : "Latest post",
          image: "",
          kind: parsed.pathname.includes("/reel/") ? ("reel" as const) : ("post" as const),
          live: true,
        };
      } catch {
        return null;
      }
    })
    .filter((item): item is InstagramMedia => item !== null);
}

async function fromGraph(): Promise<InstagramMedia[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return [];

  const url = new URL("https://graph.instagram.com/me/media");
  url.searchParams.set(
    "fields",
    "id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp",
  );
  url.searchParams.set("limit", "12");
  url.searchParams.set("access_token", token);

  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(8_000),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as { data?: GraphMedia[] };
    return (json.data ?? []).map((item) => ({
      id: item.id,
      permalink: item.permalink,
      caption: item.caption?.split("\n")[0] ?? "",
      image: item.thumbnail_url || item.media_url || "",
      kind: kindOf(item),
      live: true,
    }));
  } catch {
    return [];
  }
}

export async function getInstagramMedia(): Promise<InstagramMedia[]> {
  "use cache";
  cacheLife("hours");

  const live = await fromGraph();
  if (live.length) return live.slice(0, 8);

  const urls = fromEnvUrls();
  if (urls.length) return urls.slice(0, 8);

  return [];
}
