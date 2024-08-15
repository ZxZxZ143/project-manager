// libs
import { type FC } from 'react';
import {
  Button, Dialog, DialogBody, DialogFooter, EntityTitle,
} from '@blueprintjs/core';
// types
import type { UserType } from 'store/api/type';

type AssigneeDialogProps = {
  users: UserType[];
  assignUser: (userId: string) => Promise<void>;
  isOpen: boolean;
  onClose: () => void;
};

const AssigneeDialog:FC<AssigneeDialogProps> = ({
  users, assignUser, isOpen, onClose,
}) => {
  const action = <Button intent="danger" onClick={onClose} text="Отмена" />;

  const assignUserHandler = async (userId: string) => {
    await assignUser(userId);
    onClose();
  };

  return (
    <Dialog className="assignee-dialog" isOpen={isOpen} onClose={onClose} title="Выбрать пользователя">
      <DialogBody className="assignee-dialog-body">
        {
                    users.map((user) => (
                      <button key={user.id} onClick={() => assignUserHandler(user.id)} type="button">
                        <EntityTitle icon="user" title={user.username} />
                      </button>
                    ))
                }
      </DialogBody>
      <DialogFooter actions={action} />
    </Dialog>
  );
};

export default AssigneeDialog;
