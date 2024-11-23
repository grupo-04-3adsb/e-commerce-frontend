import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Progress,
  Spinner,
} from "@nextui-org/react";
import useModalGenerico from "./useModalGenerico";
import styles from "./Modal.module.css";

const ModalGeneric = ({
  title,
  body,
  footer,
  timeToClose,
  isVisible,
  onCompleteTime,
  posicao,
  colorProgress,
  onClose,
  subtitle,
  size = "lg",
  loadingModal = false,
  hideCloseButton = false,
  isDismissable = true,
  backdrop,
  customClassNames,
}) => {
  const { isOpen, onOpenChange, progress } = useModalGenerico(
    isVisible,
    timeToClose,
    onCompleteTime
  );

  const { theme } = 'light';

  return (
    <Modal
      backdrop={backdrop}
      isOpen={isOpen}
      placement={posicao}
      onOpenChange={onOpenChange}
      onClose={onClose}
      isKeyboardDismissDisabled={false}
      size={size}
      isDismissable={isDismissable}
      className={`${styles.modal} ${
        theme === "dark" ? "bg-zinc-800" : "bg-slate-200"
      } overflow-y-auto ${customClassNames?.base || ""}`}
      hideCloseButton={hideCloseButton}
    >
      <ModalContent className={theme === "dark" ? "text-white" : "text-black"}>
        <ModalHeader
          className={"flex flex-col gap-1 " + customClassNames?.header}
        >
          <h2 className="text-xl font-semibold">{title}</h2>
          {subtitle && (
            <h3 className="text-xs text-gray-400 mt-2 font-light">
              {subtitle}
            </h3>
          )}
        </ModalHeader>

        <ModalBody className={customClassNames?.body || ""}>
          {loadingModal ? (
            <div className="flex justify-center items-center">
              <Spinner size="lg" />
            </div>
          ) : (
            body
          )}
        </ModalBody>

        <ModalFooter className={customClassNames?.footer || ""}>
          {!loadingModal && footer}
          {timeToClose && (
            <Progress size="md" color={colorProgress} value={progress} />
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalGeneric;
