import React, { useState } from "react";
import styles from "./Add.module.css";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

interface AddProps {
  onAddSize: () => void;
  onClose: () => void;
}

const Add: React.FC<AddProps> = ({ onAddSize, onClose }) => {
  const [sizeName, setSizeName] = useState("");

  const handleNoClick = () => {
    onClose();
  };

  const handleAddClick = () => {
    axios
      .post("api/addSize", { size: sizeName })
      .then((response) => {
        // Ovdje možete ažurirati stanje ili izvršiti druge radnje nakon uspješnog POST zahtjeva
        onAddSize();
        onClose();

        if (response.status >= 200 && response.status < 300) {
          toast.success("New size successfully added");
        } else {
          toast.error("Error: " + response.data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred");
      });
  };

  return (
    <div className={styles.one}>
      <div className={styles.two}>
        <div className={styles.three}>
          <h4>Add the new value</h4>
          <div>
            <span className={styles.four}>Name</span>
            <input
              className={styles.five}
              value={sizeName}
              onChange={(e) => setSizeName(e.target.value)}
            />
          </div>
          <span className={styles.six}></span>
        </div>
        <div className={styles.seven}>
          <button className={styles.eight} onClick={handleNoClick}>
            Cancel
          </button>
          <button className={styles.nine} onClick={handleAddClick}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
