import React, { useState } from "react";
import styles from "./PaymentPage.module.css";
import majica from "../../images/majica.jpg";
const PaymentPage = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setIsExpanded(event.target.value.length >= 3);
  };
  return (
    <div className={styles.main}>
      <div className={styles.mainContent}>
        <div className={styles.mainLeft}>
          <div className={styles.cartContent}>
            <div className={styles.total}>
              <h3>Cart Items</h3>
              <h3>
                Total <span>(with tax)</span>:$88.00
              </h3>
            </div>
            <div className={styles.item}>
              <div className={styles.imgContainer}>
                <img
                  src={majica}
                  className={styles.imgClass}
                  alt="Adidas E Kit Jsy 20"
                ></img>
              </div>
              <div className={styles.itemDetails}>
                <span>Adidas E Kit Jsy 20</span>
                <span>$88.00</span>
                <div className={styles.amountContainer}>
                  <div>
                    <span>1</span>
                  </div>
                </div>
                <div className={styles.selectContainer}>
                  <select disabled>
                    <option value="1">S</option>
                  </select>
                </div>
              </div>
              <div className={styles.priceContainer}>
                <span className={styles.totalPrice}>$88.00</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.mainRight}>
          <div className={styles.wrapper}>
            <div className={styles.demo}>
              <form className={styles.paymentForm}>
                <h4>Address Details</h4>
                <div className={styles.addressElement}>
                  <div className={styles.privateStripeElement}>
                    <div className={styles.inputs}>
                      <div className={styles.grid}>
                        <div className={styles.gridCell}>
                          <label className={styles.labelHeading}>
                            Puno ime
                          </label>
                          <div>
                            <input
                              type="text"
                              placeholder="Ime i prezime"
                              className={styles.inputInput}
                            />
                          </div>
                        </div>
                        <div className={styles.gridCell}>
                          <div className={styles.otherInputs}>
                            <label className={styles.labelHeading}>
                              Ulica i kućni broj
                            </label>
                            <input
                              type="text"
                              placeholder="Adresa ulice"
                              onChange={handleInputChange}
                            />
                            {isExpanded && (
                              <>
                                <label className={styles.labelHeading}>
                                  Broj stana, kat ili poštanski pretinac
                                </label>
                                <input
                                  type="text"
                                  placeholder="Stan, apartman, broj jedinice itd. (neobavezno)"
                                />
                                <label className={styles.labelHeading}>
                                  Grad
                                </label>
                                <input type="text" placeholder="" />
                                <label className={styles.labelHeading}>
                                  Država
                                </label>
                                <input type="text" placeholder="Odaberi " />
                                <label className={styles.labelHeading}>
                                  ZIP
                                </label>
                                <input type="text" placeholder="" />
                                <label className={styles.labelHeading}>
                                  Telefonski broj
                                </label>
                                <input type="text" placeholder="Neobaveno" />
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
