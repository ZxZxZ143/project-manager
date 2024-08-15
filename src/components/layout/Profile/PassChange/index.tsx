// libs
import { type FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, H4 } from '@blueprintjs/core';
// type
import type { PassChangeFormType } from 'components/layout/Profile/PassChange/type';
// components
import FormControl from 'components/shared/Form';
import { AppToaster } from 'components/shared/Toaster';
import { changePassFormInitialState } from 'components/layout/Profile/PassChange/config';
// hooks
import { useAppSelector } from 'hooks/useAppSelector';
import { useChangePasswordMutation } from 'store/api/users';

const ProfilePassChange:FC = () => {
  const {
    handleSubmit, control, reset, formState: { errors },
  } = useForm<PassChangeFormType>({
    defaultValues: changePassFormInitialState,
  });
  const [changePassword] = useChangePasswordMutation();
  const { id } = useAppSelector((state) => state.authState);

  const onSubmit = async (values: PassChangeFormType) => {
    try {
      const res = await changePassword({ id, ...values });

      if (res.error) {
        const error = res.error as { status: number, data: { message: string } };

        throw new Error(error.data.message);
      } else {
        reset();

        (await AppToaster).show({ message: 'Пароль изменен', intent: 'success' });
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        (await AppToaster).show({ message: err.message, intent: 'danger' });
      } else {
        (await AppToaster).show({ message: 'Произошла ошибка', intent: 'danger' });
      }
    }
  };

  return (
    <div className="password-change">
      <H4>Смена пароля:</H4>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="oldPassword"
          render={({ field }) => (
            <FormControl
              {...field}
              additionalType="password"
              error={errors.oldPassword?.message}
              placeholder="Старый пароль"
              type="text"
            />
          )}
          rules={{
            required: 'Это обязательное поле',
          }}
        />
        <Controller
          control={control}
          name="newPassword"
          render={({ field }) => (
            <FormControl
              {...field}
              additionalType="password"
              error={errors.newPassword?.message}
              placeholder="Новый пароль"
              type="text"
            />
          )}
          rules={{
            required: 'Это обязательное поле',
          }}
        />
        <Button intent="success" text="Сменить пароль" type="submit" variant="outlined" />
      </form>
    </div>
  );
};

export default ProfilePassChange;
