import type { ComponentType, SVGProps } from "react";

import CardTexture from "@/assets/service-solution/everything-you-get-with-techfarm-card/card-top-right-testure.svg";
// Feature Icons
import Frame0 from "@/assets/service-solution/everything-you-get-with-techfarm-card/Frame-0.svg";
import Frame1 from "@/assets/service-solution/everything-you-get-with-techfarm-card/Frame-1.svg";
import Frame2 from "@/assets/service-solution/everything-you-get-with-techfarm-card/Frame-2.svg";
import Frame3 from "@/assets/service-solution/everything-you-get-with-techfarm-card/Frame-3.svg";
import Frame4 from "@/assets/service-solution/everything-you-get-with-techfarm-card/Frame-4.svg";
import Frame5 from "@/assets/service-solution/everything-you-get-with-techfarm-card/Frame-5.svg";
// Work Process SVGs
import BgTopLeft from "@/assets/service-solution/work-process/bg-top-left.svg";
import BgTopRight from "@/assets/service-solution/work-process/bg-top-right.svg";

export const featureIcons: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "frame-0": Frame0,
  "frame-1": Frame1,
  "frame-2": Frame2,
  "frame-3": Frame3,
  "frame-4": Frame4,
  "frame-5": Frame5
};

export function FeatureIcon({
  name,
  className = "w-10 h-10 object-contain"
}: {
  name: string;
  className?: string;
}) {
  const Component = featureIcons[name];
  if (!Component) return null;
  return <Component className={className} />;
}

export { CardTexture, BgTopLeft, BgTopRight };
