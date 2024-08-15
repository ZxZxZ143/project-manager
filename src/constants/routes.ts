export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  PROJECT: 'project/:projectId',
  TASK: '/project/:projectId/task/:taskId',
  PROFILE: '/profile',

  PROJECT_LINK: (param: string) => `/project/${param}`,
  TASK_LINK: (param: string) => `task/${param}`,
};
