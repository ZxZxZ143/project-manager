// libs
import { type FC } from 'react';
import { Dialog } from '@blueprintjs/core';
// components
import CreateTaskDialogForm from 'components/layout/ProjectDetail/CreateTaskDialog/Form';

type CreateTaskDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateTaskDialog:FC<CreateTaskDialogProps> = ({ onClose, isOpen }) => (
  <Dialog isOpen={isOpen} onClose={onClose} title="Создать задачу">
    <CreateTaskDialogForm onClose={onClose} />
  </Dialog>
);

export default CreateTaskDialog;
