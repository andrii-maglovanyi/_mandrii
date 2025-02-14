export enum BASE_LAYOUTS {
  filled = "filled",
  outlined = "outlined",
}

enum GHOST_LAYOUT {
  ghost = "ghost",
}

enum SOFT_LAYOUT {
  soft = "soft",
}

export const BUTTON_LAYOUTS = {
  ...BASE_LAYOUTS,
  ...GHOST_LAYOUT,
} as const;

export const BADGE_LAYOUTS = {
  ...BASE_LAYOUTS,
  ...SOFT_LAYOUT,
} as const;

export type ButtonLayouts = keyof typeof BUTTON_LAYOUTS;
export type BadgeLayouts = keyof typeof BADGE_LAYOUTS;
export type Shapes = "pill" | "rounded";
export type Sizes = "super-condensed" | "condensed" | "normal" | "expanded";
