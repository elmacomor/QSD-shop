import React from "react";
import "./ShopPage.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../images/qsd_logo.png";
import majica from "../images/majica.jpg";
import jakna from "../images/jakna.jpg";
import covjek from "../images/covjek.jpg";
import kosulja from "../images/kosulja.jpg";

library.add(faChevronDown);

const ShopPage: React.FC = () => {
  return (
    <div>
      <div className="navbar">
        <ul className="list">
          <li className="listItem">
            <img src={Logo} className="LogoImage"></img>
          </li>

          <li className="listItem">
            <a className="link" href="#">
              WOMEN
            </a>
          </li>

          <li className="listItem">
            <a className="link" href="#">
              MEN
            </a>
          </li>

          <li className="listItem">
            <a className="link" href="#">
              CHILDREN
            </a>
          </li>

          <li className="listItem">
            <a className="link" href="#">
              ALL
            </a>
          </li>
        </ul>
      </div>
      <div className="body">
        <div className="main-div">
          <div className="filter-container">
            <h2>
              Category{" "}
              <FontAwesomeIcon icon={faChevronDown} className="fa-small" />
            </h2>
            <h2>
              Brand{" "}
              <FontAwesomeIcon icon={faChevronDown} className="fa-small" />
            </h2>
            <h2>
              Size <FontAwesomeIcon icon={faChevronDown} className="fa-small" />
            </h2>
            <h2>
              Color{" "}
              <FontAwesomeIcon icon={faChevronDown} className="fa-small" />
            </h2>
          </div>

          <div className="men-container">
            <p className="men-font">Men</p>
          </div>
          <div className="product-container">
            <div className="product-box">
              <img src={majica} className="product-img"></img>
              <p className="product-header-font">Adidas E Kit Jsy 20</p>
              <p className="product-brand-font">Adidas</p>
              <p className="product-price-font">$88.00</p>
              <div className="product-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
              <button className="button-add">ADD TO CART</button>
            </div>
            <div className="product-box">
              <img src={jakna} className="product-img"></img>
              <p className="product-header-font">Green Jacket</p>
              <p className="product-brand-font">Adidas</p>
              <p className="product-price-font">$60.00</p>
              <div className="product-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
              <button className="button-add">ADD TO CART</button>
            </div>
            <div className="product-box">
              <img src={covjek} className="product-img"></img>
              <p className="product-header-font">Adidas Red</p>
              <p className="product-brand-font">Adidas</p>
              <p className="product-price-font">$25.00</p>
              <div className="product-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
              <button className="button-add">ADD TO CART</button>
            </div>
            <div className="product-box">
              <img src={kosulja} className="product-img"></img>
              <p className="product-header-font">Tom Tailor Shirt</p>
              <p className="product-brand-font">Tom Tailor</p>
              <p className="product-price-font">$90.00</p>
              <div className="product-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
              <button className="button-add">ADD TO CART</button>
            </div>
            <div className="product-box">
              <img src={covjek} className="product-img"></img>
              <p className="product-header-font">Adidas Red</p>
              <p className="product-brand-font">Adidas</p>
              <p className="product-price-font">$25.00</p>
              <div className="product-rating">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="far fa-star"></i>
              </div>
              <button className="button-add">ADD TO CART</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
