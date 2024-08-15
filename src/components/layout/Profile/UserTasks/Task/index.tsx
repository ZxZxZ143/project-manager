// libs
import { type FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@blueprintjs/core';
// constants
import { ROUTES } from 'constants/routes';
// hooks
import { useProjectsQuery } from 'store/api/projects';
// store
import { TaskStatusEnum } from 'store/api/type';

type ProfileTaskProps = {
  taskName: string;
  projectId: string;
  taskId: string;
  status: TaskStatusEnum;
};

const ProfileTask:FC<ProfileTaskProps> = ({
  taskName, taskId, status, projectId,
}) => {
  const { data } = useProjectsQuery({});
  const [projectName, setProjectName] = useState<string>('');

  useEffect(() => {
    if (data) {
      const { name } = data.projects.find((project) => project.id === projectId);

      setProjectName(name);
    }
  }, [data, projectId]);

  return (
    <Link className="users-task" to={`${ROUTES.PROJECT_LINK(projectId)}/${ROUTES.TASK_LINK(taskId)}`}>
      <Icon icon="pin" />
      <span>{`Задача - ${taskName} (Проект - ${projectName}) - ${status}`}</span>
    </Link>
  );
};

export default ProfileTask;
