// libs
import { type FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Button, Section } from '@blueprintjs/core';
// components
import type { LogInFormData } from 'components/layout/Login/type';
import FormControl from 'components/shared/Form';
import { AppToaster } from 'components/shared/Toaster';
import { LogInFormInitialValues } from 'components/layout/Login/config';
// constants
import { ROUTES } from 'constants/routes';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useLoginMutation } from 'store/api/auth';
// store
import { setAuth } from 'store/auth/slice';

const LogIn:FC = () => {
  const { handleSubmit, control, formState: { errors } } = useForm<LogInFormData>({
    defaultValues: LogInFormInitialValues,
  });
  const [login, { error }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data: LogInFormData) => {
    try {
      const res = await login(data).unwrap();

      if (res) {
        dispatch(setAuth({ token: res.token, id: res.user.id }));
        (await AppToaster).show({ message: 'Вход успешно выполнен.', intent: 'success' });
        navigate(ROUTES.HOME, { replace: true });
      } else {
        throw Error();
      }
    } catch {
      console.log(error);
    }
  };

  useEffect(() => {
    if (error) {
      const { data } = error as { data: { message:string } };

      AppToaster.then((toaster) => toaster.show({ message: data.message, intent: 'danger' }));
    }
  }, [error]);

  return (
    <div className="wrapper logIn-container">
      <Section className="logIn-form-container" icon="log-in" title="Вход в аккаунт">
        <form className="logIn-form" onSubmit={handleSubmit(onSubmit)}>
          <Controller control={control} name="username" render={({ field }) => <FormControl {...field} error={errors.username?.message} label="Логин" placeholder="Petiy Pupkin" type="text" />} rules={{ required: 'Это обязательное поле' }} />
          <Controller control={control} name="password" render={({ field }) => <FormControl {...field} additionalType="password" error={errors.password?.message} label="Пароль" placeholder="123456" type="text" />} rules={{ required: 'Это обязательное поле' }} />
          <Button className="logIn-submit-btn" icon="log-in" intent="success" size="medium" type="submit" variant="outlined">Войти</Button>
        </form>
      </Section>
    </div>
  );
};

export default LogIn;
