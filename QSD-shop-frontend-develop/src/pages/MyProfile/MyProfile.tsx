import styles from "./myProfile.module.css";
import Navbar from "../../components/Navbar/NavBar";
import { useState } from "react";
import UserData from "../../components/UserData/UserData";
import Footer from "../../components/Footer/Footer";
import EditProfile from "../../components/EditProfile/EditProfile";
import ChangePassword from "../../components/ChangePassword/ChangePassword";
import Favorites from "../../components/Favorites/Favorites";
import MyOrders from "../../components/MyOrders/MyOrders";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const MyProfile = () => {
  const [showComponent, setShowComponent] = useState("UserData");
  const userData = useSelector((state: RootState) => state.user);
  return (
    <div>
      <Navbar></Navbar>
      <div className={styles.Backround}>
        <div className={styles.container}>
          <div className={styles.Hedding}>
            <h4>MY ACCOUNT</h4>
          </div>
          <div className={styles.content}>
            <div className={styles.menu}>
              <p>USER PANNEL</p>
              <ul className={styles.list}>
                <li
                  className={
                    showComponent === "UserData"
                      ? styles.listItem
                      : styles.underlinedItem
                  }
                >
                  <a onClick={() => setShowComponent("UserData")}>User Data</a>
                </li>
                <li
                  className={
                    showComponent === "EditProfile"
                      ? styles.listItem
                      : styles.underlinedItem
                  }
                >
                  <a onClick={() => setShowComponent("EditProfile")}>
                    Edit Profile
                  </a>
                </li>
                <li
                  className={
                    showComponent === "ChangePassword"
                      ? styles.listItem
                      : styles.underlinedItem
                  }
                >
                  <a onClick={() => setShowComponent("ChangePassword")}>
                    Change Password
                  </a>
                </li>
                <li
                  className={
                    showComponent === "MyOrders"
                      ? styles.listItem
                      : styles.underlinedItem
                  }
                >
                  <a onClick={() => setShowComponent("MyOrders")}>My Orders</a>
                </li>
                <li
                  className={
                    showComponent === "Favorites"
                      ? styles.listItem
                      : styles.underlinedItem
                  }
                >
                  <a onClick={() => setShowComponent("Favorites")}>Favorites</a>
                </li>
              </ul>
            </div>
            <div className={styles.page}>
              {showComponent === "UserData" && <UserData></UserData>}
              {showComponent === "EditProfile" && <EditProfile></EditProfile>}
              {showComponent === "ChangePassword" && (
                <ChangePassword></ChangePassword>
              )}
              {showComponent === "MyOrders" && <MyOrders></MyOrders>}
              {showComponent === "Favorites" && <Favorites></Favorites>}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default MyProfile;
