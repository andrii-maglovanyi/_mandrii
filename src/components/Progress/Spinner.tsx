import type { BaseComponentProps } from "@/types";

export interface SpinnerProps extends BaseComponentProps {
  size?: number;
}

export const Spinner = ({
  "data-testid": testId = "busy",
  size = 0,
}: SpinnerProps) => {
  const dimension = 40 + size * 4;
  const padding = size < 0 ? 0 : "1rem";

  return (
    <div
      data-testid={`wrapper-${testId}`}
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        padding,
        width: "auto",
      }}
    >
      <svg
        data-testid={testId}
        height={`${dimension}px`}
        viewBox="0 0 16 16"
        width={`${dimension}px`}
      >
        <circle
          cx="8px"
          cy="8px"
          r="7px"
          style={{
            fill: "none",
            stroke: "transparent",
            strokeWidth: 1,
          }}
        />
        <circle
          className={`
            !stroke-black
            dark:!stroke-white
          `}
          cx="8px"
          cy="8px"
          r="7px"
          style={{
            animation: "spin-infinite 2s linear infinite",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: 1,
            transform: "rotate(-90deg)",
            transformOrigin: "center",
            transition: "all 0.2s ease-in-out",
            visibility: "hidden",
          }}
        />
      </svg>
    </div>
  );
};
