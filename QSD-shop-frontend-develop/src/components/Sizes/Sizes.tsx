import styles from "./Sizes.module.css";
import userAvatar from "../../images/userAvatar.png";
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { useState, useEffect } from "react";
import MessageBox from "../DeleteMessage/DeleteMessage";
import { AiOutlineRight } from "react-icons/ai";
import { AiOutlineLeft } from "react-icons/ai";
import axios from "../../utils/axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Add from "../Add/AddSize";
import Edit from "../Edit/EditSize";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

interface Size {
  id: number;
  size: string;
  created_at: string;
}

interface SizeListProps {}
const Sizes: React.FC<SizeListProps> = () => {
  const [size, setSize] = useState<Size[]>([]);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
  const [showAdd, setAdd] = useState(false);
  const [newSizeName, setNewSizeName] = useState("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentSizeName, setCurrentSizeName] = useState("");

  const firstName = useAppSelector((state: RootState) => state.user.first_name);
  const lastName = useAppSelector((state: RootState) => state.user.last_name);

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
  const handleDeleteSize = (sizeId: number) => {
    setSelectedSizeId(sizeId);
    setShowMessageBox(true);
  };
  const handleYesClick = () => {
    console.log("Brisem");
    if (selectedSizeId) {
      axios
        .delete(`api/deleteSize/${selectedSizeId}`)
        .then(() => {
          setSize((prevSizes) =>
            prevSizes.filter((size) => size.id !== selectedSizeId)
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
  const handleAddSize = () => {
    // Ovdje možete ažurirati stanje kategorija, na primjer, ponovno dohvatiti podatke
    axios
      .get("api/sizes")
      .then((response) => {
        setSize(response.data.size);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleCloseClick = () => {
    setAdd(false);
  };
  const handleOpenAdd = () => {
    setAdd(true);
  };
  const handleConfirmClick = () => {
    axios
      .put(`/api/updateSize`, {
        size: currentSizeName,
        id: selectedSizeId,
      })
      .then(() => {
        console.log("NAME");
        setNewSizeName(newSizeName);
        toast.success("Size successfully edited");
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred");
      });
    handleClose();
    handleEditBrand();
  };
  const handleOpenEdit = (sizeId: number) => {
    setSelectedSizeId(sizeId);
    setEditModalOpen(true);
    const selectedSize = size.find((c) => c.id === sizeId);
    if (selectedSize) {
      setCurrentSizeName(selectedSize.size);
    }
    setEditModalOpen(true);
  };
  const handleEditBrand = () => {
    // Ovdje možete ažurirati stanje kategorija, na primjer, ponovno dohvatiti podatke
    axios
      .get("api/sizes")
      .then((response) => {
        setSize(response.data.size);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleClose = () => {
    setEditModalOpen(false);
  };
  const OnSizeChange = (newName: string) => {
    setCurrentSizeName(newName);
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
      {showAdd && <Add onAddSize={handleAddSize} onClose={handleCloseClick} />}
      {editModalOpen && (
        <Edit
          sizeId={selectedSizeId}
          sizeName={currentSizeName}
          onConfirmSize={handleConfirmClick}
          onClose={() => setEditModalOpen(false)}
          onSizeChange={OnSizeChange}
          newSizeName={newSizeName}
        />
      )}
      <div className={styles.Header}>
        <p>Sizes</p>
        <div className={styles.AvatarDiv}>
          <img
            src={userAvatar}
            className={styles.AvatarSlika}
            alt="Coludn't load img"
          ></img>
          <p>
            {firstName} {lastName}
          </p>
          <AiOutlineDown></AiOutlineDown>
        </div>
      </div>
      <div className={styles.AddProductDiv}>
        <button className={styles.addButton} onClick={() => handleOpenAdd()}>
          <IoMdAddCircle className={styles.AddCircle}></IoMdAddCircle>
          <p className={styles.addProductText}>Add new Size</p>
        </button>
      </div>
      <div className={styles.TableDiv}>
        <table className={styles.table1}>
          <thead className={styles.table2}>
            <th>ID</th>
            <th>Size</th>
            <th>Created at</th>
            <th>Options</th>
          </thead>
          <tbody>
            {size &&
              size.length > 0 &&
              size.map((c) => (
                <tr key={c.id} className={styles.tableRow}>
                  <td>{c.id}</td>
                  <td>{c.size}</td>
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
                        onClick={() => handleDeleteSize(c.id)}
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
export default Sizes;
