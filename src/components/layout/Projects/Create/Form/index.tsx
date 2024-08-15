// libs
import { type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button, ButtonGroup, DialogBody, DialogFooter,
} from '@blueprintjs/core';
// components
import type { CreateProjectFormType } from 'components/layout/Projects/Create/Form/type';
import FormControl from 'components/shared/Form';
import { AppToaster } from 'components/shared/Toaster';
// config
import { CREATE_PROJECT_FORM_INITIAL_STATE } from 'components/layout/Projects/Create/Form/config';
// hooks
import { useCreateProjectMutation } from 'store/api/projects';

type ProjectCreateFormProps = {
  onClose: () => void;
};

const ProjectCreateForm:FC<ProjectCreateFormProps> = ({ onClose }) => {
  const { handleSubmit, control, formState: { errors } } = useForm<CreateProjectFormType>({
    defaultValues: CREATE_PROJECT_FORM_INITIAL_STATE,
  });
  const [createProject] = useCreateProjectMutation();

  const onSubmit = async (values: CreateProjectFormType) => {
    try {
      const res = await createProject(values);

      if (res) {
        (await AppToaster).show({ message: 'Проект создан успешно', intent: 'success' });
      } else {
        throw new Error();
      }
    } catch {
      (await AppToaster).show({ message: 'Что-то пошло не так', intent: 'danger' });
    }
    onClose();
  };

  const actions = (
    <ButtonGroup>
      <Button intent="danger" onClick={onClose} text="Отмена" variant="solid" />
      <Button intent="success" onClick={handleSubmit(onSubmit)} text="Создать" type="submit" variant="solid" />
    </ButtonGroup>
  );

  return (
    <>
      <DialogBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="name"
            render={
                      ({ field }) => (
                        <FormControl {...field} error={errors.name?.message} label="Название проекта" placeholder="Новый проект" type="text" />
                      )
                  }
            rules={{ required: 'Это обязательное поле' }}
          />
          <Controller
            control={control}
            name="description"
            render={
                      ({ field }) => (
                        <FormControl {...field} error={errors.description?.message} label="Описание проекта" placeholder="Новый крутой стартап..." type="text" />
                      )
                  }
            rules={{ required: 'Это обязательное поле' }}
          />
        </form>
      </DialogBody>
      <DialogFooter actions={actions} />
    </>
  );
};

export default ProjectCreateForm;
