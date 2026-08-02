// ============================================================
//  Analytics: Umami events с no-op fallback
// ============================================================

import { siteConfig } from "@/config/site";

type AnalyticsEvent =
  | {
      name: "prompt_copy";
      props: { material_slug: string; prompt_id: string };
    }
  | {
      name: "promo_click";
      props: { promo_id: string; placement: "home_after_hero" };
    };

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

export function trackPromptCopy(slug: string, promptId: string): void {
  trackEvent({ name: "prompt_copy", props: { material_slug: slug, prompt_id: promptId } });
}
