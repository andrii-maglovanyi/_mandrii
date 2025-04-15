"use client";

import React, { type Key, useCallback, useEffect, useState } from "react";

import type { BaseComponentProps, SortDirections, SortParams } from "@/types";
import { deduplicateClass } from "@/utils";

import { EmptyState } from "../EmptyState/EmptyState";
import { Icon } from "../Icon/Icon";
import { Pagination } from "../Pagination/Pagination";
import { Spinner } from "../Progress/Spinner";

interface Column<T> {
  align?: "left" | "right" | "center";
  className?: string;
  defaultSortOrder?: "asc" | "desc";
  key: string | Array<string>;
  render?: (value: unknown, record: T) => React.ReactNode;
  sorter?: boolean;
  title?: string | (() => React.ReactNode);
  width?: number | string;
}

interface ExpandColumn {
  key: "table-expand-column";
}

// type DataRecord = {
//   [key: string]: string | number | DataRecord;
// };

type ExpandIconProps<T> = {
  expanded: boolean;
  onExpand: (record: T, e: React.MouseEvent | React.KeyboardEvent) => void;
  record: T;
};

interface PaginatorProps {
  current?: number;
  onChange: ({ page }: { page: number }) => void;
  pageSize?: number;
  total?: number;
}

interface TableProps<T> extends BaseComponentProps {
  columns: Array<Column<T> | ExpandColumn>;
  dataSource?: Array<T>;
  emptyStateBodyMessage?: string;
  emptyStateHeading?: string;
  expandable?: {
    expandIcon: (props: ExpandIconProps<T>) => React.ReactNode;
    expandedRowRender: (record: T) => React.ReactNode;
  };
  loading?: boolean;
  onSort?: (params: SortParams) => void;
  pagination?: PaginatorProps;
  rowKey: keyof T;
  size?: "condensed";
}

function isExpandColumn<T>(
  column: Column<T> | ExpandColumn
): column is ExpandColumn {
  return column.key === "table-expand-column";
}

function getDataPath<T>({ key }: Pick<Column<T>, "key">) {
  return Array.isArray(key) ? key.join(".") : key;
}

function getKey<T>(record: T, rowKey: keyof T) {
  const key = record[rowKey];

  if (typeof key !== "string" && typeof key !== "number") {
    throw new Error("Row key is invalid");
  }

  return key;
}

const Paginator = React.memo(function Paginator({
  current = 1,
  onChange = () => {},
  pageSize = 1,
  total = 1,
}: PaginatorProps) {
  return (
    total > pageSize && (
      <div className="mt-4 flex justify-center">
        <Pagination
          data-testid="table-pagination"
          index={current}
          onChange={(page: number) => {
            if (page === current) return;
            onChange({ page });
          }}
          total={Math.ceil(total / pageSize)}
        />
      </div>
    )
  );
});

function getNestedValue<T>(obj: T, path: string) {
  return path.split(".").reduce((acc: unknown, key) => {
    if (acc && Object.hasOwn(acc, key)) {
      return acc[key as keyof typeof acc];
    }
  }, obj);
}

