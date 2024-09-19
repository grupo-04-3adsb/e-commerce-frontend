import React, { useEffect, useState } from "react";
import { Card, Button } from "@nextui-org/react";
import {
  BiCheckCircle,
  BiErrorCircle,
  BiInfoCircle,
} from "react-icons/bi";
import styles from "./MessageGeneric.module.css";
import { CgClose } from "react-icons/cg";

const Message = ({ type = "info", message, onClose, isVisible }) => {

  const [visible, setVisible] = useState(isVisible);

  const renderIcon = () => {
    switch (type) {
      case "success":
        return <BiCheckCircle color="#4caf50" className={styles.icon} />;
      case "error":
        return <BiErrorCircle color="#f44336" className={styles.icon} />;
      case "info":
        return <BiInfoCircle color="#2196f3" className={styles.icon} />;
      default:
        return <BiInfoCircle color="#2196f3" className={styles.icon} />;
    }
  };

  const renderMarkerColor = () => {
    switch (type) {
      case "success":
        return styles.markerSuccess;
      case "error":
        return styles.markerError;
      case "info":
        return styles.markerInfo;
      default:
        return styles.markerDefault;
    }
  };

  const renderBackgroundColor = () => {
    switch (type) {
      case "success":
        return styles.cardSuccess;
      case "error":
        return styles.cardError;
      case "info":
        return styles.cardInfo;
      default:
        return styles.cardDefault;
    }
  };

  useEffect(() => {
    setVisible(isVisible)
  },[isVisible])

  return (
     visible && (
      <Card
        className={`${styles.messageCard} ${renderBackgroundColor()}`}
        shadow="md"
        radius="md"
      >
        <div className={styles.messageContent}>
          <div className={`${styles.marker} ${renderMarkerColor()}`}></div>
          <div className={styles.iconContainer}>{renderIcon()}</div>
          <div className={styles.textContainer}>
            <p className={styles.messageText}>{message}</p>
          </div>
          {onClose && (
            <Button
              variant="solid"
              color="white"
              endContent={<CgClose />}
              isIconOnly={true}
              onClick={onClose}
            />
          )}
        </div>
      </Card>
    )
  );
};

export default Message;
