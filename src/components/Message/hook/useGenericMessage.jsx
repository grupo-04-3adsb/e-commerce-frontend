import { useMemo } from 'react';
import { BiCheckCircle, BiErrorCircle, BiInfoCircle } from 'react-icons/bi';
import styles from '../MessageGeneric.module.css';

const useGenericMessage = (type) => {
  const renderIcon = useMemo(() => {
    switch (type) {
      case 'success':
        return <BiCheckCircle color="#4caf50" className={styles.icon} />;
      case 'error':
        return <BiErrorCircle color="#f44336" className={styles.icon} />;
      case 'info':
        return <BiInfoCircle color="#2196f3" className={styles.icon} />;
      default:
        return <BiInfoCircle color="#2196f3" className={styles.icon} />;
    }
  }, [type]);

  const renderMarkerColor = useMemo(() => {
    switch (type) {
      case 'success':
        return styles.markerSuccess;
      case 'error':
        return styles.markerError;
      case 'info':
        return styles.markerInfo;
      default:
        return styles.markerDefault;
    }
  }, [type]);

  const renderBackgroundColor = useMemo(() => {
    switch (type) {
      case 'success':
        return styles.cardSuccess;
      case 'error':
        return styles.cardError;
      case 'info':
        return styles.cardInfo;
      default:
        return styles.cardDefault;
    }
  }, [type]);

  return {
    renderIcon,
    renderMarkerColor,
    renderBackgroundColor
  };
};

export default useGenericMessage;
