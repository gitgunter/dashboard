import { useEffect } from 'react';
import { useClickAway } from '@uidotdev/usehooks';
import { createPortal } from 'react-dom';
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';

import css from './ModalWrap.module.css';

const UpgradePlanModal = ({ isVisible, onClose, modalKey, children }) => {
  const modalRef = useClickAway(() => onClose());

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
            key={modalKey || 'modal'}
            tabIndex={0}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
            }}
            className={css.modalOverlay}
          >
            <m.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{
                duration: 0.2,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              {children}
            </m.div>
          </m.div>
        </LazyMotion>
      )}
    </AnimatePresence>,
    document.getElementById('overlays')
  );
};
export default UpgradePlanModal;
