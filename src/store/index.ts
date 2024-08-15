// libs
import { configureStore } from '@reduxjs/toolkit';

// api
import { authApi } from 'store/api/auth';
import { projectsApi } from 'store/api/projects';
import { taskApi } from 'store/api/task';
import { userApi } from 'store/api/users';
// slice
import authSlice from 'store/auth/slice';
import filterSlice from 'store/filters/slice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    authState: authSlice.reducer,
    filterState: filterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat([
      authApi.middleware,
      projectsApi.middleware,
      taskApi.middleware,
      userApi.middleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
