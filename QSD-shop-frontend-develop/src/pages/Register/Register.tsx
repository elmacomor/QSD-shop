import React, { useState } from "react";
import styled from "styled-components";
import SignUpImage from "../../images/SignUpImage.png";
import axios from "../../utils/axios";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";

interface RegistrationFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const SuccessNotify = () => toast("Successfully registered!");
  const ErrorNotify = () => toast("Error, try again later");
  const [formData, setFormData] = useState<RegistrationFormData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [repeatPassword, setRepeatPassword] = useState("");

  const [success, SetSuccess] = useState(false);
  const [passValid, setPassValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [nameValid, setNameValid] = useState<boolean | null>(null);
  const [surnameValid, setSurnameValid] = useState<boolean | null>(null);
  const [passwordsEqual, setPassEqual] = useState(false);

  const isBtnEnabled =
    passValid && emailValid && passwordsEqual && !!nameValid && !!surnameValid;

  console.log("Is button enabled", isBtnEnabled);
  console.log("name", !!nameValid);
  console.log("surname", !!surnameValid);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    axios
      .post("api/register", formData)
      .then((response) => {
        console.log(response.data);
        toast.success("Successfull registration!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        toast.error("Registration failed. Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
        SetSuccess(false);
      });

    CleanFields();
  };

  function CleanFields() {
    setFormData({ first_name: "", last_name: "", email: "", password: "" });
    setRepeatPassword("");
  }
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const HandleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "password") {
      const regex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
      const isValid = regex.test(value);
      console.log("Validacija sifre", passValid);
      setPassValid(isValid);
    } else if (name === "email") {
      const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      const isValid = regex.test(value);
      setEmailValid(isValid);
    } else if (name === "first_name") {
      if (value === "") {
        setNameValid(false);
      } else {
        setNameValid(true);
      }
    } else if (name === "last_name") {
      if (value === "") {
        setSurnameValid(false);
      } else {
        setSurnameValid(true);
      }
    }
  };
  const handleRepeatPassChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRepeatPassword(event.target.value);
    if (event.target.value === formData.password) {
      console.log("stavljam na true");
      setPassEqual(true);
    } else {
      setPassEqual(false);
    }
  };
  return (
    <div className={styles.Container}>
      <form onSubmit={handleSubmit} className={styles.FormContainer}>
        <img
          src={SignUpImage}
          className={styles.Image}
          alt="Couldn't load image"
        />
        <div className={styles.InputContainer}>
          <input
            className={nameValid ? styles.Input : styles.InputRed}
            type="text"
            placeholder="First name"
            name="first_name"
            value={formData.first_name}
            required
            onChange={handleInputChange}
            onBlur={HandleBlur}
          />

          <input
            className={nameValid ? styles.Input : styles.InputRed}
            type="text"
            placeholder="Last name"
            name="last_name"
            required
            value={formData.last_name}
            onChange={handleInputChange}
            onBlur={HandleBlur}
          />
        </div>
        {(nameValid === false || surnameValid === false) && (
          <p className={styles.errText}>Required fields</p>
        )}
        <input
          className={emailValid ? styles.EmailInput : styles.EmailInputRed}
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          required
          onChange={handleInputChange}
          onBlur={HandleBlur}
        />
        {emailValid === false && (
          <p className={styles.errText}>
            Required field, invalid e-mail format
          </p>
        )}
        <input
          className={passValid ? styles.PasswordInput : styles.PasswordInputRed}
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          required
          onChange={handleInputChange}
          onBlur={HandleBlur}
        />
        {passValid === false && (
          <p className={styles.errText}>
            Password must have at least 8 characters, one capital letter, one
            small letter, one number, and one special character.
          </p>
        )}
        <input
          className={styles.ConfirmPasswordInput}
          type="password"
          placeholder="Confirm password"
          onChange={handleRepeatPassChange}
        />
        <button
          disabled={!isBtnEnabled}
          className={isBtnEnabled ? styles.Button : styles.ButtonDisabled}
          type="submit"
        >
          Sign Up
        </button>
        <div className={styles.LinksContainer}>
          <div className={styles.Link} onClick={() => navigate("/login")}>
            Go to Login
          </div>
          <div
            className={styles.Link}
            onClick={() => navigate("/forgotPassword")}
          >
            Forgot password?
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
