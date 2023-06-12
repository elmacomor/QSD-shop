import styles from "./ChangePassword.module.css";
import { useState } from "react";
import axios from "../../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormData {
  old_password: string;
  new_password: string;
}
const ChangePassword = () => {
  const [formData, setFormData] = useState<FormData>({
    old_password: "",
    new_password: "",
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  console.log("Stara sifra: ", formData.old_password);
  console.log("Nova sifra: ", formData.new_password);

  const handlePassChange = () => {
    axios
      .post("api/changePassword", formData)
      .then((response) => {
        console.log(response.data);
        toast.success("Password changed successfully.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.log(error);
        toast.error("Error changing password.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });
  };

  return (
    <div>
      <div className={styles.Inputs}>
        <input
          className={styles.Input}
          type="password"
          placeholder="Password"
          name="old_password"
          value={formData.old_password}
          onChange={handleOnChange}
        ></input>
        <input
          className={styles.Input}
          type="password"
          placeholder="New Password"
          name="new_password"
          value={formData.new_password}
          onChange={handleOnChange}
        ></input>
      </div>
      <button
        className={styles.ChangeButton}
        onClick={() => handlePassChange()}
      >
        Change password
      </button>
      <ToastContainer />
    </div>
  );
};
export default ChangePassword;
