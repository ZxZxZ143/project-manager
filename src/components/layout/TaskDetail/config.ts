// types
import { TaskStatusEnum } from 'store/api/type';

export const statusSelectOptions = [
  { label: 'Запланировано', value: TaskStatusEnum.TODO },
  { label: 'В процессе', value: TaskStatusEnum.IN_PROGRESS },
  { label: 'Готово', value: TaskStatusEnum.DONE },
];
