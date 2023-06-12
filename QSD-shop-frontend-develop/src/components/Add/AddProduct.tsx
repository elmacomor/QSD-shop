import React, { useEffect, useState } from "react";
import styles from "./AddProduct.module.css";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { GiTrashCan } from "react-icons/gi";

interface AddProps {
  onAddProduct: () => void;
  onClose: () => void;
}

interface Category {
  id: number;
  name: string;
  created_at: string;
}
interface Brand {
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
interface Size {
  id: number;
  size: string;
  created_at: string;
}

const Add: React.FC<AddProps> = ({ onAddProduct, onClose }) => {
  const [productName, setProductName] = useState("");
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [options, setOptions] = useState([]);
  const [category, setCategory] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [colors, setColors] = useState<Color[]>([]);
  const [selectedColor, setSelectedColor] = useState("");
  const [size, setSize] = useState<Size[]>([]);
  const [selectedSize, setSelectedSize] = useState("");
  const [isDivVisible, setIsDivVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSize(e.target.value);
    setIsDivVisible(e.target.value !== "");
  };

  const handleNoClick = () => {
    onClose();
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
      .get("/api/colors")
      .then((response) => {
        setColors(response.data.color);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleAddClick = () => {
    const sizesk = [{ size_id: selectedSize, amount: quantity }];
    axios
      .post("api/addProduct", {
        name: productName,
        price: selectedPrice,
        brand_id: selectedBrand,
        categories: [selectedCategory],
        sizes: sizesk,
        color_id: selectedColor,
        gender: selectedOption,
      }) // Dodajte endpoint i podatke koje želite poslati
      .then((response) => {
        // Ovdje možete ažurirati stanje ili izvršiti druge radnje nakon uspješnog POST zahtjeva
        onAddProduct();
        onClose();

        if (response.status >= 200 && response.status < 300) {
          toast.success("New product successfully added");
        } else {
          toast.error("Error: " + response.data.error);
        }
      })
      .catch((error) => {
        console.error(error);

        toast.error("An error occurred");
      });
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const price = parseInt(e.target.value);
    setSelectedPrice(isNaN(price) ? null : price);
  };
  return (
    <div className={styles.one}>
      <div className={styles.two}>
        <div className={styles.three}>
          <div className={styles.divX}>
            <button className={styles.buttonX} onClick={handleNoClick}>
              x
            </button>
          </div>
          <div>
            <span className={styles.four}>Enter product name:</span>
            <input
              className={styles.five}
              value={productName}
              placeholder="Product name"
              onChange={(e) => setProductName(e.target.value)}
            />
            <span className={styles.four}>Enter product price:</span>

            <input
              className={styles.five}
              placeholder="$  Product price"
              value={selectedPrice !== null ? selectedPrice.toString() : ""}
              onChange={handlePriceChange}
            />

            <span className={styles.four}>Select gender:</span>

            <select
              className={styles.five}
              value={selectedOption}
              onChange={(e) => setSelectedOption(parseInt(e.target.value))}
            >
              <option className={styles.option} value={0}>
                Select...
              </option>

              <option className={styles.option} value={1}>
                Men
              </option>
              <option className={styles.option} value={2}>
                Women
              </option>
              <option className={styles.option} value={3}>
                Children
              </option>
            </select>
            <span className={styles.four}>Select categories:</span>
            <select
              className={styles.five}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Select...</option>
              {category.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <span className={styles.four}>Select brand:</span>
            <select
              className={styles.five}
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
            >
              <option value="">Select...</option>

              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            <span className={styles.four}>Select color:</span>
            <select
              className={styles.five}
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
            >
              <option value="">Select...</option>
              {colors.map((co) => (
                <option key={co.id} value={co.id}>
                  {co.name}
                </option>
              ))}
            </select>
            <div className={styles.selectContainer}>
              <span className={styles.four}>Select sizes:</span>
              <div className={styles.customSelect}>
                <select
                  className={styles.five}
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                >
                  <option value="">Select...</option>
                  {size.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.size}
                    </option>
                  ))}
                </select>
                {selectedSize !== "" && (
                  <button
                    className={styles.cancelButton}
                    onClick={() => {
                      setSelectedSize("");
                    }}
                  >
                    X
                  </button>
                )}
              </div>
            </div>

            {selectedSize !== "" && (
              <div className={styles.quantityy}>
                <span className={styles.four}>
                  Enter amount of products for each size:
                </span>
                <div>
                  <label className={styles.selectedVel}>
                    {
                      size.find(
                        (item: Size) => item.id === Number(selectedSize)
                      )?.size
                    }
                  </label>
                  <input
                    className={styles.amountChange}
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                  />
                </div>
              </div>
            )}

            <span className={styles.four}>Select images:</span>
            <input
              className={styles.imgProduct}
              type="file"
              multiple
              maxLength={5}
              placeholder="Choose images"
              onChange={(event) => {
                if (event.target.files) {
                  let images: File[] = [];
                  for (let i = 0; i < event.target.files.length; i++) {
                    const image: File = event.target.files[i];
                    images.push(image);
                  }
                  event.target.files && setSelectedImages(images);
                }
              }}
            />
            {selectedImages.length > 0 &&
              selectedImages.map((selectedImage, index) => {
                return (
                  <div key={selectedImage.name}>
                    <img
                      className={styles.img}
                      alt="not found"
                      width={"100px"}
                      src={URL.createObjectURL(selectedImage)}
                    />
                    <GiTrashCan
                      onClick={() => {
                        //removeFile(index);
                        setSelectedImages((prev) =>
                          prev.filter((img) => img.name !== selectedImage.name)
                        );
                      }}
                      size={24}
                      style={{ position: "absolute", cursor: "pointer" }}
                    />
                  </div>
                );
              })}
          </div>
          <span className={styles.six}></span>
        </div>
        <div className={styles.seven}>
          <button className={styles.eight} onClick={handleNoClick}>
            Cancel
          </button>
          <button className={styles.nine} onClick={handleAddClick}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default Add;
