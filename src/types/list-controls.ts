export type PaginateParams = {
  page?: number;
  pageSize?: number;
};

export type SortDirections = "asc" | "desc";
type SortParam = {
  [key: string]: SortDirections | SortParam;
};

export type SortParams = Array<SortParam>;
