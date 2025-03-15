import { forwardRef, Ref } from "react";

import type { BaseComponentProps, WithChildren } from "@/types";

interface RowProps extends BaseComponentProps, WithChildren {
  style?: object;
}

const RowComponent = (
  { children, className = "", "data-testid": testId, ...props }: RowProps,
  ref: Ref<HTMLDivElement>
) => (
  <div
    ref={ref}
    className={`
      flex flex-row
      ${className}
    `}
    data-testid={testId}
    {...props}
  >
    {children}
  </div>
);

export const Row = forwardRef(RowComponent);
