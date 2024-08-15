// libs
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// constants
import { BASE_API } from 'constants/API';
// types
import type {
  AddCommentType,
  AssignUserType,
  CreateTaskType,
  DeleteFileType,
  GetTaskData,
  TaskType,
  UpdateTaskStatusPayload,
  UploadFileType,
} from 'store/api/type';
// store
import type { RootState } from 'store/index';

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_API}/`,
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).authState;

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  tagTypes: ['Task', 'TaskList'],
  endpoints: (builder) => ({
    getTasks: builder.query<GetTaskData, string>({
      query: (id) => ({
        url: `projects/${id}/tasks`,
      }),
      providesTags: (result, error, projectId) => [{ type: 'TaskList', id: projectId }, ...(result?.map((task) => ({ type: 'Task' as const, id: task.id })) || [])],
    }),
    createTask: builder.mutation<TaskType, CreateTaskType>({
      query: ({ id, payload }) => ({
        method: 'POST',
        url: `projects/${id}/tasks`,
        body: { ...payload },
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'TaskList', id }],
    }),
    updateTaskStatus: builder.mutation<void, UpdateTaskStatusPayload>({
      query: ({ id, status }) => ({
        method: 'PATCH',
        url: `tasks/${id}`,
        body: { status },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Task', id }],
    }),
    getTaskDetail: builder.query<TaskType, string>({
      query: (id) => ({
        url: `tasks/${id}`,
      }),
      providesTags: (result, error, id) => [{ type: 'Task', id }],
    }),
    assignUser: builder.mutation<void, AssignUserType>({
      query: ({ taskId, userId }) => ({
        method: 'PATCH',
        url: `tasks/${taskId}`,
        body: { assigneeId: userId },
      }),
      invalidatesTags: (result, error, { taskId }) => [{ type: 'Task', id: taskId }],
    }),
    addComment: builder.mutation<unknown, AddCommentType>({
      query: ({ taskId, comment }) => ({
        method: 'POST',
        url: `tasks/${taskId}/comments`,
        body: { text: comment },
      }),
      invalidatesTags: (result, error, { taskId }) => [{ type: 'Task', id: taskId }],
    }),
    uploadFile: builder.mutation<unknown, UploadFileType>({
      query: ({ taskId, file }) => {
        const formData = new FormData();

        formData.append('file', file);

        return {
          method: 'POST',
          url: `tasks/${taskId}/files`,
          body: formData,
        };
      },
      invalidatesTags: (result, error, { taskId }) => [{ type: 'Task', id: taskId }],
    }),
    downloadFile: builder.query<string, string>({
      query: (filename) => ({
        url: `files/${filename}`,
        responseHandler: async (response) => {
          const blob = await response.blob();

          return URL.createObjectURL(blob);
        },
      }),
    }),
    deleteFile: builder.mutation<void, DeleteFileType>({
      query: ({ taskId, fileId }) => ({
        method: 'DELETE',
        url: `tasks/${taskId}/files/${fileId}`,
      }),
      invalidatesTags: (result, error, { taskId }) => [{ type: 'Task', id: taskId }],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskStatusMutation,
  useGetTaskDetailQuery,
  useAssignUserMutation,
  useAddCommentMutation,
  useUploadFileMutation,
  useDownloadFileQuery,
  useDeleteFileMutation,
} = taskApi;
