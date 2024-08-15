// type
import type { TaskFormType } from 'components/layout/ProjectDetail/CreateTaskDialog/Form/type';

export const createTaskFormInitialValues: TaskFormType = {
  title: '',
  description: '',
  dueDate: new Date(),
};
