import toast from 'react-hot-toast';

const showToast = (message, type = 'error', options = {}) => {
  const defaultOptions = {
    duration: 3000,
    position: 'top-right',
    ...options,
  };

  switch (type) {
    case 'success':
      toast.success(message, defaultOptions);
      break;
    case 'error':
      toast.error(message, defaultOptions);
      break;
    case 'loading':
      toast.loading(message, defaultOptions);
      break;
    default:
      toast(message, defaultOptions);
  }
};

export default showToast;
