import type { BaseComponentProps } from "@/types";
import { deduplicateClass } from "@/utils";

type PhraseWithChildren = {
  children: React.ReactNode;
  dangerouslySetInnerHTML?: never;
};

type PhraseWithInnerHTML = {
  children?: never;
  dangerouslySetInnerHTML: { __html: string };
};

type PhraseProps = (PhraseWithChildren | PhraseWithInnerHTML) &
  BaseComponentProps;

export const Phrase = ({
  children,
  className = "",
  "data-testid": testId = "phrase",
  ...props
}: PhraseProps) => (
  <p
    className={deduplicateClass(
      "my-0 py-0 text-primary-1000 dark:text-primary-0",
      className
    )}
    data-testid={testId}
    {...props}
  >
    {children}
  </p>
);
