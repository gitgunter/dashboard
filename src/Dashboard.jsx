import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import css from './Dashboard.module.css';

import Sidebar from '@components/dashboard/Sidebar/Sidebar';
import ScreenLoader from '@components/ScreenLoader/ScreenLoader';

function Dashboard() {
  return (
    <div className={css.Dashboard}>
      <Sidebar />
      <Suspense fallback={<ScreenLoader />}>
        <Outlet />
      </Suspense>
    </div>
  );
}
export default Dashboard;
