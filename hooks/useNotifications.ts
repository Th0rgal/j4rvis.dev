import { toast } from "react-toastify";

export const useNotifications = () => {
  const showError = (message: string, options: any = {}) => {
    toast.error(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      ...options,
    });
  };

  const showInfo = (message: string, options: any = {}) => {
    toast.info(message, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      ...options,
    });
  };

  return { showError, showInfo };
};
