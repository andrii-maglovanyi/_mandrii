import type { BaseComponentProps, WithChildren } from "@/types";
import { forwardRef, Ref } from "react";

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
