// libs
import { type FC, type PropsWithChildren } from 'react';
import { EntityTitle } from '@blueprintjs/core';
import { useDroppable } from '@dnd-kit/core';
// store
import { TaskStatusEnum } from 'store/api/type';

type StatusSectionProps = {
  status: TaskStatusEnum;
};

const statusNaming: Record<TaskStatusEnum, string> = {
  [TaskStatusEnum.TODO]: 'Запланировано',
  [TaskStatusEnum.IN_PROGRESS]: 'В процессе',
  [TaskStatusEnum.DONE]: 'Готово',
};

const StatusSection:FC<PropsWithChildren<StatusSectionProps>> = ({ status, children }) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div
      ref={setNodeRef}
      className="status-section"
    >
      <EntityTitle className="section-title" icon="pin" title={statusNaming[status]} />
      <div className="status-section-tasks">
        {children}
      </div>
    </div>
  );
};

export default StatusSection;
