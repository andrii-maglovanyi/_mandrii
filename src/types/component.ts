import type { ReactNode } from "react";

export interface BaseComponentProps {
  id?: string;
  style?: object;
  onClick?: (...args: any) => void | Promise<void>;
  className?: string;
  "data-testid"?: string;
  onTouchStart?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchMove?: (e: React.TouchEvent<HTMLDivElement>) => void;
  onTouchEnd?: (e: React.TouchEvent<HTMLDivElement>) => void;
}

export type WithChildren<T = {}> = T & {
  children?: ReactNode;
};
