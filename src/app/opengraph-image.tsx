import {
  createSocialPreview,
  socialPreviewAlt,
  socialPreviewContentType,
  socialPreviewSize,
} from "@/lib/social-preview";

export const alt = socialPreviewAlt;
export const size = socialPreviewSize;
export const contentType = socialPreviewContentType;
export const dynamic = "force-static";

export default createSocialPreview;
