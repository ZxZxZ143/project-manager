// libs
import { type FC } from 'react';
import { H4 } from '@blueprintjs/core';
// components
import ProfileTask from 'components/layout/Profile/UserTasks/Task';
// store
import type { TaskType } from 'store/api/type';

type UserTaskProps = {
  tasks: TaskType[];
};

const UserTasks:FC<UserTaskProps> = ({ tasks }) => (
  <div>
    <H4>Мои задачи:</H4>
    <div>
      {
                    tasks.map(({
                      title, projectId, id, status,
                    }) => (
                      <ProfileTask key={id} projectId={projectId} status={status} taskId={id} taskName={title} />
                    ))
                }
    </div>
  </div>
);

export default UserTasks;
