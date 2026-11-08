"use client";

import { useEffect } from "react";

export function VideoLightbox({
  videoId,
  title,
  shorts = false,
  onClose,
}: {
  videoId: string | null;
  title?: string;
  shorts?: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!videoId) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [videoId, onClose]);

  if (!videoId) return null;

  const src = shorts
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
    : `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <div
      className="fixed inset-0 z-80 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title ?? "Play video"}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute top-5 right-5 text-sm tracking-widest uppercase text-foreground/70 hover:text-foreground"
      >
        Close
      </button>
      <div
        className={
          shorts
            ? "relative aspect-9/16 w-full max-w-sm overflow-hidden rounded-2xl bg-black"
            : "relative aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black"
        }
        onClick={(event) => event.stopPropagation()}
      >
        <iframe
          title={title ?? "YouTube video"}
          src={src}
          className="h-full w-full"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
        />
      </div>
    </div>
  );
}
