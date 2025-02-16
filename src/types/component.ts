import type { ReactNode } from "react";

export interface BaseComponentProps {
  id?: string;
  style?: object;
  onClick?: (...args: any) => void | Promise<void>;
  className?: string;
  "data-testid"?: string;
  draggable?: boolean;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragEnd?: (e: React.DragEvent<HTMLDivElement>) => void;
}

export type WithChildren<T = {}> = T & {
  children?: ReactNode;
};
