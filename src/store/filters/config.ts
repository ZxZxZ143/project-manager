// types
import {
  type FiltersType, SortDirectionEnum, SortEnum, type SortType,
} from 'store/filters/type';

export const FiltersInitialState: FiltersType = {
  page: 1,
  direction: SortDirectionEnum.ASC,
  field: SortEnum.DATE,
  search: null,
  limit: 20,
};

export enum SortVariationEnum {
  DATE_ASC = 'Дате (asc)',
  DATE_DESC = 'Дате (desc)',
  NAME_ASC = 'Названию (asc)',
  NAME_DESC = 'Названию (desc)',
}

export const SortVariations = Object.entries(SortVariationEnum).map(([key, label]) => ({
  label,
  value: key,
}));

export const SortVariationsValues = new Map<SortVariationEnum, SortType>([
  [SortVariationEnum.DATE_ASC, { field: SortEnum.DATE, direction: SortDirectionEnum.ASC }],
  [SortVariationEnum.DATE_DESC, { field: SortEnum.DATE, direction: SortDirectionEnum.DESC }],
  [SortVariationEnum.NAME_ASC, { field: SortEnum.NAME, direction: SortDirectionEnum.ASC }],
  [SortVariationEnum.NAME_DESC, { field: SortEnum.NAME, direction: SortDirectionEnum.DESC }],
]);
