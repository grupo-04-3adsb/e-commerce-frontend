import { useState, useEffect } from "react";
import { useDisclosure } from "@nextui-org/react";

const useModalGenerico = (isVisible, timeToClose, onCompleteTime) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (isVisible) {
      onOpen();
      if (timeToClose && timeToClose > 0) {
        setProgress(0);

        const startTime = Date.now();
        interval = setInterval(() => {
          setProgress(() => {
            const timeElapsed = Date.now() - startTime;
            const percentage = (timeElapsed / timeToClose) * 100;
            if (percentage >= 100) {
              clearInterval(interval);
              onClose();
              if (onCompleteTime) {
                onCompleteTime();
              }
              return 100;
            }
            return percentage;
          });
        }, 100);
      }
    } else {
      onClose();
      setProgress(0);
    }

    return () => clearInterval(interval);
  }, [isVisible]);

  return { isOpen, onOpenChange, progress };
};

export default useModalGenerico;
