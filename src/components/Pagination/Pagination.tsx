import { Button } from "../Button/Button";

export interface PaginationProps {
  index: number;
  onChange: (page: number) => void;
  size?: "super-condensed" | "condensed" | "normal";
  total: number;
}

export const Pagination = ({
  index,
  onChange,
  size = "super-condensed",
  total,
}: PaginationProps) => {
  const range = 7;
  const renderPages = () => {
    const pages = [];
    const showStartEllipsis = total > range && (index > 4 || index > range - 1);
    const showEndEllipsis = total > range && (index < 5 || index <= total - 4);

    pages.push(
      <Button
        key={1}
        layout={index === 1 ? "filled" : "ghost"}
        onClick={() => onChange(1)}
        size={size}
      >
        1
      </Button>,
    );

    if (showStartEllipsis) {
      pages.push(
        <span className="mx-2 px-1.5 text-primary-1000" key="ellipsis-start">
          ...
        </span>,
      );
    }

    const start =
      total > range
        ? index > total - 4
          ? total - 4
          : Math.max(2, index > 4 ? index - 1 : 1)
        : 2;
    const end =
      total > range
        ? index > total - 4
          ? total - 1
          : Math.min(total - 1, Math.max(5, index + 1))
        : total - 1;

    for (let i = start; i <= end; i++) {
      pages.push(
        <Button
          key={i}
          layout={index === i ? "filled" : "ghost"}
          onClick={() => onChange(i)}
          size={size}
        >
          {i}
        </Button>,
      );
    }

    if (showEndEllipsis) {
      pages.push(
        <span className="mx-2 px-1.5 text-primary-1000" key="ellipsis-end">
          ...
        </span>,
      );
    }

    if (total > 1) {
      pages.push(
        <Button
          key={total}
          layout={index === total ? "filled" : "ghost"}
          onClick={() => onChange(total)}
          size={size}
        >
          {total}
        </Button>,
      );
    }

    return pages;
  };

  return (
    <div className="flex items-center space-x-1">
      <Button
        data-testid="previous-page"
        disabled={index === 1}
        onClick={() => onChange(Math.max(index - 1, 1))}
        size={size}
      >
        Previous
      </Button>
      {renderPages()}
      <Button
        data-testid="next-page"
        disabled={index === total}
        onClick={() => onChange(Math.min(index + 1, total))}
        size={size}
      >
        Next
      </Button>
    </div>
  );
};
