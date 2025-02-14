import type { BaseComponentProps, WithChildren } from "@/types";
import { deduplicateClass } from "@/utils";

type HeaderProps = BaseComponentProps & WithChildren;

export const H1 = ({
  children,
  className = "",
  "data-testid": testId = "h1",
}: HeaderProps) => (
  <h1
    className={deduplicateClass(
      "font-inherit mb-4 mt-5 text-4xl font-medium text-primary-1000 dark:text-primary-0",
      className
    )}
    data-testid={testId}
  >
    {children}
  </h1>
);

export const H2 = ({
  children,
  className = "",
  "data-testid": testId = "h2",
}: HeaderProps) => (
  <h2
    className={deduplicateClass(
      "font-inherit mb-3 mt-4 text-2xl font-medium text-primary-1000 dark:text-primary-0",
      className
    )}
    data-testid={testId}
  >
    {children}
  </h2>
);

export const H3 = ({
  children,
  className = "",
  "data-testid": testId = "h3",
}: HeaderProps) => (
  <h3
    className={deduplicateClass(
      "font-inherit mb-2 mt-3 text-xl font-normal text-primary-1000 dark:text-primary-0",
      className
    )}
    data-testid={testId}
  >
    {children}
  </h3>
);
