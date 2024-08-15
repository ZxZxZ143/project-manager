// libs
import {
  type FC, useEffect, useMemo, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { EntityTitle, H2, Spinner } from '@blueprintjs/core';
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
// components
import StatusSection from 'components/layout/ProjectDetail/TasksSection/StatusSection';
import Task from 'components/layout/ProjectDetail/TasksSection/Task';
// types
import type { StatusGroupType } from 'components/layout/ProjectDetail/TasksSection/type';
import { AppToaster } from 'components/shared/Toaster';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';

import { useGetTasksQuery, useUpdateTaskStatusMutation } from 'store/api/task';
import { TaskStatusEnum, type TaskType } from 'store/api/type';
// store
import { userApi } from 'store/api/users';

const TasksSection:FC = () => {
  const [updateStatus] = useUpdateTaskStatusMutation();
  const { projectId } = useParams();
  const { data, isLoading } = useGetTasksQuery(projectId);
  const [tasks, setTasks] = useState<TaskType[] | undefined>(data);
  const dispatch = useAppDispatch();
  const { id: currentUserId } = useAppSelector((state) => state.authState);

  const statusGroup = useMemo(() => (
    tasks?.reduce((acc: StatusGroupType, item) => {
      if (acc[item.status]) {
        acc[item.status].push(item);
      } else {
        acc[item.status] = [item];
      }

      return acc;
    }, {})), [tasks]);

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const updateTaskStatus = (taskId: string, status: TaskStatusEnum) => {
    const tempTasks = [...tasks];

    const newTasks = tempTasks.map((item) => {
      if (item.id === taskId) {
        return {
          ...item,
          status,
        };
      }

      return item;
    });

    setTasks(newTasks);
  };

  const onDragEndHandler = async (event: DragEndEvent) => {
    const { over, active } = event;
    const task = tasks.find((item) => item.id === active.id);

    if (over.id.toString() === task.status || !over) {
      return;
    }

    updateTaskStatus(active.id.toString(), over.id.toString() as TaskStatusEnum);

    try {
      const res = await updateStatus({ id: active.id.toString(), status: over.id.toString() as TaskStatusEnum });

      if (res.error) {
        throw new Error();
      } else {
        if (active.id.toString() === currentUserId) {
          dispatch(userApi.util.invalidateTags(['UserTask']));
        }
        (await AppToaster).show({ message: 'Статус задачи обновлен', intent: 'success' });
      }
    } catch {
      (await AppToaster).show({ message: 'Ошибка обновления статуса', intent: 'danger' });
    }
  };

  if (isLoading) {
    return <Spinner className="projects-loader" size={50} />;
  }

  if (data.length === 0) {
    return <EntityTitle className="empty-task-msg" heading={H2} icon="array-object" subtitle="Вы можете добавить новую задачу прямо сейчас" title="У этого проетка пока нет задач" />;
  }

  return (
    <DndContext onDragEnd={onDragEndHandler}>
      <div className="dnd-section">
        {
            Object.values(TaskStatusEnum).map((key) => (
              <StatusSection key={key} status={key}>
                {
                        statusGroup && statusGroup[key]?.map(({
                          id, title, dueDate, assigneeId,
                        }) => (
                          <Task key={id} assignedTo={assigneeId} dueDate={dueDate} id={id} title={title} />
                        ))
                    }
              </StatusSection>
            ))
        }
      </div>
    </DndContext>
  );
};

export default TasksSection;
