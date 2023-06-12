import React, { useState } from "react";
import styles from "./ForgotPassword.module.css";
import forgotPassword from "../../images/forgotPassword.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
interface ForgotPasswordFormData {
  email: string;
}
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ForgotPasswordFormData>({
    email: "",
  });
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    console.log(event.target.value);
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  console.log("Form data je ,", formData);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("/api/requestValidationKey", {
        email: formData.email,
      });
      // Handle successful response, e.g., show success message or navigate to a confirmation page
      navigate("/changepasswordpage", { state: { email: formData.email } });
    } catch (error) {
      console.error(error);
      setError("Error sending password reset email");
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.forgotPasswordMain}>
        <div className={styles.goBack}>
          <button>
            <FontAwesomeIcon
              className={styles.faarrowleft}
              icon={faArrowLeft}
              onClick={() => navigate("/login")}
            />
          </button>
        </div>
        <img src={forgotPassword} className={styles.image}></img>
        <form onSubmit={handleSubmit}>
          <div className={styles.userDetailField}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            ></input>
          </div>
          <div className={styles.forgotPasswordButton}>
            <button type="submit">Send email</button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ForgotPassword;
