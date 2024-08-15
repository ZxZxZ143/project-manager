// libs
import { type TypedUseSelectorHook, useSelector } from 'react-redux';
// store
import type { RootState } from 'store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
