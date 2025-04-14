import { useMemo } from "react";

import type { BaseComponentProps, Connotations } from "../../types";

export const svgImportKeys = [
  "arrow-left-line",
  "buymeacoffee",
  "chevron-down-line",
  "email-line",
  "call-line",
  "close-line",
  "close-small-solid",
  "file-search-line",
  "fullscreen-line",
  "fullscreen-off-line",
  "google-color",
  "globe-line",
  "heart-line",
  "heart-solid",
  "chart",
  "info-line",
  "instagram",
  "life-vest",
  "patreon",
  "pin",
  "pin-line",
  "pin-solid",
  "rocket-solid",
  "share-solid",
  "sort-line",
  "sort-asc-line",
  "sort-desc-line",
  "telegram",
  "youtube",
] as const;

export type IconType = (typeof svgImportKeys)[number];

const IconSizes = {
  large: "32px",
  medium: "24px",
  small: "16px",
} as const;

interface IconProps extends BaseComponentProps {
  connotation?: Connotations;
  customSize?: number | string;
  size?: keyof typeof IconSizes;
  style?: React.CSSProperties;
  type: IconType;
}

const connotationColors: Record<Connotations, string> = {
  alert: "fill-alert-500 dark:fill-alert-400",
  cta: "fill-cta-500 dark:fill-cta-300",
  primary: "fill-primary-950 dark:fill-primary-0",
  success: "fill-success-500 dark:fill-success-300",
};

export const Icon = ({
  className = "",
  connotation = "primary",
  customSize,
  "data-testid": testId,
  size = "medium",
  style = {},
  type,
}: IconProps) => {
  if (!svgImportKeys.includes(type)) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`Unknown icon type: ${type}`);
    }
  }

  const iconSize =
    typeof customSize === "number"
      ? `${customSize}px`
      : customSize ?? IconSizes[size];

  const computedClassName = useMemo(() => {
    const hasFill = className.includes("fill-");
    const colorClass = hasFill ? "" : connotationColors[connotation] ?? "";
    return ["bg-transparent inline-block", colorClass, className]
      .filter(Boolean)
      .join(" ");
  }, [className, connotation]);

  return (
    <svg
      className={computedClassName}
      data-testid={testId ?? `icon-${type}`}
      style={{ height: iconSize, width: iconSize, ...style }}
    >
      <use xlinkHref={`/assets/sprite.svg#${type}`} />
    </svg>
  );
};
