import { cacheLife } from "next/cache";

export type FacebookPost = {
  id: string;
  message: string;
  permalink: string;
  image: string;
  created: string;
};

type GraphPost = {
  id: string;
  message?: string;
  permalink_url?: string;
  created_time?: string;
  full_picture?: string;
};

export async function getFacebookPosts(): Promise<FacebookPost[]> {
  "use cache";
  cacheLife("hours");
  const pageId = process.env.FACEBOOK_PAGE_ID?.trim();
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN?.trim();
  if (!pageId || !token) return [];

  const version = process.env.FACEBOOK_GRAPH_API_VERSION?.trim() || "v27.0";
  const url = new URL(`https://graph.facebook.com/${version}/${encodeURIComponent(pageId)}/feed`);
  url.searchParams.set("fields", "id,message,permalink_url,created_time,full_picture");
  url.searchParams.set("limit", "6");
  url.searchParams.set("access_token", token);
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(8_000), next: { revalidate: 3600 } });
    if (!response.ok) return [];
    const json = (await response.json()) as { data?: GraphPost[] };
    return (json.data ?? [])
      .filter((post) => post.permalink_url && (post.message || post.full_picture))
      .slice(0, 3)
      .map((post) => ({ id: post.id, message: post.message ?? "Facebook update", permalink: post.permalink_url!, image: post.full_picture ?? "", created: post.created_time ?? "" }));
  } catch {
    return [];
  }
}
