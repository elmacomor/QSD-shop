import React, { useState } from "react";
import styles from "./Add.module.css";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { ChromePicker } from "react-color";

interface AddProps {
  onAddColor: () => void;
  onClose: () => void;
  onHexChange: (newHex: string) => void;
  newHexCode: string;
}

const Add: React.FC<AddProps> = ({
  onAddColor,
  onClose,
  onHexChange,
  newHexCode,
}) => {
  const [colorName, setColorName] = useState("");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleNoClick = () => {
    onClose();
  };

  const handleAddClick = () => {
    axios
      .post("api/addColor", { name: colorName, hex_code: newHexCode })
      .then((response) => {
        // Ovdje možete ažurirati stanje ili izvršiti druge radnje nakon uspješnog POST zahtjeva
        onAddColor();
        onClose();

        if (response.status >= 200 && response.status < 300) {
          toast.success("New color successfully added");
        } else {
          toast.error("Error: " + response.data.error);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred");
      });
  };
  const handleColorPickerClick = () => {
    setShowColorPicker(!showColorPicker);
  };
  const handleColorChange = (color: any) => {
    const hex = color.hex;
    onHexChange(hex);
  };
  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    onHexChange(newHex);
  };

  return (
    <div className={styles.one}>
      {showColorPicker && (
        <ChromePicker
          className={styles.colorPicker}
          color={newHexCode}
          onChange={handleColorChange}
        />
      )}
      <div className={styles.two}>
        <div className={styles.three}>
          <h4>Add the new value</h4>
          <div>
            <span className={styles.four}>Name</span>
            <input
              className={styles.five}
              value={colorName}
              onChange={(e) => setColorName(e.target.value)}
            />
          </div>
          <span className={styles.six}></span>
          <div>
            <span className={styles.four}>Hex Value</span>
            <input
              className={styles.five}
              value={newHexCode}
              onChange={handleHexChange}
            />
          </div>
        </div>
        <div className={styles.seven}>
          <button className={styles.eight} onClick={handleNoClick}>
            Cancel
          </button>
          <button className={styles.ten} onClick={handleColorPickerClick}>
            Color Picker
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
