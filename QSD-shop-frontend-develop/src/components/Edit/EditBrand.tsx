import React, { useState } from "react";
import styles from "./Edit.module.css";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

interface EditProps {
  brandId: number | null;
  brandName: string;
  onConfirmBrand: () => void;
  onClose: () => void;
  onBrandChange: (newName: string) => void;
  newBrandName: string;
}

const Edit: React.FC<EditProps> = ({
  brandId,
  brandName,
  onConfirmBrand,
  onClose,
  onBrandChange,
  newBrandName,
}) => {
  /* const [newCategoryName, setNewCategoryName] = useState(categoryName);*/
  const handleNoClick = () => {
    onClose();
  };
  console.log("Brand ", brandName);

  return (
    <div className={styles.one}>
      <div className={styles.two}>
        <h4>Edit Brand</h4>
        <div className={styles.three}>
          <span className={styles.four}>Name</span>
          <input
            className={styles.five}
            value={brandName}
            onChange={(e) => {
              console.log(e.target.value);
              onBrandChange(e.target.value);
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
              onConfirmBrand();
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
