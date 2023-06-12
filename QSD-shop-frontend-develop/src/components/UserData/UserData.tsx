import styles from "./UserData.module.css";
import { VscHeart } from "react-icons/vsc";
import { GiDeliveryDrone } from "react-icons/gi";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  name: string;
  price: number;
  total_rating: number;
  average_rating: number;
  is_favorite: boolean;
  gender: number;
  brand_id: number;
  color_id: number;
  created_at: string;
  updated_at: string;
}
interface Favorite {
  id: number;
  user_id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  products: Product;
}
const UserData = () => {
  const navigate = useNavigate();
  const userData = useSelector((state: RootState) => state.user);
  const [favProductList, setFavProductList] = useState<Favorite[]>([]);
  useEffect(() => {
    axios
      .get("api/getFavorites")
      .then((response) => {
        // console.log(response.data);
        setFavProductList(response.data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <div className={styles.CircleContainer}>
        <div className={styles.CircleItem}>
          <div className={styles.circle}>
            <VscHeart className={styles.HeartIcon}></VscHeart>
            <div className={styles.purpleCcontainer}>
              {" "}
              <div className={styles.purpleCircle}>
                <p className={styles.favText} style={{ color: "white" }}>
                  {favProductList.length}
                </p>
              </div>
            </div>
          </div>
          <p>Favorites</p>
        </div>
        <div className={styles.CircleItem}>
          <div className={styles.circle}>
            <GiDeliveryDrone className={styles.droneIcon}></GiDeliveryDrone>
          </div>
          <p>My Orders</p>
        </div>
      </div>

      <div className={styles.InputsDiv}>
        <div className={styles.Inputtext}>
          <p>Full name:</p>
          <p>Email address:</p>
          <p>City</p>
          <p>Zip code:</p>
          <p>Address:</p>
        </div>

        <div className={styles.Inputs}>
          <input
            className={styles.inp}
            defaultValue={userData.first_name + " " + userData.last_name}
          ></input>
          <input className={styles.inp} defaultValue={userData.email}></input>
          <input className={styles.inp} defaultValue={userData.city}></input>
          <input className={styles.inp} defaultValue={userData.address}></input>
          <input
            className={styles.inp}
            defaultValue={userData.zip_code}
          ></input>
        </div>
      </div>
    </div>
  );
};
export default UserData;
