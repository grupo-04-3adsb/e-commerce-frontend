import React, { createContext, useContext } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const notify = {
    success: (message, options = {}) => toast.success(message, options),
    error: (message, options = {}) => toast.error(message, options),
    warning: (message, options = {}) => toast.warning(message, options),
    info: (message, options = {}) => toast.info(message, options),
  };

  return (
    <ToastContext.Provider value={notify}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
