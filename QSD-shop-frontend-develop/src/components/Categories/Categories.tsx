import styles from "./Categories.module.css";
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
import Add from "../Add/Add";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Edit from "../Edit/Edit";
import { response } from "express";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";
interface Category {
  id: number;
  name: string;
  created_at: string;
}
interface SizeListProps {}
const Categories: React.FC<SizeListProps> = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const [showAdd, setAdd] = useState(false);
  const [currentCategoryName, setCurrentCategoryName] = useState("");

  const firstName = useAppSelector((state: RootState) => state.user.first_name);
  const lastName = useAppSelector((state: RootState) => state.user.last_name);

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

  const handleYesClick = () => {
    if (selectedCategoryId) {
      axios
        .delete(`api/deleteCategory/${selectedCategoryId}`)
        .then(() => {
          setCategory((prevCategory) =>
            prevCategory.filter(
              (category) => category.id !== selectedCategoryId
            )
          );

          toast.success("Category successfully deleted");
        })
        .catch((error) => {
          console.error(error);
          toast.error("An error occurred");
        });
    }
    setShowMessageBox(false);
  };

  const handleNoClick = () => {
    setShowMessageBox(false);
  };
  const handleCloseClick = () => {
    setAdd(false);
  };
  const handleClose = () => {
    setEditModalOpen(false);
  };

  const handleOutsideClick = () => {
    setShowMessageBox(false);
  };

  const handleDeleteCategory = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setShowMessageBox(true);
  };
  const handleOpenAdd = () => {
    setAdd(true);
  };
  const handleAddCategory = () => {
    // Ovdje možete ažurirati stanje kategorija, na primjer, ponovno dohvatiti podatke
    axios
      .get("api/categories")
      .then((response) => {
        setCategory(response.data.category);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleEditCategory = () => {
    // Ovdje možete ažurirati stanje kategorija, na primjer, ponovno dohvatiti podatke
    axios
      .get("api/categories")
      .then((response) => {
        setCategory(response.data.category);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleConfirmClick = () => {
    axios
      .put(`/api/updateCategory/${selectedCategoryId}`, {
        name: currentCategoryName,
      })
      .then(() => {
        console.log("NAME");
        setNewCategoryName(newCategoryName);
        toast.success("Category successfully edited");
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred");
      });
    handleClose();
    handleEditCategory();
  };
  const OnCategoryChange = (newName: string) => {
    setCurrentCategoryName(newName);
  };

  const handleOpenEdit = (categoryId: number) => {
    setSelectedCategoryId(categoryId);
    setEditModalOpen(true);
    const selectedCategory = category.find((c) => c.id === categoryId);
    if (selectedCategory) {
      setCurrentCategoryName(selectedCategory.name);
    }
    setEditModalOpen(true);
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
        <Add onAddCategory={handleAddCategory} onClose={handleCloseClick} />
      )}
      {editModalOpen && (
        <Edit
          categoryId={selectedCategoryId}
          categoryName={currentCategoryName}
          onConfirmCategory={handleConfirmClick}
          onClose={() => setEditModalOpen(false)}
          onCategoryChange={OnCategoryChange}
          newCategoryName={newCategoryName}
        />
      )}

      <div className={styles.Header}>
        <p>Category</p>
        <div className={styles.AvatarDiv}>
          <img src={userAvatar} className={styles.AvatarSlika}></img>
          <p>
            {" "}
            {firstName} {lastName}
          </p>
          <AiOutlineDown></AiOutlineDown>
        </div>
      </div>

      <div className={styles.AddProductDiv}>
        <button className={styles.addButton} onClick={() => handleOpenAdd()}>
          <IoMdAddCircle className={styles.AddCircle}></IoMdAddCircle>
          <p className={styles.addProductText}>Add new Category</p>
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
            {category.map((c) => (
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
                      onClick={() => handleDeleteCategory(c.id)}
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
export default Categories;
