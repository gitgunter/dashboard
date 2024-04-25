import { useState } from 'react';

import css from './ProfileDropdown.module.css';
import avatar from '../../assets/images/femaleAvatar.png';

const ProfileDropdown = ({ username, isLoading }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  return (
    <div className={`${css.ProfileDropdown} ${isLoading ? css.loading : ''}`}>
      {isLoading ? (
        <SkeletonLoader />
      ) : (
        <button
          className={`${css.profileDropdownButton} ${
            dropdownVisible ? css.active : ''
          }`}
        >
          <img className={css.profileAvatar} src={avatar} />
          {isLoading ? 'Loading...' : null}
          <span className={css.profileUsername}>{username}</span>
        </button>
      )}
    </div>
  );
};
export default ProfileDropdown;

export const SkeletonLoader = () => {
  return (
    <div className={css.SkeletonLoader}>
      <div className={css.skeletonPhoto} />
      <div className={css.skeletonUsername} />
    </div>
  );
};
