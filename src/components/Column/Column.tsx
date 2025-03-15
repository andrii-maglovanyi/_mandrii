import { forwardRef, Ref } from "react";

import type { BaseComponentProps, WithChildren } from "@/types";

interface ColumnProps extends BaseComponentProps, WithChildren {}

export const ColumnComponent = (
  {
    children,
    className = "",
    "data-testid": testId,
    style,
    ...props
  }: ColumnProps,
  ref: Ref<HTMLDivElement>
) => (
  <div
    ref={ref}
    className={`
      flex flex-col
      ${className}
    `}
    data-testid={testId}
    style={style}
    {...props}
  >
    {children}
  </div>
);

export const Column = forwardRef(ColumnComponent);
