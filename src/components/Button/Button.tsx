import type { BaseComponentProps, Connotations } from "@/types";
import { forwardRef, type Ref } from "react";

import type { ButtonLayouts, Shapes, Sizes } from "../types";
import { Icon, type IconType } from "../Icon/Icon";
import { deduplicateClass } from "@/utils";

const SHAPE_STYLES = {
  pill: "rounded-full",
  rounded: "rounded-md",
};

const THEME_COLORS = {
  alert: {
    filled: `
        bg-alert-500
        text-primary-0
        hover:bg-alert-600
        active:bg-alert-700
        disabled:bg-primary-100
        disabled:text-primary-300
        dark:text-primary-1000
        dark:bg-alert-400
        dark:hover:bg-alert-300
        dark:active:bg-alert-200
        dark:disabled:bg-primary-800
        dark:disabled:text-primary-600
        `,
    ghost: `
        bg-transparent
        text-alert-600
        hover:bg-alert-50
        active:bg-alert-100
        hover:text-alert-700
        disabled:bg-transparent
        disabled:text-primary-300
        dark:text-alert-300
        dark:hover:bg-alert-900
        dark:active:bg-alert-800
        dark:hover:text-alert-200
        dark:disabled:text-primary-600
        `,
    outlined: `
        border
        border-alert-600
        bg-transparent 
        text-alert-600
        hover:bg-alert-50
        active:bg-alert-100
        disabled:bg-transparent
        disabled:border-primary-300
        disabled:text-primary-300
        dark:border-alert-200
        dark:text-alert-200
        dark:hover:bg-alert-900
        dark:active:bg-alert-800
        dark:disabled:bg-transparent
        dark:disabled:text-primary-600
        `,
  },
  announcement: {
    filled: `
        bg-announcement-500
        text-primary-0
        hover:bg-announcement-600
        active:bg-announcement-700
        disabled:bg-primary-100
        disabled:text-primary-300
        dark:text-primary-1000
        dark:bg-announcement-400
        dark:hover:bg-announcement-300
        dark:active:bg-announcement-200
        dark:disabled:bg-primary-800
        dark:disabled:text-primary-600
        `,
    ghost: `
        bg-transparent
        text-announcement-600
        hover:bg-announcement-50
        active:bg-announcement-100
        hover:text-announcement-700
        disabled:bg-transparent
        disabled:text-primary-300
        dark:text-announcement-300
        dark:hover:bg-announcement-900
        dark:active:bg-announcement-800
        dark:hover:text-announcement-200
        dark:disabled:text-primary-600
        `,
    outlined: `
        border
        border-announcement-600
        bg-transparent 
        text-announcement-600
        hover:bg-announcement-50
        active:bg-announcement-100
        disabled:bg-transparent
        disabled:border-primary-300
        disabled:text-primary-300
        dark:border-announcement-200
        dark:text-announcement-200
        dark:hover:bg-announcement-900
        dark:active:bg-announcement-800
        dark:disabled:bg-transparent
        dark:disabled:text-primary-600
        `,
  },
  cta: {
    filled: `
        bg-cta-500
        text-primary-0
        hover:bg-cta-600
        active:bg-cta-700
        disabled:bg-primary-100
        disabled:text-primary-300
        dark:text-primary-1000
        dark:bg-cta-400
        dark:hover:bg-cta-300
        dark:active:bg-cta-200
        dark:disabled:bg-cta-800
        dark:disabled:text-primary-300
        `,
    ghost: `
        bg-transparent
        text-cta-600
        hover:bg-cta-50
        active:bg-cta-100
        hover:text-cta-700
        disabled:bg-transparent
        disabled:text-primary-300
        dark:text-cta-300
        dark:hover:bg-cta-900
        dark:active:bg-cta-800
        dark:hover:text-cta-200
        dark:disabled:text-primary-600
        `,
    outlined: `
        border
        border-cta-600
        bg-transparent 
        text-cta-600
        hover:bg-cta-50
        active:bg-cta-100
        disabled:bg-transparent
        disabled:border-primary-300
        disabled:text-primary-300
        dark:border-cta-200
        dark:text-cta-200
        dark:hover:bg-cta-900
        dark:active:bg-cta-800
        dark:disabled:bg-transparent
        dark:disabled:text-primary-600
        `,
  },
  info: {
    filled: `
        bg-info-500
        text-primary-0
        hover:bg-info-600
        active:bg-info-700
        disabled:bg-primary-100
        disabled:text-primary-300
        dark:text-primary-1000
        dark:bg-info-400
        dark:hover:bg-info-300
        dark:active:bg-info-200
        dark:disabled:bg-primary-800
        dark:disabled:text-primary-600
        `,
    ghost: `
        bg-transparent
        text-info-600
        hover:bg-info-50
        active:bg-info-100
        hover:text-info-700
        disabled:bg-transparent
        disabled:text-primary-300
        dark:text-info-300
        dark:hover:bg-info-900
        dark:active:bg-info-800
        dark:hover:text-info-200
        dark:disabled:text-primary-600
        `,
    outlined: `
        border
        border-info-600
        bg-transparent 
        text-info-600
        hover:bg-info-50
        active:bg-info-100
        disabled:bg-transparent
        disabled:border-primary-300
        disabled:text-primary-300
        dark:border-info-200
        dark:text-info-200
        dark:hover:bg-info-900
        dark:active:bg-info-800
        dark:disabled:bg-transparent
        dark:disabled:text-primary-600
        `,
  },
  primary: {
    filled: `
        bg-primary-950
        text-primary-0
        hover:bg-primary-800
        active:bg-primary-700
        disabled:bg-primary-100
        disabled:text-primary-300
        dark:text-primary-1000
        dark:bg-primary-0
        dark:hover:bg-primary-100
        dark:active:bg-primary-200
        dark:disabled:bg-primary-800
        dark:disabled:text-primary-600
        `,
    ghost: `
        bg-transparent
        text-primary-950
        hover:bg-primary-50
        active:bg-primary-100
        hover:text-primary-700
        disabled:bg-transparent
        disabled:text-primary-300
        dark:text-primary-0
        dark:hover:bg-primary-900
        dark:active:bg-primary-800
        dark:hover:text-primary-0
        dark:disabled:text-primary-600
        `,
    outlined: `
        border
        border-primary-600
        bg-transparent 
        text-primary-950
        hover:bg-primary-50
        active:bg-primary-100
        disabled:bg-transparent
        disabled:border-primary-300
        disabled:text-primary-300
        dark:border-primary-200
        dark:text-primary-0
        dark:hover:bg-primary-900
        dark:active:bg-primary-800
        dark:disabled:bg-transparent
        dark:disabled:text-primary-600
        `,
  },
  success: {
    filled: `
        bg-success-500
        text-primary-0
        hover:bg-success-600
        active:bg-success-700
        disabled:bg-primary-100
        disabled:text-primary-300
        dark:text-primary-1000
        dark:bg-success-400
        dark:hover:bg-success-300
        dark:active:bg-success-200
        dark:disabled:bg-primary-800
        dark:disabled:text-primary-600
        `,
    ghost: `
        bg-transparent
        text-success-600
        hover:bg-success-50
        active:bg-success-100
        hover:text-success-700
        disabled:bg-transparent
        disabled:text-primary-300
        dark:text-success-300
        dark:hover:bg-success-900
        dark:active:bg-success-800
        dark:hover:text-success-200
        dark:disabled:text-primary-600
        `,
    outlined: `
        border
        border-success-600
        bg-transparent 
        text-success-600
        hover:bg-success-50
        active:bg-success-100
        disabled:bg-transparent
        disabled:border-primary-300
        disabled:text-primary-300
        dark:border-success-200
        dark:text-success-300
        dark:hover:bg-success-900
        dark:active:bg-success-800
        dark:disabled:bg-transparent
        dark:disabled:text-primary-600
        `,
  },
  warning: {
    filled: `
        bg-warning-500
        text-primary-0
        hover:bg-warning-600
        active:bg-warning-700
        disabled:bg-primary-100
        disabled:text-primary-300
        dark:text-primary-1000
        dark:bg-warning-400
        dark:hover:bg-warning-300
        dark:active:bg-warning-200
        dark:disabled:bg-primary-800
        dark:disabled:text-primary-600
        `,
    ghost: `
        bg-transparent
        text-warning-600
        hover:bg-warning-50
        active:bg-warning-100
        hover:text-warning-700
        disabled:bg-transparent
        disabled:text-primary-300
        dark:text-warning-300
        dark:hover:bg-warning-900
        dark:active:bg-warning-800
        dark:hover:text-warning-200
        dark:disabled:text-primary-600
        `,
    outlined: `
        border
        border-warning-600
        bg-transparent 
        text-warning-600
        hover:bg-warning-50
        active:bg-warning-100
        disabled:bg-transparent
        disabled:border-primary-300
        disabled:text-primary-300
        dark:border-warning-200
        dark:text-warning-200
        dark:hover:bg-warning-900
        dark:active:bg-warning-800
        dark:disabled:bg-transparent
        dark:disabled:border-primary-600
        dark:disabled:text-primary-600
        `,
  },
};

