import React from "react";
import Navbar from "../../components/Navbar/NavBar";
import styles from "./ChartPage.module.css";
import EmptyCart from "../../images/EmptyCart.webp";

const ChartPage = () => {
  return (
    <div className={styles.main}>
      <Navbar></Navbar>
      <div className={styles.cart}>
        <div className={styles.cartLeft}>
          <div className={styles.cartHeading}>
            <span>Cart</span>
          </div>
          <div className={styles.cartNoItems}>
            <span>Empty Cart</span>
            <img src={EmptyCart} className={styles.cartEmptyCartImg}></img>
            <button className={styles.cartButtonShopNow}>Shop now</button>
          </div>
        </div>
        <div className={styles.cartRight}>
          <span>Delivery</span>
          <div>
            <div className={styles.cartDeliveryOptions}>
              <div className={styles.cartSelectedDelivery}>Free</div>
            </div>
            <div className={styles.cartDeliveryDate}>
              Delivery date: May 11, 2023
            </div>
          </div>
          <div className={styles.cartSubtotalContainer}>
            <div>
              <span className={styles.cartSubtotal}>Subtotal</span>
              <span className={styles.cartSubtotal}> $0</span>
            </div>
            <div>
              <span>Delivery</span>
              <span>$0.00</span>
            </div>
          </div>
          <div className={styles.cartTotal}>
            <span>Total</span>
            <span className={styles.cartTotalNumber}>$0</span>
          </div>
          <div className={styles.cartButtonContaine}>
            <button className={styles.cartCheckout}>
              <span>Proceed to Checkout</span>
            </button>
            <button className={styles.cartButton}>Continue Shopping</button>
            <button className={styles.cartButton}>Clear Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChartPage;