export function Table<T>({
  className = "",
  columns,
  "data-testid": testId = "table",
  dataSource = [],
  emptyStateBodyMessage,
  emptyStateHeading,
  expandable,
  loading,
  onSort,
  pagination,
  rowKey,
  size,
}: TableProps<T>) {
  const [data, setData] = useState(dataSource);
  const [paginator, setPaginator] = useState(pagination);
  const [expandedRows, setExpandedRows] = useState<Set<Key>>(new Set());
  const [sorterColumns, setSorterColumns] = useState<
    Map<string, SortDirections>
  >(new Map());

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!loading) {
      timer = setTimeout(() => {
        setData(dataSource);
      });
    }

    return () => clearTimeout(timer);
  }, [dataSource, loading]);

  useEffect(() => {
    if (!loading) {
      setPaginator(pagination);
    }
  }, [pagination, loading]);

  useEffect(() => {
    const defaultSortOrders = new Map<string, SortDirections>();
    columns.forEach((column) => {
      if (!isExpandColumn(column) && column.defaultSortOrder) {
        defaultSortOrders.set(getDataPath(column), column.defaultSortOrder);
      }
    });

    setSorterColumns(defaultSortOrders);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const tdStyles = `
  relative 
  align-middle
  ${size === "condensed" ? "leading-5 py-[3px] px-2" : "leading-8 px-2 py-3"}
  `;
  const thStyles = "px-2 py-3 align-middle leading-8 bg-transparent";

  const onExpand = useCallback(
    (record: T, e: React.MouseEvent | React.KeyboardEvent) => {
      e.stopPropagation();

      const key = getKey(record, rowKey);

      if (expandedRows.has(key)) {
        expandedRows.delete(key);
      } else {
        expandedRows.add(key);
      }
      setExpandedRows(new Set(expandedRows));
    },
    [expandedRows, rowKey]
  );

  const handleSort = useCallback(
    (key: string) => {
      const sorter = sorterColumns.get(key);

      if (sorter === "asc") {
        sorterColumns.set(key, "desc");
      } else if (sorter === "desc") {
        sorterColumns.delete(key);
      } else {
        sorterColumns.set(key, "asc");
      }

      setSorterColumns(new Map(sorterColumns));

      onSort?.(
        [...sorterColumns.entries()].map(([key, value]) => ({
          [getDataPath({ key })]: value,
        }))
      );
    },
    [onSort, sorterColumns]
  );

  const getSortIcon = (key: string) => {
    if (sorterColumns.has(key)) {
      const direction = sorterColumns.get(key);
      if (direction === "asc") {
        return <Icon size="small" type="sort-asc-line" />;
      } else {
        return <Icon size="small" type="sort-desc-line" />;
      }
    } else {
      return <Icon size="small" type="sort-line" />;
    }
  };

  const renderHeaderCell = ({
    align,
    className,
    sorter,
    title,
    width,
    ...column
  }: Column<T>) => {
    let headerTitle;
    const key = getDataPath(column);

    if (title == null) {
      headerTitle = null;
    } else if (typeof title === "string") {
      headerTitle = title;
    } else {
      headerTitle = title();
    }

    const style: Record<string, string> = {};
    if (align) {
      style.textAlign = align;
    }
    if (width) {
      style.width = typeof width === "number" ? `${width}px` : width;
    }

    return sorter ? (
      <th
        className={deduplicateClass(
          `${thStyles} cursor-pointer whitespace-nowrap`,
          className
        )}
        key={key}
        onClick={() => handleSort(key)}
        style={style}
      >
        <div className="flex items-center justify-between">
          {headerTitle}
          &nbsp;
          {getSortIcon(key)}
        </div>
      </th>
    ) : (
      <th
        className={deduplicateClass(
          `${thStyles} text-left whitespace-nowrap`,
          className
        )}
        key={key}
        style={style}
      >
        {headerTitle}
      </th>
    );
  };

  const renderColgroup = (column: Column<T>) => {
    const key = getDataPath(column);

    return isExpandColumn(column) ? (
      <col className="w-[32px]" key={key} />
    ) : (
      <col key={key} />
    );
  };

  const renderCell = (
    record: T,
    { align, className, width, ...column }: Column<T>
  ) => {
    const key = getDataPath(column);
    const data = getNestedValue<T>(record, key);

    const style: Record<string, string> = {};
    if (align) {
      style.textAlign = align;
    }
    if (width) {
      style.width = `${width}px`;
    }

    if (column.render) {
      return (
        <td
          className={deduplicateClass(tdStyles, className)}
          key={key}
          style={style}
        >
          {column.render(data, record)}
        </td>
      );
    }

    return (
      <td
        className={deduplicateClass(tdStyles, className)}
        key={key}
        style={style}
      >
        {data != null && String(data)}
      </td>
    );
  };

  const renderRow = (record: T) => {
    const key = getKey(record, rowKey);
    const expanded = expandedRows.has(key);

    return (
      <React.Fragment key={key}>
        <tr
          className={`
            group
            ${
              expanded
                ? ""
                : `
                  border-primary-100 border-b
                  dark:border-cta-800
                `
            }
            dark:hover:bg-cta-900/20
            hover:bg-primary-50
            last:border-transparent
          `}
        >
          {columns.map((column) =>
            isExpandColumn(column) ? (
              <td className={tdStyles} key={column.key}>
                {expandable?.expandIcon({
                  expanded,
                  onExpand,
                  record,
                })}
              </td>
            ) : (
              renderCell(record, column)
            )
          )}
        </tr>
        {expanded && (
          <tr
            className={`
              group border-primary-100 border-b
              dark:border-primary-900
            `}
          >
            <td className="p-0 pt-px align-middle" colSpan={columns.length}>
              {expandable?.expandedRowRender(record)}
            </td>
          </tr>
        )}
      </React.Fragment>
    );
  };

  return (
    <div
      className={`
        relative min-h-32
        ${className}
      `}
    >
      <table className="w-full table-auto border-collapse" data-testid={testId}>
        <colgroup>{columns.map(renderColgroup)}</colgroup>
        <thead
          className={`
            border-primary-1000 border-b
            dark:border-primary-0
          `}
        >
          <tr>
            {columns.map((column) =>
              isExpandColumn(column) ? (
                <th className={thStyles} key={getDataPath(column)}></th>
              ) : (
                renderHeaderCell(column)
              )
            )}
          </tr>
        </thead>
        <tbody className={loading ? "opacity-50" : ""}>
          {data.map(renderRow)}
        </tbody>
      </table>
      {loading && (
        <div
          className="absolute inset-0 flex items-center justify-center"
          data-testid="spinner"
          style={{ marginTop: data.length ? "0" : "5rem" }}
        >
          <Spinner size={-1} />
        </div>
      )}
      {!loading && !dataSource?.length && (
        <div className="mt-6 flex items-center justify-center">
          <EmptyState
            heading={emptyStateHeading ?? "Empty"}
            body={
              emptyStateBodyMessage ??
              "There is no data to display at the moment"
            }
            data-testid="empty-state"
            icon="file-search-line"
          />
        </div>
      )}
      {paginator && <Paginator {...paginator} />}
    </div>
  );
}

export const EXPAND_COLUMN: ExpandColumn = {
  key: "table-expand-column",
};
