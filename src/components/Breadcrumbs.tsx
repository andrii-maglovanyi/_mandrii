import Link from "next/link";
import React from "react";

const separator = (
  <span className="mx-3 inline-block text-3xl opacity-60">→</span>
);

export const Breadcrumbs = ({
  items,
}: {
  items: Array<{ title: string, url?: string; }>;
}) => {
  const list = items
    .reduce(
      (acc, { title, url }, index) => {
        if (index > 0) {
          acc.push(separator);
        }

        acc.push(
          url ? (
            <Link
              href={url}
              className={`
                text-2xl font-bold opacity-80
                hover:underline hover:opacity-100
              `}
            >
              {title}
            </Link>
          ) : (
            <span className="cursor-default text-2xl font-bold">{title}</span>
          )
        );

        return acc;
      },
      [
        <span
          className="m-2 cursor-default text-3xl font-bold opacity-80"
          key="root"
        >
          /
        </span>,
      ]
    )
    .map((item) => () => item);

  return (
    <div className="font-leOsler flex items-center text-slate-700">
      {list.map((Item, index) => (
        <Item key={index} />
      ))}
    </div>
  );
};
