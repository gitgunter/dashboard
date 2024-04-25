import { useAuth } from '../../context/AuthContext';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';

import css from './DashboardHeader.module.css';

export const DashboardHeader1 = () => {
  const { data, isLoading, logout } = useAuth();

  return (
    <header className={css.DashboardHeader}>
      <ProfileDropdown username={data?.username} isLoading={isLoading} />
      <button type='button' onClick={logout}>
        Log out
      </button>
    </header>
  );
};
