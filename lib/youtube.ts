export type YoutubeVideo = {
  id: string;
  title: string;
  published: string;
  thumbnail: string;
  url: string;
  views?: string;
};

export function formatViews(views?: string) {
  if (!views) return "";
  const n = Number(views);
  if (!Number.isFinite(n)) return "";
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M views`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K views`;
  return `${n} views`;
}

export function formatPublished(iso: string) {
  if (!iso) return "";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}
