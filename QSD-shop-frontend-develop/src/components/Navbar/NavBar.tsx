import React from "react";
import { useState, useEffect } from "react";
import Logo from "../../images/qsd_logo.png";
import userAvatar from "../../images/userAvatar.png";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsSearch } from "react-icons/bs";
import "./NavBar.css";
import HomeDropdown from "../HomeDropdown/HomeDropdown";
import { useNavigate, useLocation } from "react-router-dom";
import { MdClose } from "react-icons/md";
import { ChangeSearch } from "../../redux/slices/SearchSlice";
import { useAppDispatch } from "../../redux/hooks";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [IsShopPage, setIsShopPage] = useState(false);
  const [navbarSearchOpen, setNavbarSearchOpen] = useState(false);

  const [searchContent, setSearchContent] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContent(event.target.value);

    dispatch(
      ChangeSearch({
        name: event.target.value,
      })
    );
  };

  function handleButtonClick() {
    setShowDropdown(!showDropdown);
  }
  useEffect(() => {
    if (
      location.pathname === "/shop/all" ||
      location.pathname === "/shop/men" ||
      location.pathname === "/shop/women" ||
      location.pathname === "/shop/children"
    ) {
      setIsShopPage(true);
    } else {
      setIsShopPage(false);
      setNavbarSearchOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      <div className={navbarSearchOpen ? "navbar-search-open" : "navbar"}>
        <div className="NavbarContent">
          <ul className="list">
            <li className="listItem">
              <img
                src={Logo}
                className="LogoImage"
                onClick={() => navigate("/")}
              ></img>
            </li>

            <li className="listItem">
              <a className="link" onClick={() => navigate("/shop/women")}>
                WOMEN
              </a>
            </li>

            <li className="listItem">
              <a className="link" onClick={() => navigate("/shop/men")}>
                MEN
              </a>
            </li>

            <li className="listItem">
              <a className="link" onClick={() => navigate("/shop/children")}>
                CHILDREN
              </a>
            </li>

            <li className="listItem">
              <a className="link" onClick={() => navigate("/shop/all")}>
                ALL
              </a>
            </li>
          </ul>
          <div className="AvatarDiv">
            {IsShopPage &&
              (!navbarSearchOpen ? (
                <BsSearch
                  className="searchIcon"
                  onClick={() => setNavbarSearchOpen(true)}
                ></BsSearch>
              ) : (
                <MdClose
                  className="searchIcon"
                  onClick={() => setNavbarSearchOpen(false)}
                ></MdClose>
              ))}
            <HiOutlineShoppingBag
              className="shoppingBag"
              onClick={() => navigate("/cart")}
            ></HiOutlineShoppingBag>
            <button className="AvatarButton" onClick={handleButtonClick}>
              <img src={userAvatar} alt="" className="Avatar" />
            </button>
          </div>
        </div>
        {navbarSearchOpen && (
          <div className="SearchDiv">
            <div className="UnderlineSearchDiv">
              <BsSearch className="SearchIcon1"></BsSearch>
              <input
                type="text"
                placeholder="Search..."
                className="SearchInput12"
                value={searchContent}
                onChange={handleSearchChange}
              ></input>
            </div>
          </div>
        )}
      </div>
      {showDropdown && <HomeDropdown />}
    </>
  );
};

export default Navbar;
