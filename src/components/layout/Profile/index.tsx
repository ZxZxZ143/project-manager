// libs
import { type FC } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button, Icon, Spinner,
} from '@blueprintjs/core';
// components
import ProfilePassChange from 'components/layout/Profile/PassChange';
import UserTasks from 'components/layout/Profile/UserTasks';
// constants
import { ROUTES } from 'constants/routes';
// hooks
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
// store
import { useGetUserProfileQuery } from 'store/api/users';
import { logout } from 'store/auth/slice';

const Profile:FC = () => {
  const { id } = useAppSelector((state) => state.authState);
  const { data, isFetching } = useGetUserProfileQuery(id);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (isFetching) {
    return <Spinner className="projects-loader" size={50} />;
  }

  const logOutHandle = () => {
    dispatch(logout());
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="wrapper">
      <header className="profile-header">
        <Button intent="danger" onClick={() => navigate(-1)} text="Вернуться назад" variant="minimal" />
        <Button intent="danger" onClick={logOutHandle} text="Выйти" variant="solid" />
      </header>
      <main className="profile-container">
        <div className="profile-user-info">
          <div className="profile-username">
            <Icon icon="user" size={82} />
            <span>{data.username}</span>
          </div>
        </div>
        <ProfilePassChange />
        <UserTasks tasks={data.assignedTasks} />
      </main>
    </div>
  );
};

export default Profile;
