import styles from "../Products/Products.module.css";
import userAvatar from "../../images/userAvatar.png";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { useState, useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import MessageBox from "../DeleteMessage/DeleteMessage";
import axios from "../../utils/axios";
import Add from "../Add/AddProduct";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
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
  created_at: string;
  updated_at: string;
}
interface ProductsListProps {}
const Products: React.FC<ProductsListProps> = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [showAdd, setAdd] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    null
  );

  const firstName = useAppSelector((state: RootState) => state.user.first_name);
  const lastName = useAppSelector((state: RootState) => state.user.last_name);
  const [searchFilter, SetSearchFilter] = useState<string>("");

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    SetSearchFilter(event.target.value);
  };
  useEffect(() => {
    axios
      .get("/api/products")
      .then((response) => {
        setProducts(response.data.product.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  const handleDeleteProduct = (productId: number) => {
    setSelectedProductId(productId);
    setShowMessageBox(true);
  };

  useEffect(() => {
    if (searchFilter.length > 2) {
      axios
        .post("api/search", { name: searchFilter })
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .get("/api/products")
        .then((response) => {
          setProducts(response.data.product.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [searchFilter]);
  const handleYesClick = () => {
    console.log("Proizvos ", selectedProductId);
    if (selectedProductId) {
      axios
        .delete(`api/deleteProduct/${selectedProductId}`)
        .then(() => {
          setProducts((prevProducts) =>
            prevProducts.filter((product) => product.id !== selectedProductId)
          );
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setShowMessageBox(false);
  };

  const handleNoClick = () => {
    setShowMessageBox(false);
  };

  const handleOutsideClick = () => {
    setShowMessageBox(false);
  };
  const handleOpenAdd = () => {
    setAdd(true);
  };
  const handleAddProduct = () => {
    // Ovdje možete ažurirati stanje kategorija, na primjer, ponovno dohvatiti podatke
    axios
      .get("api/products")
      .then((response) => {
        setProducts(response.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleCloseClick = () => {
    setAdd(false);
  };
  return (
    <div className={styles.container}>
      <ToastContainer />
      {showMessageBox && (
        <MessageBox
          onYes={handleYesClick}
          onClose={handleNoClick}
          onOutsideClick={handleOutsideClick}
        />
      )}
      {showAdd && (
        <Add onAddProduct={handleAddProduct} onClose={handleCloseClick} />
      )}
      <div className={styles.Header}>
        <p>Product</p>
        <div className={styles.AvatarDiv}>
          <img src={userAvatar} className={styles.AvatarSlika}></img>
          <p>
            {firstName} {lastName}
          </p>
          <AiOutlineDown></AiOutlineDown>
        </div>
      </div>
      <div className={styles.AddProductDiv}>
        <button className={styles.addButton} onClick={() => handleOpenAdd()}>
          <IoMdAddCircle className={styles.AddCircle}></IoMdAddCircle>
          <p className={styles.addProductText}>Add new Product</p>
        </button>
        <input
          className={styles.pretraga}
          placeholder="Search..."
          type="text"
          value={searchFilter}
          onChange={handleInputChange}
        ></input>
      </div>
      <div className={styles.TableDiv}>
        <table className={styles.table1}>
          <thead className={styles.table2}>
            <th>ID</th>
            <th>Name</th>
            <th>Created at</th>
            <th>First image</th>
            <th>Options</th>
          </thead>
          <tbody>
            {products &&
              products.length > 0 &&
              products.map((c) => (
                <tr key={c.id} className={styles.tableRow}>
                  <td className={styles.cells}>{c.id}</td>
                  <td className={styles.cells}>{c.name}</td>
                  <td className={styles.cells}>{c.created_at}</td>
                  <td className={styles.cells}>{c.updated_at}</td>
                  <td>
                    <div className={styles.ButtonsDiv1}>
                      <div className={styles.ButtonEdit}>
                        <div className={styles.buttonDiv}>
                          <AiOutlineEdit
                            className={styles.ButtonIcon}
                          ></AiOutlineEdit>
                        </div>
                        <p className={styles.Editbtn}>Edit</p>
                      </div>
                      <button
                        className={styles.ButtonDelete}
                        onClick={() => handleDeleteProduct(c.id)}
                      >
                        <div className={styles.buttonDiv}>
                          <MdDeleteOutline
                            className={styles.ButtonIcon}
                          ></MdDeleteOutline>
                        </div>
                        <p className={styles.Deletebtn}>Delete</p>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className={styles.PageDisplayDiv}>
        <button className={styles.PageDisplayButton}>
          <AiOutlineLeft></AiOutlineLeft>
        </button>
        <button className={styles.PageDisplayButton}>
          <AiOutlineRight></AiOutlineRight>
        </button>
        <select className={styles.PageDisplaySelect}>
          <option>Show 20</option>
        </select>
      </div>
    </div>
  );
};
export default Products;
