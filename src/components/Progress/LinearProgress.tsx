import type { BaseComponentProps } from "@/types";

export interface ControlledProgress {
  indeterminate?: never;
  value: number;
}

export interface IndeterminateProgress {
  indeterminate: true;
  value?: never;
}

export type LinearProgressProps =
  | (BaseComponentProps & ControlledProgress)
  | (BaseComponentProps & IndeterminateProgress);

export const LinearProgress = ({
  "data-testid": testId = "progress",
  indeterminate,
  value,
}: LinearProgressProps) => {
  const indeterminateBg = "bg-primary-100 dark:bg-primary-800";
  const baseClass = "absolute h-full";

  return (
    <div
      className={`
        relative mx-auto h-1.5 w-full overflow-hidden rounded-md

        ${
          indeterminate
            ? `
              bg-primary-1000

              dark:bg-primary-100
            `
            : `
              bg-primary-100

              dark:bg-primary-800
            `
        }
      `}
      data-testid={testId}
    >
      {indeterminate ? (
        <>
          <div
            className={`
              ${baseClass}
              ${indeterminateBg}
            `}
            style={{
              animation: "slide-infinite-1 2s cubic-bezier(.4,0,.6,1) infinite",
              inlineSize: "30%",
            }}
          />
          <div
            className={`
              ${baseClass}
              ${indeterminateBg}
            `}
            style={{
              animation: "slide-infinite-2 2s cubic-bezier(.4,0,.6,1) infinite",
              inlineSize: "60%",
            }}
          />
        </>
      ) : (
        <div
          className={`
            h-full rounded-md bg-primary-1000 transition-all duration-200
            ease-in-out

            dark:bg-primary-0
          `}
          style={{ width: `${value}%` }}
        />
      )}
    </div>
  );
};
