import React, { useState } from "react";
import styles from "./Edit.module.css";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

interface EditProps {
  categoryId: number | null;
  categoryName: string;
  onConfirmCategory: () => void;
  onClose: () => void;
  onCategoryChange: (newName: string) => void;
  newCategoryName: string;
}

const Edit: React.FC<EditProps> = ({
  categoryId,
  categoryName,
  onConfirmCategory,
  onClose,
  onCategoryChange,
  newCategoryName,
}) => {
  /* const [newCategoryName, setNewCategoryName] = useState(categoryName);*/

  const handleNoClick = () => {
    onClose();
  };

  return (
    <div className={styles.one}>
      <div className={styles.two}>
        <h4>Edit Category</h4>
        <div className={styles.three}>
          <span className={styles.four}>Name</span>
          <input
            className={styles.five}
            value={categoryName}
            onChange={(e) => {
              console.log(e.target.value);
              onCategoryChange(e.target.value);
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
              onConfirmCategory();
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
