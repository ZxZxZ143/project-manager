// libs
import { type FC } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// constants
import { ROUTES } from 'constants/routes';
// hooks
import { useAppSelector } from 'hooks/useAppSelector';

const ProtectedRoute:FC = () => {
  const token = useAppSelector((state) => state.authState.token);

  return token ? <Outlet /> : <Navigate to={ROUTES.LOGIN} />;
};

export default ProtectedRoute;
