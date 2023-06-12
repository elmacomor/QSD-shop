import React, { useState } from "react";
import "./HomePage.css";
import NavBar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="wrapperHome">
      <NavBar />
      <div className="ImageDiv1">
        <div className="shadowDiv1"></div>
        <div className="tekstDiv">
          <p className="tekst1">IN THE MOOD FOR NEW</p>{" "}
          <p className="tekst2">STYLE</p>
          <button className="shopButton" onClick={() => navigate("shop/all")}>
            SHOP NOW
          </button>
        </div>
      </div>

      <div className="Izbornik">
        <div className="IzbornikSlike">
          <div className="slike">
            <div className="sjena">
              <p>WOMEN</p>
            </div>
          </div>
          <div className="slike1">
            <div className="sjena">
              <p>MEN</p>
            </div>
          </div>
          <div className="slike2">
            <div className="sjena">
              <p>CHILDREN</p>
            </div>
          </div>
        </div>
      </div>
      <div className="noviDiv">
        <div className="LargeWhite">
          <div className="SmallWhite">
            <div className="Hedding">
              <p>-QSD SHOP-</p>
            </div>
            <div className="FirstPart">
              <p>
                Our mission is to provide our customers with a seamless online
                shopping experience for high-quality, stylish clothing that
                empowers them to look and feel their best. We are committed to
                offering a wide range of modern clothing options that are both
                functional and fashionable, and we aim to make our customers'
                lives easier by delivering exceptional service and exceptional
                products at affordable prices.
              </p>
            </div>
            <div className="SecondPart">
              <p>
                Our vision is to become the go-to online destination for quality
                and modern clothing that inspires confidence and individuality.
                We strive to be a trusted source for fashion-forward individuals
                who value style and substance in their clothing choices. By
                continuously innovating and adapting to changing fashion trends,
                we aim to remain at the forefront of the online fashion
                industry, while maintaining our commitment to providing
                excellent customer service and high-quality products.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="NewItems">
        <p className="NewItemsText">•NEW IN THIS WEEK•</p>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default HomePage;
