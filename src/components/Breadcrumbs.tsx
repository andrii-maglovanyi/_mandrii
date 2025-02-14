import Link from "next/link";
import React from "react";

const separator = (
  <span className="opacity-60 text-3xl inline-block mx-3">→</span>
);

export const Breadcrumbs = ({
  items,
}: {
  items: Array<{ url?: string; title: string }>;
}) => {
  const list = items
    .reduce(
      (acc, { url, title }, index) => {
        if (index > 0) {
          acc.push(separator);
        }

        acc.push(
          url ? (
            <Link
              href={url}
              className="opacity-80 hover:opacity-100 font-bold text-2xl hover:underline"
            >
              {title}
            </Link>
          ) : (
            <span className="font-bold cursor-default text-2xl">{title}</span>
          )
        );

        return acc;
      },
      [
        <span
          className="font-bold text-3xl m-2 opacity-80 cursor-default"
          key="root"
        >
          /
        </span>,
      ]
    )
    .map((item) => () => item);

  return (
    <div className="flex items-center font-leOsler text-slate-700">
      {list.map((Item, index) => (
        <Item key={index} />
      ))}
    </div>
  );
};
