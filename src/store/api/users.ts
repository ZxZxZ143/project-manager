// libs
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// constants
import { BASE_API } from 'constants/API';
// types
import type { ChangePasswordType, GetUserType, UserProfileType } from 'store/api/type';
// store
import type { RootState } from 'store/index';

export const userApi = createApi({
  reducerPath: 'users',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API}/users`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).authState;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  tagTypes: ['UserTask'],
  endpoints: (builder) => ({
    getUsers: builder.query<GetUserType, void>({
      query: () => ({
        url: '',
      }),
    }),
    getUserProfile: builder.query<UserProfileType, string>({
      query: (userId) => ({
        url: userId,
      }),
      providesTags: ['UserTask'],
    }),
    changePassword: builder.mutation<void, ChangePasswordType>({
      query: ({ oldPassword, newPassword, id }) => ({
        method: 'PATCH',
        url: `${id}/password`,
        body: { oldPassword, newPassword },
      }),
    }),
  }),
});

export const { useGetUsersQuery, useGetUserProfileQuery, useChangePasswordMutation } = userApi;
