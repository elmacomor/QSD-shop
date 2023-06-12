import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/NavBar";
import styles from "./CartPage.module.css";
import EmptyCart from "../../images/EmptyCart.webp";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import majica from "../../images/majica.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { AddCartProduct } from "../../redux/slices/productSlice";
import { MdDeleteOutline } from "react-icons/md";
import { BsPlusLg } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { RemoveCartProduct } from "../../redux/slices/productSlice";
import { ChangeAmount } from "../../redux/slices/productSlice";
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
interface cartProduct {
  product: Product;
  amount: number;
  size: Size;
}
const CartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [subtotal, setSubtotal] = useState<number>(0);
  const cartList = useAppSelector(
    (state: RootState) => state.productCart.cartProducts
  );

  // const [amount, setAmount] = useState(1);
  const handleMinusClick = (item: cartProduct) => {
    if (item.amount > 1) {
      dispatch(
        ChangeAmount({
          product: item.product,
          amount: item.amount - 1,
          size: item.size,
        })
      );
    }
  };
  useEffect(() => {
    const total = cartList.reduce(
      (total, p) => total + p.product.price * p.amount,
      0
    );
    setSubtotal(total);
  }, [cartList]);
  const handlePlusClick = (item: cartProduct) => {
    dispatch(
      ChangeAmount({
        product: item.product,
        amount: item.amount + 1,
        size: item.size,
      })
    );
  };
  console.log(cartList);
  const RemoveFromList = (item: cartProduct) => {
    dispatch(
      RemoveCartProduct({
        product: item.product,
        amount: item.amount,
        size: item.size,
      })
    );
  };
  const getShippingDate = () => {
    const today = new Date();
    const futureDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
      year: "numeric",
    };
    const formattedDate = futureDate.toLocaleDateString(undefined, options);

    return formattedDate;
  };
  return (
    <div className={styles.main}>
      <Navbar></Navbar>
      <div className={styles.cart}>
        <div className={styles.cartLeft}>
          <div className={styles.cartHeading}>
            <span>Cart</span>
          </div>
          {cartList &&
            cartList.map((p) => (
              <div className={styles.productContainer}>
                <div className={styles.imgDiv}>
                  <img src={majica} className={styles.ProductImage}></img>
                </div>

                <div className={styles.productInf}>
                  <h3 style={{ margin: "0" }} className={styles.productText}>
                    {p.product.name}
                  </h3>
                  <h6 style={{ margin: "0" }} className={styles.priceText}>
                    ${p.product.price}.00
                  </h6>
                  <div className={styles.amountContainer}>
                    <div>
                      <BiMinus
                        className={styles.minusplus}
                        onClick={() => handleMinusClick(p)}
                      ></BiMinus>
                    </div>
                    <div>
                      <span className={styles.amount}>{p.amount}</span>
                    </div>
                    <div>
                      <BsPlusLg
                        className={styles.minusplus}
                        onClick={() => handlePlusClick(p)}
                      ></BsPlusLg>
                    </div>
                  </div>
                  <select className={styles.selectS}>
                    {p.product.sizes &&
                      p.product.sizes.map((s) => <option>{s.size}</option>)}
                  </select>
                </div>
                <div className={styles.deleteDiv}>
                  <div className={styles.priceDiv}>
                    <p className={styles.price}>${p.product.price}.00</p>
                  </div>
                  <div
                    className={styles.deleteCartPDiv}
                    onClick={() => RemoveFromList(p)}
                  >
                    <MdDeleteOutline></MdDeleteOutline>
                    <p className={styles.delText}>Delete</p>
                  </div>
                </div>
              </div>
            ))}

          {(!cartList || cartList.length === 0) && (
            <div className={styles.cartNoItems}>
              <span>Empty Cart</span>
              <img src={EmptyCart} className={styles.cartEmptyCartImg}></img>
              <button
                className={styles.cartButtonShopNow}
                onClick={() => navigate("/shop/all")}
              >
                Shop now
              </button>
            </div>
          )}
        </div>
        <div className={styles.cartRight}>
          <span>Delivery</span>
          <div>
            <div className={styles.cartDeliveryOptions}>
              <div className={styles.cartSelectedDelivery}>Free</div>
            </div>
            <div className={styles.cartDeliveryDate}>
              Delivery date: {getShippingDate()}
            </div>
          </div>
          <div className={styles.cartSubtotalContainer}>
            <div>
              <span className={styles.cartSubtotal}>Subtotal</span>
              <span className={styles.cartSubtotal}>${subtotal}.00</span>
            </div>
            <div>
              <span>Delivery</span>
              <span>$0.00</span>
            </div>
          </div>
          <div className={styles.cartTotal}>
            <span>Total</span>
            <span className={styles.cartTotalNumber}>${subtotal}.00</span>
          </div>
          <div className={styles.cartButtonContaine}>
            <button className={styles.cartCheckout}>
              <span onClick={() => navigate("/paymentpage")}>
                Proceed to Checkout
              </span>
            </button>
            <button className={styles.cartButton} onClick={() => navigate(-1)}>
              Continue Shopping
            </button>
            <button className={styles.cartButton}>Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
