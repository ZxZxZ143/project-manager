// libs
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
// config
import { FiltersInitialState, SortVariationEnum, SortVariationsValues } from 'store/filters/config';
// types
import { type PaginationType } from 'store/filters/type';

const filterSlice = createSlice({
  name: 'filter',
  initialState: FiltersInitialState,
  reducers: {
    setPagination(state, action: PayloadAction<PaginationType>) {
      return {
        ...state,
        page: action.payload.page,
        limit: action.payload.limit,
      };
    },
    setSearch(state, action: PayloadAction<string>) {
      return {
        ...state,
        search: action.payload,
      };
    },
    setSort(state, action: PayloadAction<SortVariationEnum>) {
      const sort = SortVariationsValues.get(action.payload);

      return {
        ...state,
        ...sort,
      };
    },
  },
});

export const { setPagination, setSort, setSearch } = filterSlice.actions;

export default filterSlice;
