// libraries
import type { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
// components
import BaseLayout from 'components/layout/BaseLayout';
import LogIn from 'components/layout/Login';
import Profile from 'components/layout/Profile';
import ProjectDetail from 'components/layout/ProjectDetail';
import Projects from 'components/layout/Projects';
import ProtectedRoute from 'components/layout/ProtectedRoute';
import TaskDetail from 'components/layout/TaskDetail';
// constants
import { ROUTES } from 'constants/routes';

const App: FC = () => (
  <Routes>
    <Route element={<ProtectedRoute />}>
      <Route element={<BaseLayout />}>
        <Route element={<Projects />} path={ROUTES.HOME} />
        <Route element={<ProjectDetail />} path={ROUTES.PROJECT} />
        <Route element={<TaskDetail />} path={ROUTES.TASK} />
      </Route>
      <Route element={<Profile />} path={ROUTES.PROFILE} />
    </Route>
    <Route element={<LogIn />} path={ROUTES.LOGIN} />
  </Routes>
);

export default App;
