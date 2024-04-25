import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { useEffect } from 'react';

export const ProfileModal = ({ isModal, onClose }) => {
  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleTabKey = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (isModal) {
      document.addEventListener('keydown', handleTabKey);
    } else {
      document.removeEventListener('keydown', handleTabKey);
    }

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isModal]);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        {isModal && (
          <m.div
            style={{
              position: 'fixed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              top: 0,
              left: 0,
              zIndex: 10,
              padding: '24px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              width: '100%',
              height: '100%',
            }}
            tabIndex={0}
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              ease: 'easeInOut',
            }}
          >
            <m.div
              style={{ backgroundColor: 'red' }}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              Profile Modal
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  );
};
