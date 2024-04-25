import { useState } from 'react';

import { Notification03 } from '@icons/index';
import Notifications from '../Notifications/Notifications';

import css from './NotificationButton.module.css';

const NotificationButton = () => {
  const [isNotifications, setIsNotifications] = useState(false);

  const openNotifications = () => {
    setIsNotifications(true);
  };

  const closeNotifications = () => {
    setIsNotifications(false);
  };

  return (
    <>
      <Notifications isVisible={isNotifications} onClose={closeNotifications} />
      <button
        type='button'
        className={`${css.NotificationButton}`}
        onClick={openNotifications}
      >
        <Notification03 size={20} className={css.icon} />
      </button>
    </>
  );
};
export default NotificationButton;
