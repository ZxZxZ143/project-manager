// type
import type { AuthState } from 'store/auth/type';

export const authInitialState: AuthState = {
  id: localStorage.getItem('userId') || null,
  token: localStorage.getItem('authToken') || null,
};
