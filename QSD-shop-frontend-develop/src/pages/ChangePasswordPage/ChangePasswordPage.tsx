import styles from "./ChangePasswordPage.module.css";
import { AiOutlineLock } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import { useRef, useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import AuthCode, { AuthCodeRef } from "react-auth-code-input";

const ChangePasswordPage = () => {
  const AuthInputRef = useRef(null);
  const [authCode, setAuthCode] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;

  const handleOnChangeInputs = (value: string) => {
    setAuthCode(value);
  };

  const handlePassChange = (
    event: React.ChangeEvent<HTMLFormElement>
  ): void => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setError("The password field confirmation does not match.");
      return;
    }

    const formData = {
      email: email,
      password: password,
      key: authCode,
    };

    axios
      .post("/api/resetPassword", {
        ...formData,
        password_confirmation: password,
      })
      .then((response) => {
        console.log("proslo u redu");
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.content} onSubmit={handlePassChange}>
        <div className={styles.circleBack} onClick={() => navigate("/login")}>
          <FiArrowLeft />
        </div>
        <div>
          <div className={styles.header}>
            <div className={styles.iconCircle}>
              <AiOutlineLock className={styles.Icon}></AiOutlineLock>
            </div>
            <p className={styles.text}>Two Factor Authentication</p>
          </div>
          <div className={styles.inputs}>
            {
              <AuthCode
                inputClassName={styles.OneInput}
                allowedCharacters="numeric"
                autoFocus={false}
                onChange={handleOnChangeInputs}
                ref={AuthInputRef}
              />
            }
          </div>
        </div>
        <div className={styles.buttonDiv}>
          <p className={styles.explanation}>
            Enter 6-digit code that has been sent to your mail.
          </p>
          <div className={styles.passwordinputs}>
            <input
              placeholder="Password"
              className={styles.changepassword}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Confirm password"
              className={styles.changepassword}
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className={styles.buttondiv}>
              <button className={styles.confirmButton} type="submit">
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
