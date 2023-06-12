import React, { useState } from "react";
import styles from "./Edit.module.css";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { ChromePicker } from "react-color";

interface EditProps {
  colorId: number | null;
  colorName: string;
  onConfirmColor: () => void;
  onClose: () => void;
  onColorChange: (newName: string) => void;
  onHexChange: (newHex: string) => void;
  newColorName: string;
  newHexCode: string;

  ChangeHexValue: (value: string) => void;
}

const Edit: React.FC<EditProps> = ({
  colorId,
  colorName,
  onConfirmColor,
  onClose,
  onColorChange,
  onHexChange,
  newColorName,
  newHexCode,

  ChangeHexValue,
}) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNoClick = () => {
    onClose();
  };
  console.log("hex code je ", newHexCode);
  const handleColorPickerClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (color: any) => {
    const hex = color.hex;
    onHexChange(hex);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    onColorChange(newName);
    validateForm(newName, newHexCode);
  };

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    onHexChange(newHex);
    validateForm(newColorName, newHex);
  };

  const validateForm = (name: string, hex: string) => {
    setIsFormValid(name !== "" && hex !== ""); // Promijenjen operator u && ovdje
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
        <h4>Edit the field value</h4>
        <div className={styles.three}>
          <span className={styles.four}>Name</span>
          <input
            className={styles.five}
            value={colorName}
            onChange={handleNameChange}
          />
          <span className={styles.four}>Hex Value</span>
          <input
            className={styles.five}
            value={newHexCode}
            onChange={handleHexChange}
          />
        </div>
        <div className={styles.seven}>
          <button className={styles.eight} onClick={handleNoClick}>
            Cancel
          </button>
          <button className={styles.ten} onClick={handleColorPickerClick}>
            Color Picker
          </button>

          <button
            className={styles.nine}
            onClick={onConfirmColor}
            disabled={!isFormValid}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
