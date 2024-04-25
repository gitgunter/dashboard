import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { useClickAway } from '@uidotdev/usehooks';

import css from './Notifications.module.css';

import Wrap from '@components/common/Wrap/Wrap';
import { Cancel01, Notification03 } from '@icons/index';

const Notifications = ({ isVisible, onClose }) => {
  const notificationsRef = useClickAway(() => onClose());

  const onEscapePress = (e) => {
    e.preventDefault();
    onClose();
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onEscapePress(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <AnimatePresence>
      {isVisible && (
        <LazyMotion features={domAnimation}>
          <m.div
            key='modal'
            tabIndex={0}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className={css.modalOverlay}
          >
            <m.div
              ref={notificationsRef}
              initial={{ opacity: 0, x: '100%', scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: '100%', scale: 0.95 }}
              transition={{
                duration: 0.3,
                ease: [0.83, 0, 0.17, 1],
              }}
              className={css.Notifications}
            >
              <Wrap
                align='center'
                justify='space-between'
                width='100%'
                height='fit-content'
                className={css.header}
              >
                <h1 className={css.title}>Notificaciones</h1>
                <button
                  type='button'
                  onClick={onClose}
                  className={css.closeBtn}
                >
                  <Cancel01 size={20} />
                </button>
              </Wrap>
              <Wrap direction='column' align='center' justify='center' height='100%' rowGap='0.5rem' className={css.emptyState}>
                <Notification03 size={32} />
                <p className={css.emptyMessage}>No hay notificaciones</p>
              </Wrap>
            </m.div>
          </m.div>
        </LazyMotion>
      )}
    </AnimatePresence>,
    document.getElementById('overlays')
  );
};
export default Notifications;
