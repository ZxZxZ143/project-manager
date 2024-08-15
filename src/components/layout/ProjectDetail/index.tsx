// libs
import { type FC, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Button, Spinner, Text,
} from '@blueprintjs/core';
// components
import CreateTaskDialog from 'components/layout/ProjectDetail/CreateTaskDialog';
import TasksSection from 'components/layout/ProjectDetail/TasksSection';
// hooks
import { useAppSelector } from 'hooks/useAppSelector';
import { useProjectsQuery } from 'store/api/projects';

const ProjectDetail:FC = () => {
  const { projectId } = useParams();
  const filters = useAppSelector((state) => state.filterState);
  const { data, isFetching } = useProjectsQuery({ ...filters });
  const navigate = useNavigate();
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState<boolean>(false);

  if (isFetching) {
    return <Spinner className="projects-loader" size={50} />;
  }

  const projectData = data?.projects?.find((item) => item.id === projectId);

  const toggleDialog = () => {
    setIsCreateTaskOpen((prev) => !prev);
  };

  return (
    <div className="project-detail-container">
      <div className="project-detail-header">
        <div className="project-header-name">
          <Button icon="arrow-left" intent="danger" onClick={() => navigate(-1)} size="large" text="Вернуться назад" variant="minimal" />
          <Text>{projectData ? projectData.name : 'Проект не найден'}</Text>
        </div>
        <Button icon="add" intent="success" onClick={toggleDialog} size="large" text="Добавить задачу" variant="minimal" />
      </div>
      <CreateTaskDialog isOpen={isCreateTaskOpen} onClose={toggleDialog} />
      <div className="tasks-container">
        <TasksSection />
      </div>
    </div>
  );
};

export default ProjectDetail;
