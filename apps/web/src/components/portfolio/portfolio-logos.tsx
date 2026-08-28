import type { ComponentType, SVGProps } from "react";

import AarexLogo from "@/assets/portfolio/aarex/aarex-logo.svg";
import AbcLogo from "@/assets/portfolio/abc/abc-logo.svg";
import AcceLogo from "@/assets/portfolio/acce/acce-logo.svg";
import ArcLogo from "@/assets/portfolio/arc/arc-logo.svg";
import FreaLogo from "@/assets/portfolio/frea/frea-logo.svg";
import RazeLogo from "@/assets/portfolio/raze/raze-logo.svg";

export const portfolioLogos: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  aarex: AarexLogo,
  acce: AcceLogo,
  arc: ArcLogo,
  abc: AbcLogo,
  frea: FreaLogo,
  raze: RazeLogo
};

export function PortfolioLogo({
  id,
  className = "h-7 w-auto object-contain"
}: {
  id: string;
  className?: string;
}) {
  const Component = portfolioLogos[id];
  if (!Component) return null;
  return <Component className={className} />;
}
