// libs
import {
  type ChangeEvent, type FC, useMemo, useState,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, H4, H5, HTMLSelect, Spinner,
} from '@blueprintjs/core';
// components
import AssigneeDialog from 'components/layout/TaskDetail/AssigneeDialog';
import CommentSection from 'components/layout/TaskDetail/CommentSection';
import FilesSection from 'components/layout/TaskDetail/FilesSection';
import { AppToaster } from 'components/shared/Toaster';
// config
import { statusSelectOptions } from 'components/layout/TaskDetail/config';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';

import { useAssignUserMutation, useGetTaskDetailQuery, useUpdateTaskStatusMutation } from 'store/api/task';
// types
import { TaskStatusEnum } from 'store/api/type';
// store
import { useGetUsersQuery, userApi } from 'store/api/users';

const TaskDetail: FC = () => {
  const navigate = useNavigate();
  const [updateStatus] = useUpdateTaskStatusMutation();
  const { taskId } = useParams();
  const { data, isLoading } = useGetTaskDetailQuery(taskId!);
  const [assignUser] = useAssignUserMutation();
  const { id: currentUserId } = useAppSelector((state) => state.authState);
  const { data: users, isLoading: isUserLoading } = useGetUsersQuery();
  const assigneeName = useMemo(() => {
    if (users && data?.assigneeId && data) {
      return users.find((item) => item.id === data.assigneeId)?.username;
    }

    return 'Не назначено';
  }, [data, users]);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState<boolean>(false);
  const formatter = Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const dispatch = useAppDispatch();

  const toggleAssignDialog = () => {
    setIsAssignDialogOpen((prev) => !prev);
  };

  const updateTaskStatus = async (event: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as TaskStatusEnum;

    if (newStatus === data.status) {
      return;
    }

    try {
      const res = await updateStatus({ id: data.id, status: newStatus });

      if (res.error) {
        throw new Error();
      } else {
        if (data.assigneeId === currentUserId) {
          dispatch(userApi.util.invalidateTags(['UserTask']));
        }
        (await AppToaster).show({ message: 'Статус задачи обновлен', intent: 'success' });
      }
    } catch {
      (await AppToaster).show({ message: 'Ошибка обновления статуса', intent: 'danger' });
    }
  };

  const assignUserHandler = async (userId: string) => {
    if (userId === data.assigneeId) {
      return;
    }

    try {
      const res = await assignUser({ userId, taskId: data.id });

      if (res.error) {
        throw new Error();
      } else {
        (await AppToaster).show({ message: 'Пользователь назначен', intent: 'success' });
      }
    } catch {
      (await AppToaster).show({ message: 'Произошла ошибка', intent: 'danger' });
    }
  };

  if (isLoading) {
    return (
      <Spinner className="projects-loader" size={50} />
    );
  }

  return (
    <div className="task-detail">
      <div className="task-detail-header">
        <Button icon="arrow-left" intent="danger" onClick={() => navigate(-1)} size="large" text="Вернуться назад" variant="minimal" />
        <H4 className="task-title">{data.title}</H4>
        <HTMLSelect minimal onChange={updateTaskStatus} options={statusSelectOptions} value={data.status} />
      </div>
      <div className="task-detail-main">
        <div className="task-desc">
          <H5>Описание задачи: </H5>
          <p>{data.description}</p>
        </div>
        <div className="task-assignee">
          <H5>Исполнитель:</H5>
          <p className={isUserLoading ? 'bp6-skeleton' : ''}>{assigneeName || 'Не назначено'}</p>
          {
            data.assigneeId !== currentUserId && <Button intent="success" onClick={() => assignUserHandler(currentUserId)} text="Назначить себя" variant="minimal" />
          }
          <Button intent="success" onClick={toggleAssignDialog} text="Назначить человека" variant="minimal" />
          <AssigneeDialog assignUser={assignUserHandler} isOpen={isAssignDialogOpen} onClose={toggleAssignDialog} users={users} />
        </div>
        <div className="task-due-date">
          <H5>Дедлайн:</H5>
          <p>{formatter.format(new Date(data.dueDate))}</p>
        </div>
        <FilesSection files={data.files} />
        <CommentSection comments={data.comments} />
      </div>
    </div>
  );
};

export default TaskDetail;
