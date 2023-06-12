import React, { useState } from "react";
import styles from "./DeleteMessage.module.css";
import { useEffect } from "react";

interface MessageBoxProps {
  onYes: () => void;
  onClose: () => void;
  onOutsideClick: () => void;
}

const MessageBox: React.FC<MessageBoxProps> = ({
  onYes,
  onClose,
  onOutsideClick,
}) => {
  // useEffect(() => {
  //   const handleOutsideClick = (event: MouseEvent) => {
  //     const target = event.target as HTMLElement;
  //     if (!target.closest(".modalContent")) {
  //       onOutsideClick();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleOutsideClick);
  //   return () => {
  //     document.removeEventListener("mousedown", handleOutsideClick);
  //   };
  // }, [onOutsideClick]);
  const handleNoClick = () => {
    console.log("No click");
    onClose();
  };
  console.log("test");
  return (
    <div className={styles.modalContainer} style={{ display: "flex" }}>
      <div className={styles.modalContent}>
        <p className={styles.message}>Are you sure?</p>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonNO} onClick={handleNoClick}>
            No
          </button>
          <button
            className={styles.buttonYes}
            onClick={() => {
              console.log("YES UNUTAR KOMPONENTE");
              onYes();
            }}
          >
            Yes, Delete it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageBox;
