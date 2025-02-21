import type { BaseComponentProps, Connotations } from "@/types";

import { Icon, type IconType } from "../Icon/Icon";
import { BadgeLayouts, Shapes, Sizes } from "../types";

const SHAPE_STYLES = {
  pill: "rounded-full",
  rounded: "rounded",
};

export interface BadgeProps extends BaseComponentProps {
  children: React.ReactNode;
  connotation?: Connotations;
  icon?: IconType;
  layout?: BadgeLayouts;
  shape?: Shapes;
  size?: Exclude<Sizes, "super-condensed">;
  trailingIcon?: boolean;
}

const THEME_COLORS = {
  alert: {
    filled: `
        bg-alert-500
        text-primary-0
        dark:text-primary-1000
        dark:bg-alert-400
        `,
    outlined: `
        border
        border-alert-300
        bg-transparent 
        text-alert-600
        dark:border-alert-600
        dark:text-alert-300
        `,
    soft: `
        bg-alert-100
        text-alert-800
        dark:text-alert-200
        dark:bg-alert-800
        `,
  },
  announcement: {
    filled: `
        bg-announcement-500
        text-primary-0
        dark:text-primary-1000
        dark:bg-announcement-400
        `,
    outlined: `
        border
        border-announcement-300
        bg-transparent 
        text-announcement-600
        dark:border-announcement-600
        dark:text-announcement-300
        `,
    soft: `
        bg-announcement-100
        text-announcement-800
        dark:text-announcement-200
        dark:bg-announcement-800
        `,
  },
  cta: {
    filled: `
        bg-cta-500
        text-primary-0
        dark:text-primary-1000
        dark:bg-cta-400
        `,
    outlined: `
        border
        border-cta-300
        bg-transparent 
        text-cta-600
        dark:border-cta-600
        dark:text-cta-300
        `,
    soft: `
        bg-cta-100
        text-cta-800
        dark:text-cta-200
        dark:bg-cta-800
        `,
  },
  info: {
    filled: `
        bg-info-500
        text-primary-0
        dark:text-primary-1000
        dark:bg-info-400
        `,
    outlined: `
        border
        border-info-300
        bg-transparent 
        text-info-600
        dark:border-info-600
        dark:text-info-300
        `,
    soft: `
        bg-info-100
        text-info-800
        dark:text-info-200
        dark:bg-info-800
        `,
  },
  primary: {
    filled: `
        bg-primary-500
        text-primary-0
        dark:text-primary-1000
        dark:bg-primary-400
        `,
    outlined: `
        border
        border-primary-300
        bg-transparent 
        text-primary-600
        dark:border-primary-600
        dark:text-primary-300
        `,
    soft: `
        bg-primary-100
        text-primary-800
        dark:text-primary-200
        dark:bg-primary-800
        `,
  },
  success: {
    filled: `
        bg-success-500
        text-primary-0
        dark:text-primary-1000
        dark:bg-success-400
        `,
    outlined: `
        border
        border-success-300
        bg-transparent 
        text-success-600
        dark:border-success-600
        dark:text-success-300
        `,
    soft: `
        bg-success-100
        text-success-800
        dark:text-success-200
        dark:bg-success-800
        `,
  },
  warning: {
    filled: `
        bg-warning-300
        text-primary-1000
        dark:text-primary-0
        dark:bg-warning-600
        `,
    outlined: `
        border
        border-warning-300
        bg-transparent 
        text-warning-600
        dark:border-warning-600
        dark:text-warning-300
        `,
    soft: `
        bg-warning-100
        text-warning-800
        dark:text-warning-200
        dark:bg-warning-800
        `,
  },
};

const sizeStyles = {
  condensed: "h-5 leading-5 px-2",
  expanded: "h-7 leading-7 px-3",
  normal: "h-6 leading-6 px-2.5",
};

const filledLayoutIconColors = (connotation: Connotations) => {
  if (connotation === "warning") {
    return "fill-primary-1000 dark:fill-primary-0";
  }

  return "fill-primary-0 dark:fill-primary-1000";
};

const softLayoutIconColors = {
  alert: "fill-alert-800 dark:fill-alert-200",
  announcement: "fill-announcement-800 dark:fill-announcement-200",
  cta: "fill-cta-800 dark:fill-cta-200",
  info: "fill-info-800 dark:fill-info-200",
  primary: "fill-primary-800 dark:fill-primary-200",
  success: "fill-success-800 dark:fill-success-200",
  warning: "fill-warning-800 dark:fill-warning-200",
};

const outlinedLayoutIconColors = {
  alert: "fill-alert-600 dark:fill-alert-300",
  announcement: "fill-announcement-600 dark:fill-announcement-300",
  cta: "fill-cta-600 dark:fill-cta-300",
  info: "fill-info-600 dark:fill-info-300",
  primary: "fill-primary-600 dark:fill-primary-300",
  success: "fill-success-600 dark:fill-success-300",
  warning: "fill-warning-600 dark:fill-warning-300",
};

const getThemeColor = (connotation: Connotations, layout: BadgeLayouts) =>
  THEME_COLORS[connotation][layout];

export const Badge = ({
  children,
  className,
  connotation = "primary",
  "data-testid": testId = "badge",
  icon,
  layout = "filled",
  shape = "rounded",
  size = "normal",
  trailingIcon,
}: BadgeProps) => {
  const baseStyles = `tracking-normal inline-flex justify-center items-center whitespace-nowrap items-center text-center text-xs font-semibold w-min ${sizeStyles[size]}`;
  const themeColors = getThemeColor(connotation, layout);

  const fillStyles = className
    ?.split(" ")
    .filter((name) => name.includes("fill-"))
    .join(" ");

  const marginSide = trailingIcon ? "ml-2" : "mr-2";
  const iconStyles = [
    marginSide,
    layout === "filled" ? filledLayoutIconColors(connotation) : "",
    layout === "outlined" ? outlinedLayoutIconColors[connotation] : "",
    layout === "soft" ? softLayoutIconColors[connotation] : "",
    fillStyles ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const badgeIcon = icon && (
    <Icon
      className={iconStyles}
      connotation={connotation}
      customSize={14}
      data-testid={`icon-${icon}`}
      type={icon}
    />
  );

  return children ? (
    <span
      className={[baseStyles, themeColors, SHAPE_STYLES[shape], className].join(
        " "
      )}
      data-testid={testId}
      style={{ fontStretch: "semi-condensed" }}
    >
      {!trailingIcon && badgeIcon}
      {children || null}
      {trailingIcon && badgeIcon}
    </span>
  ) : null;
};
