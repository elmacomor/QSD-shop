import React, { useCallback, useState } from "react";
import Navbar from "../../components/Navbar/NavBar";
import Footer from "../../components/Footer/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../../images/qsd_logo.png";
import majica from "../../images/majica.jpg";
import "./ShopPage.css";
import { useEffect } from "react";
import axios from "../../utils/axios";
import { VscError } from "react-icons/vsc";
import Brands from "../../components/Brands/Brands";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { Circles } from "react-loader-spinner";

library.add(faChevronDown);

interface Brand {
  id: number;
  name: string;
  created_at: string;
}

interface Size {
  id: number;
  size: string;
  created_at: string;
  name: string;
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

interface Props {
  list: number[];
}

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
}
interface SelectedFilters {
  categories: Category[];
  brands: Brand[];
  colors: Color[];
  sizes: Size[];
}
type AllFiltersType = Brand | Color | Size | Category;

const ShopPage = () => {
  const navigate = useNavigate();
  const { gender } = useParams();

  const [categoryVisible, setCategoryVisible] = useState(true);
  const [brandVisible, setBrandVisible] = useState(true);
  const [sizeVisible, setSizeVisible] = useState(true);
  const [colorVisible, setColorVisible] = useState(true);

  const [size, setSize] = useState<Size[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [ProductList, setProductList] = useState<Product[]>([]);

  const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
    categories: [],
    brands: [],
    colors: [],
    sizes: [],
  });

  const genderID =
    gender === "men"
      ? 1
      : gender === "women"
      ? 2
      : gender === "children"
      ? 3
      : 0;
  const searchFilter = useAppSelector((state: RootState) => state.search.name);

  const createParams = useCallback(() => {
    const ObjectKeys = Object.keys(selectedFilters);
    const queryFilters = ObjectKeys.map((key) => {
      const temp = selectedFilters[key as keyof typeof selectedFilters].map(
        (item: AllFiltersType) => key + "[]=" + item.id
      );
      return temp.join("&");
    })
      .filter((q) => q.length > 0)
      .join("&");
    return (
      "?" + (genderID == 0 ? "" : "genders[1]=" + genderID) + "&" + queryFilters
    );
  }, [selectedFilters, genderID]);

  const handleFilterClick = (
    value: AllFiltersType,
    type: keyof SelectedFilters
  ) => {
    console.log("pozivam funkc, ", value, type);
    const doesfilterExists = selectedFilters[type].some(
      (currentFilter: AllFiltersType) => currentFilter.id === value.id
    );
    if (!doesfilterExists) {
      setSelectedFilters((prev) => {
        return {
          ...prev,
          [type]: [...prev[type], value],
        };
      });
    } else {
      setSelectedFilters((prev) => {
        return {
          ...prev,
          [type]: prev[type].filter(
            (item: AllFiltersType) => item.id !== value.id
          ),
        };
      });
    }
  };

  useEffect(() => {
    axios
      .get("api/sizes")
      .then((response) => {
        setSize(response.data.size);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("api/brands")
      .then((response) => {
        setBrands(response.data.brand);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("api/categories")
      .then((response) => {
        setCategory(response.data.category);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    axios
      .get("/api/colors")
      .then((response) => {
        setColors(response.data.color);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (searchFilter === "") {
      axios
        .get("api/filterProducts" + createParams())
        .then((response) => {
          console.log("dohvacam podatke", response.data.length);
          setProductList(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else if (searchFilter.length > 2) {
      axios
        .post("api/search", { name: searchFilter })
        .then((response) => {
          setProductList(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setIsLoading(false);
  }, [genderID, searchFilter, createParams]);

  const handleCategoryClick = () => {
    setCategoryVisible(!categoryVisible);
  };

  const handleBrandClick = () => {
    setBrandVisible(!brandVisible);
  };

  const handleSizeClick = () => {
    setSizeVisible(!sizeVisible);
  };

  const handleColorClick = () => {
    setColorVisible(!colorVisible);
  };
  const getBrandName = (id: number) => {
    const brand = brands.find((b) => b.id === id);
    return brand ? brand.name : "Unknown brand";
  };
  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  console.log(selectedFilters);
  function isSize(item: AllFiltersType | Size): item is Size {
    return (item as Size).size !== undefined;
  }
  return (
    <div className="main-div">
      <Navbar></Navbar>
      <div className="container">
        <div className="container-container">
          <div className="main-shop">
            <div className="filter-container">
              <div className="sidefiler-filetitem">
                <div className="sidefilter-optionheading">
                  <h2>
                    Category
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`fa-small ${
                        categoryVisible ? "fa-rotate-180" : ""
                      }`}
                      onClick={handleCategoryClick}
                    />
                  </h2>
                </div>
                {categoryVisible && (
                  <ul>
                    {category &&
                      category.map((c: Category) => (
                        <li
                          key={c.id}
                          value={c.name}
                          onClick={() => handleFilterClick(c, "categories")}
                          className={
                            selectedFilters["categories"]?.includes(c)
                              ? "li-selected"
                              : "li-not-selected"
                          }
                        >
                          <div className="sidefilter-filteroptions">
                            {c.name}
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              <div className="sidefiler-filetitem">
                <div className="sidefilter-optionheading">
                  <h2>
                    Brand
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`fa-small ${
                        brandVisible ? "fa-rotate-180" : ""
                      }`}
                      onClick={handleBrandClick}
                    />
                  </h2>
                </div>
                {brandVisible && (
                  <ul>
                    {brands &&
                      brands.map((b: Brand) => (
                        <li
                          key={b.id}
                          value={b.name}
                          onClick={() => handleFilterClick(b, "brands")}
                          className={
                            selectedFilters["brands"]?.includes(b)
                              ? "li-selected"
                              : "li-not-selected"
                          }
                        >
                          <div className="sidefilter-filteroptions">
                            {b.name}
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              <div className="sidefiler-filetitem">
                <div className="sidefilter-optionheading">
                  <h2>
                    Size
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`fa-small ${
                        sizeVisible ? "fa-rotate-180" : ""
                      }`}
                      onClick={handleSizeClick}
                    />
                  </h2>
                </div>
                {sizeVisible && (
                  <ul>
                    {size &&
                      size.map((s: Size) => (
                        <li
                          key={s.id}
                          value={s.size}
                          onClick={() => handleFilterClick(s, "sizes")}
                          className={
                            selectedFilters["sizes"]?.includes(s)
                              ? "li-selected"
                              : "li-not-selected"
                          }
                        >
                          <div className="sidefilter-filteroptions">
                            {s.size}
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              <div className="sidefiler-filetitem">
                <div className="sidefilter-optionheading">
                  <h2>
                    Color
                    <FontAwesomeIcon
                      icon={faChevronDown}
                      className={`fa-small ${
                        colorVisible ? "fa-rotate-180" : ""
                      }`}
                      onClick={handleColorClick}
                    />
                  </h2>
                </div>
                {colorVisible && (
                  <ul>
                    {colors &&
                      colors.map((c: Color) => (
                        <li
                          key={c.id}
                          value={c.name}
                          onClick={() => handleFilterClick(c, "colors")}
                          className={
                            selectedFilters["colors"]?.includes(c)
                              ? "li-selected"
                              : "li-not-selected"
                          }
                        >
                          <div className="sidefilter-filteroptions">
                            {c.name}
                          </div>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
              <div className="sidefilter-priceRan">
                <p>Price Range: $ 0 - $ 5000</p>
              </div>
            </div>
            <div className="shop-products">
              <div className="men-container">
                {gender === "men" && <p className="men-font">Men</p>}
                {gender === "women" && <p className="men-font">Women</p>}
                {gender === "children" && <p className="men-font">Children</p>}
                {gender === "all" && <p className="men-font">All</p>}
              </div>
              <div className="FiltersContainer">
                {/* {selectedFilters.map((c) => (
                  <div className="filterName" key={c.id}>
                    {c.name}
                    <VscError
                      className="errorIcon"
                      onClick={() => handleFilterClick(c)}
                    />
                  </div>
                ))} */}
                {Object.keys(selectedFilters).map((key: string) => {
                  return (
                    <React.Fragment key={key}>
                      {selectedFilters[key as keyof typeof selectedFilters].map(
                        (item: AllFiltersType | Size) => {
                          return (
                            <div className="filterName" key={item.id}>
                              {isSize(item) ? item.size : item.name}
                              <VscError
                                className="errorIcon"
                                onClick={() =>
                                  handleFilterClick(
                                    item,
                                    key as keyof typeof selectedFilters
                                  )
                                }
                              />
                            </div>
                          );
                        }
                      )}
                    </React.Fragment>
                  );
                })}
              </div>
              {isLoading === true && (
                <div>
                  <Circles color="#6c63ff" />
                </div>
              )}
              <div className="shop-products-main">
                <div className="product-container">
                  {ProductList &&
                    ProductList.length > 0 &&
                    ProductList.map((p) => (
                      <div key={p.id} onClick={() => handleProductClick(p.id)}>
                        <div className="shop-single-product">
                          <img src={majica} className="product-img"></img>
                          <p className="product-header-font">{p.name}</p>
                          <p className="product-brand-font">
                            {getBrandName(p.brand_id)}
                          </p>
                          <p className="product-price-font">${p.price}.00</p>
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
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ShopPage;
