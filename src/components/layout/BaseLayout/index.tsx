// libs
import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
// components
import Header from 'components/layout/Header';

const BaseLayout:FC = () => (
  <>
    <Header />
    <main className="wrapper main">
      <Outlet />
    </main>
  </>
);

export default BaseLayout;
