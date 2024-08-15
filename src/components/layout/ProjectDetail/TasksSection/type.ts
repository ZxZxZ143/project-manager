// type
import { TaskStatusEnum, type TaskType } from 'store/api/type';

export type StatusGroupType = {
  [TaskStatusEnum.TODO]?: TaskType[],
  [TaskStatusEnum.IN_PROGRESS]?: TaskType[],
  [TaskStatusEnum.DONE]?: TaskType[],
};
