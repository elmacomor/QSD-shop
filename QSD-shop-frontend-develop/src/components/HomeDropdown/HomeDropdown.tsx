import React from "react";
import "./HomeDropdown.css";
import Avatar from "../../images/userAvatar.png";
import { HiMoon } from "react-icons/hi";
import { useState } from "react";
import { BsFillSunFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import axios from "../../utils/axios";
import { useAppDispatch } from "../../redux/hooks";
import { LogInUser } from "../../redux/slices/userSlice";
const Dropdown = () => {
  const role = useAppSelector((state: RootState) => state.user.role);
  const user = useAppSelector((state: RootState) => state.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [DarkThemeOn, SetDarkThemeOn] = useState(false);
  const setDark = () => {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
    SetDarkThemeOn(true);
  };
  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
    SetDarkThemeOn(false);
  };
  const handleLogOut = () => {
    axios
      .post("api/logout")
      .then((response) => {
        dispatch(
          LogInUser({
            id: 0,
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            role: 0,
            phone: "",
            city: "",
            address: "",
            zip_code: "",
            access_token: "",
          })
        );
        navigate("/");
        console.log("Uspjesan logout");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="OptionDiv">
      <div className="OptionOne">
        <p className="OptionHedding">ACCOUNT</p>
        <div className="userData">
          <div className="AvatarDiv1">
            <img src={Avatar} className="AvatarDropdown"></img>
          </div>
          <div className="avatarTextDiv1">
            {user.first_name != "" && (
              <p className="avatarText1">
                {user.first_name + " " + user.last_name}
              </p>
            )}
            {user.email != "" && <p className="avatarText2">{user.email}</p>}
          </div>
        </div>
      </div>
      <div className="OptionTwo">
        <p className="OptionHedding">SETTINGS</p>
        {role != 0 && (
          <div className="Mode" onClick={() => navigate("/profile")}>
            Personal Settings
          </div>
        )}

        <div className="All">
          <div
            className="Mode"
            onClick={() => {
              DarkThemeOn ? setLight() : setDark();
            }}
          >
            {DarkThemeOn ? (
              <BsFillSunFill className="SunIcon"></BsFillSunFill>
            ) : (
              <HiMoon className="MoonIcon" />
            )}
            {DarkThemeOn ? (
              <p className="modeText">Light Mode</p>
            ) : (
              <p className="modeText">Dark Mode</p>
            )}
          </div>
        </div>
      </div>

      {role == 2 && (
        <div className="SignInDiv" onClick={() => navigate("/admin/products")}>
          <p className="SignInText">Admin Pannel</p>
        </div>
      )}
      {role == 3 && (
        <div className="SignInDiv" onClick={() => navigate("/admin/products")}>
          <p className="SignInText">Superadmin Pannel</p>
        </div>
      )}
      {role === 0 ? (
        <div className="SignInDiv" onClick={() => navigate("/login")}>
          <p className="SignInText">Sign In</p>
        </div>
      ) : (
        <div className="SignInDiv" onClick={() => handleLogOut()}>
          <p className="SignInText">Sign Out</p>
        </div>
      )}
    </div>
  );
};
export default Dropdown;
