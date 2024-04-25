import { useState } from 'react';

import { useAuth } from '@context/AuthContext';
import Wrap from '@components/common/Wrap/Wrap';
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar';
import { ArrowRight01 } from '@assets/icons';

import css from './AccountButton.module.css';

const AccountButton = ({ onClick }) => {
  const [isAccountMenu, SetIsAccountMenu] = useState(false);

  const { logout, isLoading, data } = useAuth();

  const handleLogout = () => {
    SetIsAccountMenu(true);
    logout();
  };

  return (
    <div
      className={`${css.AccountButton} ${isAccountMenu ? css.active : ''}`}
      onClick={onClick}
    >
      <ProfileAvatar
        color={data?.profile_background}
        emoji={data?.profile_emoji}
      />
      <Wrap display='grid'>
        <h1 className={css.username}>{isLoading ? '--' : data?.username}</h1>
        <h2 className={css.email}>{isLoading ? '--' : data?.email}</h2>
      </Wrap>
      <ArrowRight01 size={20} className={css.icon} />
    </div>
  );
};
export default AccountButton;
