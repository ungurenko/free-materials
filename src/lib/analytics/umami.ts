// ============================================================
//  Analytics: Umami events с no-op fallback
// ============================================================

import { siteConfig } from "@/config/site";

type AnalyticsEvent =
  | { name: "material_open"; props: { material_slug: string } }
  | { name: "prompt_copy"; props: { material_slug: string; prompt_id: string } }
  | { name: "social_click"; props: { platform: string; placement: string } }
  | { name: "promo_click"; props: { promo_id: string } }
  | { name: "youtube_play"; props: { material_slug: string; video_id: string } }
  | { name: "telegram_cta_click"; props: { placement: string } };

declare global {
  interface Window {
    umami?: (eventName: string, props?: Record<string, string>) => void;
  }
}

function isAnalyticsEnabled(): boolean {
  return siteConfig.analytics.umami.enabled && typeof window !== "undefined" && typeof window.umami === "function";
}

export function trackEvent(event: AnalyticsEvent): void {
  if (!isAnalyticsEnabled()) return;

  try {
    window.umami!(event.name, event.props as Record<string, string>);
  } catch {
    // Silent fail — analytics should never break the site
  }
}

export function trackMaterialOpen(slug: string): void {
  trackEvent({ name: "material_open", props: { material_slug: slug } });
}

export function trackPromptCopy(slug: string, promptId: string): void {
  trackEvent({ name: "prompt_copy", props: { material_slug: slug, prompt_id: promptId } });
}

export function trackSocialClick(platform: string, placement: string): void {
  trackEvent({ name: "social_click", props: { platform, placement } });
}

export function trackPromoClick(promoId: string): void {
  trackEvent({ name: "promo_click", props: { promo_id: promoId } });
}

export function trackYouTubePlay(slug: string, videoId: string): void {
  trackEvent({ name: "youtube_play", props: { material_slug: slug, video_id: videoId } });
}

export function trackTelegramCtaClick(placement: string): void {
  trackEvent({ name: "telegram_cta_click", props: { placement } });
}
