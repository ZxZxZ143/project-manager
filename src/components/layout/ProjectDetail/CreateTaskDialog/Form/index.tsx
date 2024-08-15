// libs
import { type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import {
  Button, ButtonGroup, DialogBody, DialogFooter,
} from '@blueprintjs/core';
import { ru } from 'date-fns/locale';
// type
import type { TaskFormType } from 'components/layout/ProjectDetail/CreateTaskDialog/Form/type';
// components
import FormControl from 'components/shared/Form';
import { AppToaster } from 'components/shared/Toaster';
// config
import { createTaskFormInitialValues } from 'components/layout/ProjectDetail/CreateTaskDialog/Form/config';
// store
import { useCreateTaskMutation } from 'store/api/task';

type CreateTaskDialogFormProps = {
  onClose: () => void;
};

const CreateTaskDialogForm:FC<CreateTaskDialogFormProps> = ({ onClose }) => {
  const { handleSubmit, control, formState: { errors } } = useForm<TaskFormType>({
    defaultValues: createTaskFormInitialValues,
  });
  const { projectId } = useParams();
  const [createTask] = useCreateTaskMutation();

  const onSubmit = async (values: TaskFormType) => {
    try {
      const res = await createTask({ id: projectId, payload: values });

      if (res.data) {
        (await AppToaster).show({ message: 'Задача создана', intent: 'success' });
      } else {
        throw new Error();
      }
    } catch {
      (await AppToaster).show({ message: 'Произошла ошибка', intent: 'danger' });
    }
    onClose();
  };

  const actions = (
    <ButtonGroup>
      <Button intent="danger" onClick={onClose} text="Отмена" variant="solid" />
      <Button intent="success" onClick={handleSubmit(onSubmit)} text="Создать" variant="solid" />
    </ButtonGroup>
  );

  return (
    <>
      <DialogBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <FormControl {...field} error={errors.title?.message} placeholder="Название задачи" type="text" />
            )}
            rules={{
              required: 'Это обязательное поле',
            }}
          />
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <FormControl {...field} error={errors.description?.message} placeholder="Описание задачи" type="text" />
            )}
            rules={{
              required: 'Это обязательное поле',
            }}
          />
          <Controller
            control={control}
            name="dueDate"
            render={({ field }) => (
              <FormControl {...field} error={errors.dueDate?.message} highlightCurrentDay locale={ru} minDate={new Date()} placeholder={new Date().toLocaleDateString()} type="date" />
            )}
            rules={{
              required: 'Это обязательное поле',
            }}
          />
        </form>
      </DialogBody>
      <DialogFooter actions={actions} />
    </>
  );
};

export default CreateTaskDialogForm;
