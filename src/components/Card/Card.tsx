import type { BaseComponentProps } from "@/types";
import { deduplicateClass } from "@/utils";

export interface CardProps extends BaseComponentProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Card = ({
  children,
  className,
  "data-testid": testId,
  onClick,
}: CardProps) => {
  return (
    <div
      className={deduplicateClass(
        `w-full md:w-3/4 max-w-(--breakpoint-md) mx-auto p-6 bg-primary-0 dark:bg-primary-900 shadow-lg rounded-lg

        ${onClick ? "cursor-pointer hover:shadow-xl" : ""}
      `,
        className
      )}
      data-testid={testId}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
