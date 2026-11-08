"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowIcon, PlayIcon } from "@/components/icons";
import { VideoLightbox } from "@/components/video-lightbox";
import {
  formatPublished,
  formatViews,
  type YoutubeVideo,
} from "@/lib/youtube";
import type { InstagramMedia } from "@/lib/instagram";
import { site } from "@/lib/site";

export function HeroFeature({ video }: { video?: YoutubeVideo }) {
  const [open, setOpen] = useState(false);
  if (!video) {
    return (
      <a
        href={site.youtube.url}
        className="group relative block overflow-hidden rounded-[28px] border border-line bg-[#101923] aspect-video"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,165,116,0.22),transparent_45%)]" />
        <div className="absolute inset-0 flex flex-col justify-end p-8">
          <p className="text-xs tracking-[0.28em] uppercase text-gold">YouTube</p>
          <p className="mt-3 max-w-md font-serif text-3xl">
            Add your channel ID to show the latest upload here.
          </p>
        </div>
      </a>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full overflow-hidden rounded-[28px] border border-line text-left"
      >
        <Image
          src={video.thumbnail}
          alt={video.title}
          width={1280}
          height={720}
          className="aspect-[16/10] w-full object-cover transition duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 1024px) 100vw, 58vw"
          priority
          fetchPriority="high"
          loading="eager"
        />
        <span className="absolute top-4 right-4 grid h-12 w-12 place-items-center rounded-full bg-foreground text-background shadow-lg transition group-hover:scale-105 sm:h-14 sm:w-14">
          <PlayIcon className="h-6 w-6 ml-0.5" />
        </span>
        <div className="border-t border-line bg-[#100f0d] px-5 py-5 sm:px-6 sm:py-6">
          <p className="text-xs tracking-[0.28em] uppercase text-gold">Latest video</p>
          <h2 className="mt-2 max-w-xl font-serif text-2xl leading-tight text-[#fffaf0] sm:text-3xl">{video.title}</h2>
          <p className="mt-2 text-sm text-muted sm:text-base">
            {[formatViews(video.views), formatPublished(video.published)]
              .filter(Boolean)
              .join(" · ")}
          </p>
        </div>
      </button>
      <VideoLightbox
        videoId={open ? video.id : null}
        title={video.title}
        onClose={() => setOpen(false)}
      />
    </>
  );
}

export function VideosGrid({ videos }: { videos: YoutubeVideo[] }) {
  const [active, setActive] = useState<YoutubeVideo | null>(null);
  const rest = videos.slice(1, 7);

  if (!rest.length) {
    return (
      <p className="text-muted">
        Connect `YOUTUBE_CHANNEL_ID` to pull the latest long-form uploads
        automatically.
      </p>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActive(video)}
            className="group text-left"
          >
            <div className="relative overflow-hidden rounded-2xl border border-line">
              <Image
                src={video.thumbnail}
                alt={video.title}
                width={640}
                height={360}
                className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading="lazy"
              />
              <span className="absolute right-3 bottom-3 grid h-9 w-9 place-items-center rounded-full bg-black/70 text-foreground">
                <PlayIcon className="h-4 w-4 ml-px" />
              </span>
            </div>
            <h3 className="mt-3 text-[15px] leading-snug">{video.title}</h3>
            <p className="mt-1 text-xs text-muted">
              {[formatViews(video.views), formatPublished(video.published)]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </button>
        ))}
      </div>
      <VideoLightbox
        videoId={active?.id ?? null}
        title={active?.title}
        onClose={() => setActive(null)}
      />
    </>
  );
}

export function ShortsRow({ shorts }: { shorts: YoutubeVideo[] }) {
  const [active, setActive] = useState<YoutubeVideo | null>(null);

  if (!shorts.length) {
    return (
      <p className="text-muted">
        Shorts appear here from your channel’s public Shorts playlist as soon
        as a channel ID is set.
      </p>
    );
  }

  return (
    <>
      <div className="mask-fade no-scrollbar -mx-6 flex gap-4 overflow-x-auto px-6 pb-2">
        {shorts.map((short) => (
          <button
            key={short.id}
            type="button"
            onClick={() => setActive(short)}
            className="group w-45 shrink-0 text-left sm:w-52.5"
          >
            <div className="relative overflow-hidden rounded-[22px] border border-line">
              <Image
                src={`https://i.ytimg.com/vi/${short.id}/hq720.jpg`}
                alt={short.title}
                width={420}
                height={746}
                className="aspect-9/16 w-full object-cover transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 180px, 210px"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-black/10" />
              <span className="absolute top-3 left-3 rounded-full bg-black/55 px-2.5 py-1 text-[10px] tracking-[0.2em] uppercase">
                Short
              </span>
              <span className="absolute top-1/2 left-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-foreground/90 text-background opacity-0 transition group-hover:opacity-100">
                <PlayIcon className="h-5 w-5 ml-0.5" />
              </span>
              <p className="absolute inset-x-3 bottom-3 line-clamp-2 text-sm">{short.title}</p>
            </div>
          </button>
        ))}
      </div>
      <VideoLightbox
        videoId={active?.id ?? null}
        title={active?.title}
        shorts
        onClose={() => setActive(null)}
      />
    </>
  );
}

export function InstagramGrid({ items }: { items: InstagramMedia[] }) {
  if (!items.length) {
    return (
      <a
        href={site.instagram.url}
        target="_blank"
        rel="noreferrer"
        className="group flex min-h-48 items-end overflow-hidden rounded-2xl border border-line bg-[radial-gradient(circle_at_30%_20%,rgba(114,213,232,0.22),transparent_45%),#101923] p-7"
      >
        <div>
          <p className="text-xs tracking-[0.28em] text-gold uppercase">Instagram</p>
          <p className="mt-3 font-serif text-3xl">Follow {site.instagram.handle}</p>
          <p className="mt-2 text-sm text-muted">See the latest Reels, posts, and behind-the-scenes updates.</p>
        </div>
      </a>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
      {items.map((item, index) => (
        <a
          key={item.id}
          href={item.permalink}
          target="_blank"
          rel="noreferrer"
          className={`group relative overflow-hidden rounded-2xl border border-line ${
            index === 0 ? "md:col-span-2 md:row-span-2" : ""
          }`}
        >
          {item.image ? (
            <Image
              src={item.image}
              alt={item.caption || "Instagram"}
              width={800}
              height={1000}
              className={`w-full object-cover transition duration-500 group-hover:scale-105 ${
                index === 0 ? "aspect-4/5 h-full" : "aspect-4/5"
              }`}
              sizes={index === 0 ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 50vw, 16vw"}
              loading="lazy"
              unoptimized={item.live && item.image.includes("instagram")}
            />
          ) : (
            <div className="flex aspect-4/5 items-end bg-[#171412] p-4">
              <p className="text-sm">{item.caption}</p>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/35" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-3 opacity-0 transition group-hover:opacity-100">
            <span className="text-[10px] tracking-[0.22em] uppercase">
              {item.kind === "reel" ? "Reel" : "Post"}
            </span>
            <ArrowIcon className="h-4 w-4" />
          </div>
        </a>
      ))}
    </div>
  );
}