const getThemeColor = (connotation: Connotations, layout: ButtonLayouts) =>
  THEME_COLORS[connotation][layout];

const sizeStyles = {
  condensed: "h-8",
  expanded: "h-12",
  normal: "h-10",
  "super-condensed": "h-6",
};

const iconSizeStyles = {
  condensed: "w-8",
  expanded: "w-12",
  normal: "w-10",
  "super-condensed": "w-6",
};

const paddingStyles = {
  condensed: "px-3 text-xs",
  expanded: "px-5 text-base",
  normal: "px-4 text-sm",
  "super-condensed": "px-2 text-xs",
};

export interface WithChildren {
  children: React.ReactNode;
  icon?: IconType;
  label?: never;
}

export interface WithLabel {
  children?: never;
  icon?: IconType;
  label: string;
}

export interface WithIcon {
  children?: never;
  icon: IconType;
  label?: never;
}

export interface BasicButtonProps extends BaseComponentProps {
  "aria-label"?: string;
  connotation?: Connotations;
  disabled?: boolean;
  layout?: ButtonLayouts;
  name?: string;
  onClick?: (e: React.SyntheticEvent<Element, Event>) => void | Promise<void>;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  shape?: Shapes;
  size?: Sizes;
  trailingIcon?: boolean;
  type?: "button" | "submit" | "reset";
}

