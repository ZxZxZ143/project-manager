// types
import type { PassChangeFormType } from 'components/layout/Profile/PassChange/type';
import type { TaskFormType } from 'components/layout/ProjectDetail/CreateTaskDialog/Form/type';
import type { CreateProjectFormType } from 'components/layout/Projects/Create/Form/type';

export type UserType = {
  id: string | null;
  username: string | null;
};

export type LoginResData = {
  token: string;
  user: UserType;
};

export type ProjectCreateResData = {
  id: string;
  createdAt: string;
} & CreateProjectFormType;

export type GetProjectsType = {
  projects: ProjectCreateResData[];
  totalPages: number;
  total: number;
};

export type CreateTaskType = {
  id: string;
  payload: TaskFormType
};

export enum TaskStatusEnum {
  TODO = 'todo',
  IN_PROGRESS = 'in progress',
  DONE = 'done',
}

export type CommentType = {
  id: string;
  text: string;
  createdAt: string;
  author: string;
};

export type FileType = {
  id: string;
  filename: string;
  originalName: string;
  uploadedAt: string;
};

export type TaskType = {
  assigneeId: string | null;
  comments: CommentType[];
  createdAt: string;
  description: string;
  dueDate: string;
  files: FileType[];
  id: string;
  projectId: string;
  status: TaskStatusEnum
  title: string;
};

export type GetTaskData = TaskType[];

export type UpdateTaskStatusPayload = {
  id: string;
  status: TaskStatusEnum;
};

export type AssignUserType = {
  taskId: string;
  userId: string;
};

export type GetUserType = UserType[];

export type AddCommentType = {
  taskId: string;
  comment: string;
};

export type UploadFileType = {
  taskId: string;
  file: File,
};

export type UserProfileType = UserType & {
  createdAt: string;
  assignedTasks: TaskType[];
};

export type ChangePasswordType = {
  id: string;
} & PassChangeFormType;

export type DeleteFileType = {
  taskId: string;
  fileId: string;
};
