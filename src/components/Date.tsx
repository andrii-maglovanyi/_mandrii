"use client";

import { parseISO, format } from "date-fns";

export const Date = ({ dateString }: { dateString: string }) => (
  <time dateTime={dateString} className="font-mono">
    {format(parseISO(dateString), "LLL d, yyyy")}
  </time>
);
