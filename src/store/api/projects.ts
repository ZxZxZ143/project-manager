// libs
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// types
import type { GetProjectsType, ProjectCreateResData } from 'store/api/type';
import type { CreateProjectFormType } from 'components/layout/Projects/Create/Form/type';
import type { FiltersType } from 'store/filters/type';
// constants
import { BASE_API } from 'constants/API';
// store
import type { RootState } from 'store/index';

export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API}/projects`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).authState;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');

      return headers;
    },
  }),
  tagTypes: ['Projects', 'Project'],
  endpoints: (builder) => ({
    projects: builder.query<GetProjectsType, FiltersType>({
      query: (filters) => ({
        url: '/',
        params: {
          sort: filters?.field, direction: filters?.direction, search: filters?.search, page: filters?.page, limit: filters?.limit,
        },
      }),
      providesTags: (result) => [{ type: 'Projects' as const, id: 'ProjectsList' }, ...(result?.projects.map((item) => ({ type: 'Project' as const, id: item.id })) || [])],
    }),
    createProject: builder.mutation<ProjectCreateResData, CreateProjectFormType>({
      query: (data) => ({
        url: '/',
        method: 'post',
        body: data,
      }),
      invalidatesTags: [{ type: 'Projects' as const, id: 'ProjectsList' }],
    }),
  }),
});

export const { useProjectsQuery, useCreateProjectMutation } = projectsApi;
