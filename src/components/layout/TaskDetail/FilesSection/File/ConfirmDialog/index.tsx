// libs
import { type FC } from 'react';
import {
  Button, ButtonGroup, Dialog, DialogBody, DialogFooter, Icon,
} from '@blueprintjs/core';

type FileConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  deleteFile: () => Promise<void> ;
};

const FileConfirmDialog:FC<FileConfirmDialogProps> = ({ deleteFile, onClose, isOpen }) => {
  const actions = (
    <ButtonGroup>
      <Button intent="success" onClick={onClose} text="Отмена" />
      <Button intent="danger" onClick={deleteFile} text="Удалить" />
    </ButtonGroup>
  );

  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <DialogBody className="delete-confirm-popup">
        <Icon icon="trash" intent="danger" size={32} />
        <p>Удалить файл?</p>
      </DialogBody>
      <DialogFooter actions={actions} />
    </Dialog>
  );
};

export default FileConfirmDialog;
