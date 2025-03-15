import type { BaseComponentProps } from "@/types";

import { Icon, type IconType } from "../Icon/Icon";

export interface EmptyStateProps extends BaseComponentProps {
  body?: string;
  heading?: string;
  icon: IconType;
}

export const EmptyState = ({
  body,
  "data-testid": testId = "emptyState",
  heading,
  icon,
}: EmptyStateProps) => (
  <div
    className="my-4 flex flex-col items-center justify-center"
    data-testid={testId}
  >
    <div
      className={`
        bg-primary-100 mb-8 flex h-[120px] w-[120px] items-center justify-center
        rounded-full
      `}
    >
      <Icon
        className={`
          fill-primary-600
          dark:fill-primary-900
        `}
        customSize={36}
        data-testid={`icon-${icon}`}
        type={icon}
      />
    </div>

    {heading ? (
      <div className="text-primary-600 text-lg font-semibold">{heading}</div>
    ) : null}
    {body ? (
      <div
        className={`
          text-primary-1000 mt-1.5 max-w-(--breakpoint-sm) text-center
          dark:text-primary-0
        `}
      >
        {body}
      </div>
    ) : null}
  </div>
);
