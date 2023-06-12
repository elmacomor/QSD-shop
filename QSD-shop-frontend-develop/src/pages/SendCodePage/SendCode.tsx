import styles from "./SendCode.module.css";
import { AiOutlineLock } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";
import { useRef, useState } from "react";
import AuthCode, { AuthCodeRef } from "react-auth-code-input";
import { useNavigate } from "react-router";
import { useAppDispatch } from "../../redux/hooks";
import { LogInUser } from "../../redux/slices/userSlice";
import axios from "../../utils/axios";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: number;
  phone: string;
  city: string;
  address: string;
  zip_code: string;
  access_token: string;
}
const SendCode = () => {
  const AuthInputRef = useRef<AuthCodeRef>(null);
  const navigate = useNavigate();
  const [authCode, setAuthCode] = useState("");
  const dispatch = useAppDispatch();

  const email = useAppSelector((state: RootState) => state.user.email);

  const password = useAppSelector((state: RootState) => state.user.password);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post<{
        data: { user: User; access_token: string };
      }>("api/login", {
        email: email,
        password: password,
        validationKey: authCode,
      });
      const user: User = response.data.data.user;
      user.access_token = response.data.data.access_token;
      dispatch(
        LogInUser({
          id: user.id,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          password: password,
          role: user.role,
          phone: user.phone,
          city: user.city,
          address: user.address,
          zip_code: user.zip_code,
          access_token: user.access_token,
        })
      );
      navigate("/");

      //user data
    } catch (error) {
      console.error(error);
    }
  };
  const handleOnChange = (value: string) => {
    setAuthCode(value);
  };
  return (
    <div className={styles.wrapper}>
      <form className={styles.content} onSubmit={handleSubmit}>
        <div className={styles.circleBack} onClick={() => navigate("/login")}>
          <FiArrowLeft />
        </div>
        <div className={styles.header}>
          <div className={styles.iconCircle}>
            <AiOutlineLock className={styles.Icon}></AiOutlineLock>
          </div>
          <p className={styles.text}>Two Factor Authentication</p>
        </div>
        <div className={styles.inputs}>
          <AuthCode
            inputClassName={styles.OneInput}
            allowedCharacters="numeric"
            autoFocus={false}
            onChange={handleOnChange}
            ref={AuthInputRef}
          />
        </div>
        <div className={styles.buttonDiv}>
          Enter 6-digit code that has been sent to your mail.
          <button className={styles.confirmButton} type="submit">
            CONFIRM
          </button>
        </div>
      </form>
    </div>
  );
};
export default SendCode;
