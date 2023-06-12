import React, { useState } from "react";
import styled from "styled-components";
import LogInImage from "../../images/LogInImage.png";
import "./LogIn.css";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { useAppDispatch } from "../../redux/hooks";
import { LogInUser } from "../../redux/slices/userSlice";
import { BallTriangle } from "react-loader-spinner";

const Container = styled.div`
  height: 100vh;
  background-color: rgb(242, 242, 242);
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px 50px 30px;
  border-radius: 0px 20px 0px 20px;
  background-color: white;
  height: auto;
  width: 400px;
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.2);
`;
const Image = styled.img`
  height: 100%;
  width: 100%;
  margin-bottom: 10px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px;
  border-radius: 5px;
  border: 1px solid rgb(214, 194, 252);
`;

const EmailInput = styled(Input)`
  width: 90%;
  margin-bottom: 10px;
`;

const PasswordInput = styled(Input)`
  width: 91%;
  margin-bottom: 10px;
`;

const ConfirmPasswordInput = styled(Input)`
  width: 91%;
  margin-bottom: 10px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: rgb(108, 99, 255, 1);
  color: white;
  font-weight: bold;
  margin-top: 10px;
`;

const LinksContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const Link = styled.a`
  color: rgb(108, 99, 255, 1);
  text-decoration: none;
  font-weight: regular;
  cursor: pointer;
`;

interface LoginFormData {
  email: string;
  password: string;
}
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsLoading(true);
    event.preventDefault();
    try {
      const response = await axios.post("api/login", {
        email: formData.email,
        password: formData.password,
      });
      dispatch(
        LogInUser({
          id: 0,
          first_name: "",
          last_name: "",
          email: formData.email,
          password: formData.password,
          role: 0,
          phone: "",
          city: "",
          address: "",
          zip_code: "",
          access_token: "",
        })
      );
      setIsLoading(false);
      navigate("/sendCode");

      //user data
    } catch (error) {
      console.error(error);
      setError("Invalid credentials");
    }
  };

  return (
    <div className="background">
      <FormContainer onSubmit={handleSubmit}>
        <Image src={LogInImage} alt="Couldn't load image" />
        <EmailInput
          type="email"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <PasswordInput
          type="password"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <Button type="submit">Log in</Button>
        <LinksContainer>
          <Link onClick={() => navigate("/register")}>Go to SignUp</Link>
          <Link onClick={() => navigate("/forgotPassword")}>
            Forgot password?
          </Link>
        </LinksContainer>
      </FormContainer>
      {isLoading === true && (
        <div className="loadingContainer">
          <BallTriangle color="#6c63ff" />
        </div>
      )}
    </div>
  );
};

export default Login;
