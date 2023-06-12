import React, { useState } from "react";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import styles from "./SingleProduct.module.css";
import majica from "../../images/majica.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FiShoppingCart } from "react-icons/fi";
import { Heart } from "react-feather";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "../../utils/axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Sizes from "../../components/Sizes/Sizes";
import { useDispatch } from "react-redux";
import { AddCartProduct } from "../../redux/slices/productSlice";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

interface Brand {
  id: number;
  name: string;
  created_at: string;
}

interface Size {
  id: number;
  size: string;
  created_at: string;
}

interface Category {
  id: number;
  name: string;
  created_at: string;
}
interface Color {
  id: number;
  name: string;
  hex_code: string;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  average_rating: number;
  is_favorite: boolean;
  gender: number;
  brands: Brand;
  colors: Color[];
  categories: Category[];
  sizes: Size[];
}

const SingleProduct = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productId } = useParams();
  const role = useAppSelector((state: RootState) => state.user.role);

  const [productData, setProductData] = useState<Product>();
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);
  const [amount, setAmount] = useState(1);
  const [sizeSelected, setSizeSelected] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    role === 0 ? false : productData?.is_favorite
  );

  const isBtnEnabled = sizeSelected;

  const favoriteText = isFavorite
    ? "Remove from favorites"
    : "Add to favorites";
  const heartColor = isFavorite ? "#6c63ff" : "unset";

  const handleMinusClick = () => {
    if (amount > 1) {
      setAmount(amount - 1);
    }
  };

  const handlePlusClick = () => {
    setAmount(amount + 1);
  };
  const handleFavoriteClick = () => {
    axios
      .post("api/handleFavorite", { product_id: productId })
      .then((response) => {
        setIsFavorite(!isFavorite);
      })
      .catch((error) => {
        console.log("STARI ERROR", error);
        toast.error("You need to log in to add product to favorites", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });
  };
  useEffect(() => {
    axios
      .get(`api/getProduct/${productId}`)
      .then((response) => {
        const pData: Product = {
          id: response.data.product.id,
          name: response.data.product.name,
          price: response.data.product.price,
          average_rating: response.data.product.average_rating,
          is_favorite: response.data.product.is_favorite,
          gender: response.data.product.gender,
          brands: response.data.product.brands,
          colors: response.data.product.color,
          categories: response.data.product.categories,
          sizes: response.data.product.sizes,
        };
        setProductData(pData);
        setIsFavorite(pData.is_favorite);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const selectSize = (s: Size) => {
    setSelectedSize(s);
    setSizeSelected(true);
  };
  console.log("selected size", selectedSize, "is size clicked", sizeSelected);

  const AddToCart = () => {
    dispatch(
      AddCartProduct({
        product: productData as Product,
        amount: amount,
        size: selectedSize as Size,
      })
    );
    toast.success("Added to cart", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 1000,
    });
  };
  return (
    <div className={styles.mainDiv}>
      <div>
        <Navbar></Navbar>
      </div>
      <div>
        <div className={styles.secondDiv}>
          <div className={styles.leftDiv}>
            <img
              src={majica}
              alt="Couldn't load image"
              className={styles.productImg}
            ></img>
            <div className={styles.arrowContainer}>
              <button>
                <FontAwesomeIcon icon={faAngleLeft} />
              </button>
              <button>
                <FontAwesomeIcon icon={faAngleRight} />
              </button>
            </div>
          </div>
          <div className={styles.rightDiv}>
            <div>
              <h3>{productData?.name}</h3>
              <h4>{productData?.brands.name}</h4>
              <div className={styles.priceContainer}>
                <h4>{productData?.price}.00$</h4>
                <h4>Average rating: {productData?.average_rating}</h4>
              </div>
              <div className={styles.rating}>
                <h4>Rate this product:</h4>
                <div>
                  <div className={styles.productRating}>
                    <i className={"fas fa-star"}></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                    <i className="fas fa-star"></i>
                  </div>
                </div>
              </div>
              <h4>Available Size(s)</h4>
              <div className={styles.AllSizes}>
                {productData?.sizes.map((s) => (
                  <div
                    className={styles.sizeContainer}
                    key={s.id}
                    onClick={() => selectSize(s)}
                  >
                    <div
                      className={
                        selectedSize === s ? styles.sizeSel : styles.size
                      }
                    >
                      <span>{s.size}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className={styles.flex}>
                <div className={styles.amountContainer}>
                  <div>
                    <FontAwesomeIcon
                      icon={faMinus}
                      className={styles.minusplus}
                      onClick={handleMinusClick}
                    />
                  </div>
                  <div>
                    <span className={styles.amount}>{amount}</span>
                  </div>
                  <div>
                    <FontAwesomeIcon
                      icon={faPlus}
                      className={styles.minusplus}
                      onClick={handlePlusClick}
                    />
                  </div>
                </div>
                <div>
                  <button
                    className={styles.favorite}
                    onClick={handleFavoriteClick}
                  >
                    <Heart
                      className={styles.heart}
                      fill={isFavorite ? heartColor : "transparent"}
                      stroke={isFavorite ? heartColor : "black"}
                      strokeWidth="1.5px"
                    />

                    <p>{favoriteText}</p>
                  </button>
                </div>
              </div>
              <div className={styles.bottom}>
                <button
                  className={
                    isBtnEnabled ? styles.buttonBuy : styles.buttonBuyDisabled
                  }
                  onClick={() => AddToCart()}
                >
                  <FiShoppingCart />
                  Add to Cart
                </button>
                <button
                  className={styles.buttonBack}
                  onClick={() => navigate(-1)}
                >
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default SingleProduct;
