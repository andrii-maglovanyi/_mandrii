import type { ReactNode } from "react";

export interface BaseComponentProps {
  className?: string;
  "data-testid"?: string;
  id?: string;
  onClick?: (e: React.SyntheticEvent) => void | Promise<void>;
  onTouchEnd?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
  style?: object;
}

export type WithChildren<T = object> = T & {
  children?: ReactNode;
};
