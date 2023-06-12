import styles from "./AdminPannel.module.css";
import userAvatar from "../../images/userAvatar.png";
import { AiOutlineDown } from "react-icons/ai";
import { GrProductHunt } from "react-icons/gr";
import { BiCategory } from "react-icons/bi";
import { TbBrandLoom } from "react-icons/tb";
import { IoMdColorPalette } from "react-icons/io";
import { FiShoppingBag } from "react-icons/fi";
import { SiZenn } from "react-icons/si";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { BiMenuAltRight } from "react-icons/bi";
import { useState, useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import axios from "axios";
import Colors from "../../components/Colors/Colors";
import Categories from "../../components/Categories/Categories";
import Sizes from "../../components/Sizes/Sizes";
import Brands from "../../components/Brands/Brands";
import Products from "../../components/Products/Products";

interface ColorListProps {}
const AdminPannel: React.FC<ColorListProps> = () => {
  const [showComponent, setShowComponent] = useState("Categories");

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.menu} ${menuOpen ? styles.open : ""}`}>
        <div
          className={
            menuOpen ? styles.NavIconsContainer : styles.NavIconsContainerClosed
          }
        >
          <div className={styles.NavAdminDiv}>
            <div className={styles.AdminDiv}>
              <p
                className={menuOpen ? styles.adminText : styles.adminTextClosed}
              >
                Admin
              </p>
              <p className={menuOpen ? styles.adminDot : styles.adminDotClosed}>
                .
              </p>
            </div>
            <div
              className={menuOpen ? styles.AdminIcon : styles.AdminIconClosed}
            >
              <BiMenuAltRight
                className={styles.NavIconHead}
                onClick={toggleMenu}
              ></BiMenuAltRight>
            </div>
          </div>
          <div
            className={
              showComponent === "Products"
                ? styles.listItem
                : styles.underlinedItem
            }
          >
            <div className={styles.NavIconsDiv}>
              <GrProductHunt className={styles.NavIcon} />
              <p className={menuOpen ? styles.descr : styles.descrClosed}>
                <a onClick={() => setShowComponent("Products")}>Products</a>
              </p>
            </div>
          </div>
          <div className={styles.NavIconsDiv}>
            <FiShoppingBag className={styles.NavIcon} />
            <p className={menuOpen ? styles.descr : styles.descrClosed}>
              Orders
            </p>
          </div>
          <div
            className={
              showComponent === "Categories"
                ? styles.listItem
                : styles.underlinedItem
            }
          >
            <div className={styles.NavIconsDiv}>
              <BiCategory className={styles.NavIcon} />
              <p className={menuOpen ? styles.descr : styles.descrClosed}>
                <a onClick={() => setShowComponent("Categories")}>Categories</a>
              </p>
            </div>
          </div>

          <div
            className={
              showComponent === "Brands"
                ? styles.listItem
                : styles.underlinedItem
            }
          >
            <div className={styles.NavIconsDiv}>
              <TbBrandLoom className={styles.NavIcon} />
              <p className={menuOpen ? styles.descr : styles.descrClosed}>
                <a onClick={() => setShowComponent("Brands")}>Brands</a>
              </p>
            </div>
          </div>

          <div
            className={
              showComponent === "Colors"
                ? styles.listItem
                : styles.underlinedItem
            }
          >
            <div className={styles.NavIconsDiv}>
              <IoMdColorPalette
                className={
                  showComponent === "Colors"
                    ? styles.NavIconSelected
                    : styles.NavIcon
                }
              />
              <p className={menuOpen ? styles.descr : styles.descrClosed}>
                <a onClick={() => setShowComponent("Colors")}>Colors</a>
              </p>
            </div>
          </div>
          <div
            className={
              showComponent === "Sizes"
                ? styles.listItem
                : styles.underlinedItem
            }
          >
            <div className={styles.NavIconsDiv}>
              <SiZenn className={styles.NavIcon} />
              <p className={menuOpen ? styles.descr : styles.descrClosed}>
                <a onClick={() => setShowComponent("Sizes")}>Sizes</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.TableDiv}>
        {showComponent === "Products" && <Products></Products>}
        {showComponent === "Categories" && <Categories></Categories>}
        {showComponent === "Brands" && <Brands></Brands>}
        {showComponent === "Colors" && <Colors></Colors>}
        {showComponent === "Sizes" && <Sizes></Sizes>}
      </div>
    </div>
  );
};
export default AdminPannel;
