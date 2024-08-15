// libs
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from 'store/auth/type';
// config
import { authInitialState } from 'store/auth/config';

const authSlice = createSlice({
  name: 'authState',
  initialState: authInitialState,
  reducers: {
    setAuth(state, action: PayloadAction<AuthState>) {
      localStorage.setItem('authToken', action.payload.token);
      localStorage.setItem('userId', action.payload.id);

      return {
        ...state,
        token: action.payload.token,
        id: action.payload.id,
      };
    },
    logout(state) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userId');

      return {
        ...state,
        token: null,
        id: null,
      };
    },
  },
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice;
