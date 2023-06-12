import React, { useState } from "react";
import styles from "./Edit.module.css";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

interface EditProps {
  sizeId: number | null;
  sizeName: string;
  onConfirmSize: () => void;
  onClose: () => void;
  onSizeChange: (newName: string) => void;
  newSizeName: string;
}

const Edit: React.FC<EditProps> = ({
  sizeId,
  sizeName,
  onConfirmSize,
  onClose,
  onSizeChange,
  newSizeName,
}) => {
  /* const [newCategoryName, setNewCategoryName] = useState(categoryName);*/

  const handleNoClick = () => {
    onClose();
  };

  return (
    <div className={styles.one}>
      <div className={styles.two}>
        <h4>Edit Size</h4>
        <div className={styles.three}>
          <span className={styles.four}>Name</span>
          <input
            className={styles.five}
            value={sizeName}
            onChange={(e) => {
              console.log(e.target.value);
              onSizeChange(e.target.value);
            }}
          />
        </div>
        <div className={styles.seven}>
          <button className={styles.eight} onClick={handleNoClick}>
            Cancel
          </button>
          <button
            className={styles.nine}
            onClick={() => {
              console.log("YES UNUTAR KOMPONENTE");
              onConfirmSize();
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
