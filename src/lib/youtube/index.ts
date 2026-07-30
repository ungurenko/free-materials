// ============================================================
//  YouTube: валидация ID и нормализация URL
// ============================================================

const YOUTUBE_ID_REGEX = /^[a-zA-Z0-9_-]{11}$/;

const YOUTUBE_URL_PATTERNS = [
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/,
  /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
];

export function isValidYouTubeId(id: string): boolean {
  return YOUTUBE_ID_REGEX.test(id);
}

export function extractYouTubeId(input: string): string | null {
  const trimmed = input.trim();

  if (isValidYouTubeId(trimmed)) {
    return trimmed;
  }

  for (const pattern of YOUTUBE_URL_PATTERNS) {
    const match = trimmed.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
}

export function getYouTubeEmbedUrl(videoId: string, startAt?: number): string {
  if (!isValidYouTubeId(videoId)) {
    throw new Error(`Invalid YouTube video ID: ${videoId}`);
  }
  const base = `https://www.youtube-nocookie.com/embed/${videoId}`;
  if (startAt && startAt > 0) {
    return `${base}?start=${startAt}`;
  }
  return base;
}

export function getYouTubeWatchUrl(videoId: string): string {
  if (!isValidYouTubeId(videoId)) {
    throw new Error(`Invalid YouTube video ID: ${videoId}`);
  }
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export function getYouTubeThumbnailUrl(videoId: string): string {
  if (!isValidYouTubeId(videoId)) {
    throw new Error(`Invalid YouTube video ID: ${videoId}`);
  }
  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}
