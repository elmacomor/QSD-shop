import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import styles from "./Brands.module.css";
import userAvatar from "../../images/userAvatar.png";
import { AiOutlineDown } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import MessageBox from "../DeleteMessage/DeleteMessage";
import AddBrand from "../Add/AddBrand";
import Edit from "../Edit/EditBrand";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
interface Brand {
  id: number;
  name: string;
  created_at: string;
}

interface BrandListProps {}

const Brands: React.FC<BrandListProps> = () => {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [showAdd, setAdd] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentBrandName, setCurrentBrandName] = useState("");
  const [newBrandName, setNewBrandName] = useState("");

  const firstName = useAppSelector((state: RootState) => state.user.first_name);
  const lastName = useAppSelector((state: RootState) => state.user.last_name);
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

  const handleDeleteBrand = (brandId: number) => {
    setSelectedBrandId(brandId);
    setShowMessageBox(true);
  };

  const handleYesClick = () => {
    if (selectedBrandId) {
      axios
        .delete(`api/deleteBrand/${selectedBrandId}`)
        .then(() => {
          setBrands((prevBrands) =>
            prevBrands.filter((brand) => brand.id !== selectedBrandId)
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
  const handleAddBrand = () => {
    // Ovdje možete ažurirati stanje kategorija, na primjer, ponovno dohvatiti podatke
    axios
      .get("api/brands")
      .then((response) => {
        setBrands(response.data.brand);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleCloseClick = () => {
    setAdd(false);
  };
  const handleOpenEdit = (brandId: number) => {
    setSelectedBrandId(brandId);
    setEditModalOpen(true);
    const selectedBrand = brands.find((c) => c.id === brandId);
    if (selectedBrand) {
      setCurrentBrandName(selectedBrand.name);
    }
    setEditModalOpen(true);
  };
  const handleConfirmClick = () => {
    axios
      .put(`/api/updateBrand`, {
        name: currentBrandName,
        id: selectedBrandId,
      })
      .then(() => {
        console.log("NAME");
        setNewBrandName(newBrandName);
        toast.success("Brand successfully edited");
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred");
      });
    handleClose();
    handleEditBrand();
  };
  const handleEditBrand = () => {
    // Ovdje možete ažurirati stanje kategorija, na primjer, ponovno dohvatiti podatke
    axios
      .get("api/brands")
      .then((response) => {
        setBrands(response.data.brand);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleClose = () => {
    setEditModalOpen(false);
  };
  const OnBrandChange = (newName: string) => {
    setCurrentBrandName(newName);
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
        <AddBrand onAddBrand={handleAddBrand} onClose={handleCloseClick} />
      )}
      {editModalOpen && (
        <Edit
          brandId={selectedBrandId}
          brandName={currentBrandName}
          onConfirmBrand={handleConfirmClick}
          onClose={() => setEditModalOpen(false)}
          onBrandChange={OnBrandChange}
          newBrandName={newBrandName}
        />
      )}

      <div className={styles.Header}>
        <p>Brands</p>
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
          <p className={styles.addProductText}>Add new Brand</p>
        </button>
      </div>
      <div className={styles.TableDiv}>
        <table className={styles.table1}>
          <thead className={styles.table2}>
            <th>ID</th>
            <th>Name</th>
            <th>Created at</th>
            <th>Options</th>
          </thead>
          <tbody>
            {brands &&
              brands.length > 0 &&
              brands.map((c) => (
                <tr key={c.id} className={styles.tableRow}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.created_at}</td>
                  <td>
                    <div className={styles.ButtonsDiv1}>
                      <button
                        className={styles.ButtonEdit}
                        onClick={() => handleOpenEdit(c.id)}
                      >
                        <div className={styles.buttonDiv}>
                          <AiOutlineEdit
                            className={styles.ButtonIcon}
                          ></AiOutlineEdit>
                        </div>
                        <p className={styles.textInButton}>Edit</p>
                      </button>
                      <button
                        className={styles.ButtonDelete}
                        onClick={() => handleDeleteBrand(c.id)}
                      >
                        <div className={styles.buttonDiv}>
                          <MdDeleteOutline
                            className={styles.ButtonIcon}
                          ></MdDeleteOutline>
                        </div>
                        <p className={styles.textInButton1}>Delete</p>
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

export default Brands;
