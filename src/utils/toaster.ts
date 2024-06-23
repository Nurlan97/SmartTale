import { toast } from 'react-toastify';
export const errorNotify = (mess: string) =>
  toast.error(mess, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    style: {
      border: '2px solid red',
      color: 'red',
      width: '650px',
      borderRadius: '32px',
    },
    closeButton: false,
  });

export const successNotify = (mess: string) =>
  toast.success(mess, {
    position: 'top-center',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'colored',
    style: {
      // border: '2px solid red',
      // color: 'red',
      width: '650px',
      borderRadius: '32px',
    },
    closeButton: false,
  });
