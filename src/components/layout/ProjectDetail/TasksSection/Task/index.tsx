// libs
import {
  type FC, useMemo, useRef,
} from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  EntityTitle,
  H3,
} from '@blueprintjs/core';
import { useDraggable } from '@dnd-kit/core';
// constants
import { ROUTES } from 'constants/routes';

// hooks
import { useGetUsersQuery } from 'store/api/users';

type TaskProps = {
  id: string;
  title: string;
  dueDate: string;
  assignedTo: string;
};

const Task: FC<TaskProps> = ({
  id, dueDate, title, assignedTo,
}) => {
  const {
    attributes, listeners, setNodeRef, transform,
  } = useDraggable({
    id,
  });
  const { data, isLoading } = useGetUsersQuery();
  const navigate = useNavigate();
  const isDraggingRef = useRef<boolean>(false);
  const formatter = useMemo(() => new Intl.DateTimeFormat('ru-RU', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }), []);
  const assignedName = useMemo(() => {
    if (data) {
      const name = data.find((a) => a.id === assignedTo)?.username;

      if (name) {
        return name;
      }
    }

    return 'не назначено';
  }, [assignedTo, data]);

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : 'none',
  };

  const handleMouseDown = () => {
    isDraggingRef.current = false;
  };

  const handlePointerMove = () => {
    isDraggingRef.current = true;
  };

  const handleClick = () => {
    if (!isDraggingRef.current) {
      navigate(ROUTES.TASK_LINK(id)); // переход только если это не drag
    }
  };

  return (
    <Card
      ref={setNodeRef}
      className="task"
      interactive
      onMouseDown={handleMouseDown}
      onMouseUp={handleClick}
      onPointerMove={handlePointerMove}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="task-header">
        <H3>{title}</H3>
        <p>{formatter.format(new Date(dueDate))}</p>
      </div>
      <EntityTitle className={`assigned-name ${isLoading ? 'bp6-skeleton' : ''}`} icon="user" title={assignedName} />
    </Card>
  );
};

export default Task;
