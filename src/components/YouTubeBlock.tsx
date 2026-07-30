"use client";

import { useState } from "react";
import { getYouTubeEmbedUrl, getYouTubeThumbnailUrl, getYouTubeWatchUrl } from "@/lib/youtube";
import { trackYouTubePlay } from "@/lib/analytics/umami";

interface YouTubeBlockProps {
  videoId: string;
  title: string;
  description?: string;
  startAt?: number;
  materialSlug?: string;
}

export default function YouTubeBlock({ videoId, title, description, startAt, materialSlug }: YouTubeBlockProps) {
  const [activated, setActivated] = useState(false);
  const thumbnailUrl = getYouTubeThumbnailUrl(videoId);
  const embedUrl = getYouTubeEmbedUrl(videoId, startAt);
  const watchUrl = getYouTubeWatchUrl(videoId);

  const handleActivate = () => {
    setActivated(true);
    if (materialSlug) {
      trackYouTubePlay(materialSlug, videoId);
    }
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-moss-950 shadow-[0_24px_56px_-32px_rgba(38,40,31,0.45)]">
      <div className="aspect-video">
        {activated ? (
          <iframe
            className="h-full w-full"
            src={embedUrl}
            title={title}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={handleActivate}
            className="group relative h-full w-full"
            aria-label={`Смотреть видео: ${title}`}
          >
            <img
              src={thumbnailUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/30">
              <div className="grid size-16 place-items-center rounded-full bg-lime-500 text-moss-950 shadow-lg transition-transform duration-300 group-hover:scale-110 sm:size-20">
                <svg
                  className="size-8 sm:size-10"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </button>
        )}
      </div>
      {description && (
        <div className="border-t border-moss-800 bg-moss-900 px-4 py-3 sm:px-5">
          <p className="text-[13px] leading-relaxed text-milk/70">{description}</p>
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1.5 text-[12px] font-medium text-lime-400 underline decoration-lime-400/40 underline-offset-2 transition-colors hover:text-lime-300"
          >
            Смотреть на YouTube
            <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M7 17L17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
