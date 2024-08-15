// libs
import { type FC, useState } from 'react';
import { Button, Dialog } from '@blueprintjs/core';
// components
import ProjectCreateForm from 'components/layout/Projects/Create/Form';

const ProjectCreate:FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDialog = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <Button intent="success" onClick={toggleDialog} text="Создать проект" variant="minimal" />
      <Dialog isOpen={isOpen} onClose={toggleDialog} title="Создать проект">
        <ProjectCreateForm onClose={toggleDialog} />
      </Dialog>
    </div>
  );
};

export default ProjectCreate;
