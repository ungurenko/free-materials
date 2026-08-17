"use client";

import type { ReactNode } from "react";
import { track } from "@vercel/analytics/react";
import { siteConfig } from "@/config/site";

export type CourseLinkPlacement = "hero" | "after_prompts";

interface TrackedCourseLinkProps {
  placement: CourseLinkPlacement;
  className: string;
  children: ReactNode;
}

export default function TrackedCourseLink({ placement, className, children }: TrackedCourseLinkProps) {
  return (
    <a
      href={siteConfig.promoBanner.url}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("course_click", { placement })}
    >
      {children}
    </a>
  );
}
