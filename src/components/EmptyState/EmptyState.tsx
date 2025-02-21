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
        mb-8 flex h-[120px] w-[120px] items-center justify-center rounded-full
        bg-primary-100
      `}
    >
      <Icon
        className={`
          fill-primary-600

          dark:fill-primary-900
        `}
        customSize={52}
        data-testid={`icon-${icon}`}
        type={icon}
      />
    </div>

    {heading ? (
      <div className="text-lg font-semibold text-primary-600">{heading}</div>
    ) : null}
    {body ? (
      <div
        className={`
          mt-1.5 text-primary-1000

          dark:text-primary-0
        `}
      >
        {body}
      </div>
    ) : null}
  </div>
);
