// libs
import {
  createApi, fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
// types
import type { LogInFormData } from 'components/layout/Login/type';
// constants
import { BASE_API } from 'constants/API';

import type { LoginResData } from 'store/api/type';
import type { RootState } from 'store/index';

export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).authState;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  endpoints: (builder) => (
    {
      login: builder.mutation<LoginResData, LogInFormData>({
        query: (userCredit) => ({
          url: '/login',
          method: 'POST',
          body: userCredit,
        }),
      }),
    }
  ),
});

export const { useLoginMutation } = authApi;