export type ButtonProps =
  | (BasicButtonProps & WithChildren)
  | (BasicButtonProps & WithIcon)
  | (BasicButtonProps & WithLabel);

const iconSize = {
  condensed: 16,
  expanded: 24,
  normal: 20,
  "super-condensed": 12,
};

const ButtonComponent = (
  {
    "aria-label": ariaLabel,
    children,
    className = "",
    connotation = "primary",
    "data-testid": testId = "button",
    disabled = false,
    icon,
    label,
    layout = "ghost",
    name,
    onClick,
    onKeyDown,
    shape = "rounded",
    size = "normal",
    trailingIcon,
    type = "button",
  }: ButtonProps,
  ref: Ref<HTMLButtonElement>
) => {
  const iconOnly = !(children || label);

  const baseStyles =
    "inline-flex items-center text-center font-semibold disabled:cursor-not-allowed whitespace-nowrap";
  const themeColors = getThemeColor(connotation, layout);

  const marginSide = trailingIcon ? "ml-2" : "mr-2";
  const iconMargin = iconOnly ? "" : marginSide;
  const buttonWidthStyle = iconOnly
    ? iconSizeStyles[size]
    : paddingStyles[size];

  const fillStyles = className
    ?.split(" ")
    .filter((name) => name.includes("fill-"))
    .join(" ");

  const justifyStyles = className?.includes("justify-") ? "" : "justify-center";

  const iconStyles = [
    iconMargin,
    layout === "filled" && !disabled
      ? "fill-primary-0 dark:fill-primary-1000"
      : "",
    disabled ? "fill-primary-300" : "",
    fillStyles ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  const buttonIcon = icon && (
    <Icon
      className={iconStyles}
      connotation={connotation}
      customSize={iconSize[size]}
      data-testid={`icon-${icon}`}
      type={icon}
    />
  );

  return (
    <button
      aria-label={ariaLabel}
      className={deduplicateClass(
        [
          baseStyles,
          justifyStyles,
          sizeStyles[size],
          buttonWidthStyle,
          SHAPE_STYLES[shape],
          themeColors,
        ].join(" "),
        className
      )}
      data-testid={testId}
      disabled={disabled}
      name={name}
      onClick={onClick}
      onKeyDown={onKeyDown}
      ref={ref}
      type={type}
    >
      {!trailingIcon && buttonIcon}
      {label ?? children ?? null}
      {trailingIcon && buttonIcon}
    </button>
  );
};

export const Button = forwardRef(ButtonComponent);
