import { LazyMotion, domAnimation, m } from 'framer-motion';
import Wrap from '../Wrap/Wrap';
import css from './Toast.module.css';

import { Tick02, Cancel01, Alert02, AlertCircle } from '@icons/index';

const Toast = ({ message, caption, type, onClose }) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        key='toast'
        tabIndex={0}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -25 }}
        transition={{
          duration: 0.3,
          ease: [0.87, 0, 0.13, 1],
        }}
        className={css.Toast}
      >
        <Wrap direction='column' width='100%'>
          <Wrap align='center' columnGap='0.5rem' width='100%'>
            {type !== 'default' && (
              <div
                className={`${css.toastIcon} ${
                  type === 'success'
                    ? css.success
                    : type === 'warn'
                    ? css.warn
                    : type === 'error'
                    ? css.error
                    : ''
                }`}
              >
                {type === 'success' && <Tick02 size={20} />}
                {type === 'warn' && <AlertCircle size={20} />}
                {type === 'error' && <Alert02 size={20} />}
              </div>
            )}
            <h1 className={css.toastLabel}>{message}</h1>
            <button onClick={onClose} className={css.toastCloseBtn}>
              <Cancel01 size={16} />
            </button>
          </Wrap>
          {caption && <h2 className={css.toastCaption}>{caption}</h2>}
        </Wrap>
      </m.div>
    </LazyMotion>
  );
};
export default Toast;
