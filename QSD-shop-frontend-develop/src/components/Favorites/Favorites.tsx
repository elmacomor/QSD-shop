import "./Favorites.css";
import majica from "../../images/majica.jpg";
import { useState, useEffect } from "react";
import axios from "../../utils/axios";

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
const Favorites = () => {
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

  console.log("Favoriti:", favProductList[0]);
  return (
    <div className="product-container">
      {favProductList &&
        favProductList.map((p) => (
          <div className="product-box">
            <img
              src={majica}
              className="product-img"
              key={p?.products?.id}
            ></img>
            <p className="product-header-font">{p?.products?.name}</p>
            <p className="product-brand-font">Brend</p>
            <p className="product-price-font">Cijena</p>
            <div className="product-rating">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="far fa-star"></i>
            </div>
            <button className="button-add">ADD TO CART</button>
          </div>
        ))}
    </div>
  );
};
export default Favorites;
