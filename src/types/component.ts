import type { ReactNode } from "react";

export interface BaseComponentProps {
  id?: string;
  style?: object;
  onClick?: (...args: any) => void | Promise<void>;
  className?: string;
  "data-testid"?: string;
}

export type WithChildren<T = {}> = T & {
  children?: ReactNode;
};
