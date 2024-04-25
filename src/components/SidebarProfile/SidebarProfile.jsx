import { useRef, useState } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

import css from './SidebarProfile.module.css';

import icon from '../../assets/images/teodriveIcon.svg';
import { ProfileModal } from '../ProfileModal/ProfileModal';
import {
  ArrowRight01,
  Logout03,
  Notification03,
  User,
  Invoice03,
  Settings01,
} from '@icons/index';
import { useClickAway } from '@uidotdev/usehooks';
import ProfileAvatar from '@components/ProfileAvatar/ProfileAvatar';

export const SidebarProfile = () => {
  const [isDropdown, setIsDropdown] = useState(false);
  const [isProfile, setIsProfile] = useState(false);

  const { isLoading, data, logout } = useAuth();

  const buttonRef = useRef(null);

  const dropdownRef = useClickAway((e) => {
    if (!buttonRef.current.contains(e.target)) {
      setIsDropdown(false);
    }
  });

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      setIsDropdown(false);
    }
  };

  const handleOptionClick = (onClickAction) => {
    setIsDropdown(false);
    onClickAction();
  };

  return (
    <div style={{ position: 'relative' }}>
      <ProfileModal isModal={isProfile} onClose={() => setIsProfile(false)} />
      <button
        ref={buttonRef}
        type='button'
        className={css.SidebarProfile}
        onClick={() => setIsDropdown(!isDropdown)}
        onKeyDown={handleKeyDown}
      >
        <ProfileAvatar
          emoji={isLoading ? '1f600' : data?.profile_emoji}
          color={isLoading ? 'white' : data?.profile_background}
        />
        <div className={css.profileData}>
          <span className={css.profileUsername}>{data?.username}</span>
          <span className={css.profileEmail}>{data?.email}</span>
        </div>
        <ArrowRight01 size={20} className={css.profileToggleIcon} />
      </button>
      <LazyMotion features={domAnimation}>
        <AnimatePresence>
          {isDropdown && (
            <ProfileDropdown
              dropRef={dropdownRef}
              onProfile={() => setIsProfile(!isProfile)}
              onPlan={() => handleOptionClick(() => console.log('Plan'))}
              onNoti={() => handleOptionClick(() => console.log('Noti'))}
              onSettings={() =>
                handleOptionClick(() => console.log('Settings'))
              }
              onLogout={() => handleOptionClick(logout)}
            />
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  );
};

export const ProfileDropdown = ({
  onProfile,
  onPlan,
  onSettings,
  onLogout,
  onNoti,
  dropRef,
}) => {
  return (
    <m.div
      ref={dropRef}
      className={css.ProfileDropdown}
      initial={{ opacity: 0, x: -10, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: -10, y: 10, scale: 0.95 }}
      transition={{
        ease: [0.83, 0, 0.17, 1],
      }}
    >
      <div className={css.optionsWrapper}>
        <DropdownOption
          icon={<User size={20} className={css.optionIcon} />}
          label='Mi Perfil'
          onClick={onProfile}
        />
        <DropdownOption
          icon={<Invoice03 size={20} className={css.optionIcon} />}
          label='Plan'
          onClick={onPlan}
        />
        <DropdownOption
          icon={<Notification03 size={20} className={css.optionIcon} />}
          label='Notificaciones'
          onClick={onNoti}
        />
        <DropdownOption
          icon={<Settings01 size={20} className={css.optionIcon} />}
          label='Ajustar perfil'
          onClick={onSettings}
        />
      </div>
      <div className={css.optionsWrapper}>
        <DropdownOption
          icon={<Logout03 size={20} className={css.optionIcon} />}
          label='Cerrar sesión'
          className={css.logoutBtn}
          onClick={onLogout}
        />
        <div className={css.appVersion}>
          <img src={icon} alt='Teodrive logo' style={{ height: '0.875rem' }} />
          <span className={css.version}>Beta version 1.0 · 2024 ©</span>
        </div>
      </div>
    </m.div>
  );
};

export const DropdownOption = ({ icon, label, onClick, className }) => {
  return (
    <button
      type='button'
      className={`${css.DropdownOption} ${className}`}
      onClick={onClick}
    >
      {icon}
      <span className={css.optionLabel}>{label}</span>
    </button>
  );
};
