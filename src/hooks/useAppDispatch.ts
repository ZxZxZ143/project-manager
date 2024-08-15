// libs
import { useDispatch } from 'react-redux';
// types
import type { AppDispatch } from 'store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
