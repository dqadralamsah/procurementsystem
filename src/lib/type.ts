export type PaginationResponse<T> = {
  data: T[];
  meta: {
    page: number;
    total: number;
    take: number;
    totalPages: number;
  };
};
