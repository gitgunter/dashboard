import { createContext, useContext, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Toast from '@components/common/Toast/Toast';

const ToastContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const baseToast = (msg, caption, type = 'default') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prevToasts) => [...prevToasts, { msg, caption, id, type }]);

    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const toast = (msg, caption) => baseToast(msg, caption, 'default');
  toast.success = (msg, caption) => baseToast(msg, caption, 'success');
  toast.error = (msg, caption) => baseToast(msg, caption, 'error');
  toast.warn = (msg, caption) => baseToast(msg, caption, 'warn');

  const removeToast = (id) => {
    setToasts((prevToasts) =>
      prevToasts.filter((toastItem) => toastItem.id !== id)
    );
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        style={{
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          rowGap: '0.625rem',
          bottom: '2rem',
          right: '2rem',
        }}
      >
        <AnimatePresence>
          {toasts.map((toastItem) => (
            <Toast
              key={toastItem.id}
              message={toastItem.msg}
              caption={toastItem.caption}
              onClose={() => removeToast(toastItem.id)}
              type={toastItem.type}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};
