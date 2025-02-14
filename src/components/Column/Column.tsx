import type { BaseComponentProps, WithChildren } from "@/types";

interface ColumnProps extends BaseComponentProps, WithChildren {}

export const Column = ({
  children,
  className = "",
  "data-testid": testId,
  style,
  ...props
}: ColumnProps) => (
  <div
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
