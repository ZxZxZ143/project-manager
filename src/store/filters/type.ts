export type PaginationType = {
  page?: number,
  limit?: number
};

export type SearchType = {
  search?: string
};

export enum SortEnum {
  NAME = 'name',
  DATE = 'date',
}

export enum SortDirectionEnum {
  ASC = 'asc',
  DESC = 'desc',
}

export type SortType = {
  field?: SortEnum,
  direction?: SortDirectionEnum
};

export type FiltersType = PaginationType & SearchType & SortType;
