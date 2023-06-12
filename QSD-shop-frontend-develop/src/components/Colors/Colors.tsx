import styles from "./Colors.module.css";
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
import Add from "../Add/AddColor";
import Edit from "../Edit/EditColor";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppSelector } from "../../redux/hooks";
import { RootState } from "../../redux/store";

interface Color {
  id: number;
  name: string;
  hex_code: string;
  created_at: string;
  updated_at: string;
}
interface ColorListProps {}
const Colors: React.FC<ColorListProps> = () => {
  const [colors, setColors] = useState<Color[]>([]);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [selectedColorsId, setSelectedColorsId] = useState<number | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentColorName, setCurrentColorName] = useState("");
  const [newColorName, setNewColorName] = useState("");
  const [newHexCode, setNewHexCode] = useState("");
  const [showAdd, setAdd] = useState(false);

  const firstName = useAppSelector((state: RootState) => state.user.first_name);
  const lastName = useAppSelector((state: RootState) => state.user.last_name);

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
  const handleDeleteColor = (colorId: number) => {
    setSelectedColorsId(colorId);
    setShowMessageBox(true);
  };

  const handleYesClick = () => {
    if (selectedColorsId) {
      axios
        .delete(`api/deleteColor/${selectedColorsId}`)
        .then(() => {
          setColors((prevColors) =>
            prevColors.filter((color) => color.id !== selectedColorsId)
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
  const handleOpenEdit = (colorId: number, hex_code: string) => {
    setSelectedColorsId(colorId);
    setEditModalOpen(true);
    const selectedColor = colors.find((c) => c.id === colorId);
    if (selectedColor) {
      setCurrentColorName(selectedColor.name);
      setNewHexCode(hex_code);
    }
    setEditModalOpen(true);
  };
  const handleConfirmClick = () => {
    axios

      .put(`/api/updateColor`, {
        name: currentColorName,

        hex_code: newHexCode,
        id: selectedColorsId,
      })

      .then(() => {
        console.log("NAME");
        setNewColorName(newColorName);
        setNewHexCode(newHexCode);
        toast.success("Color successfully edited");
      })
      .catch((error) => {
        console.error(error);
        toast.error("An error occurred");
      });

    handleClose();
    handleEditColor();
  };

  const handleClose = () => {
    setEditModalOpen(false);
  };
  const handleEditColor = () => {
    // Ovdje možete ažurirati stanje kategorija, na primjer, ponovno dohvatiti podatke
    axios
      .get("api/colors")
      .then((response) => {
        console.log("Colors:", response.data);
        setColors(response.data.color);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const OnColorChange = (newName: string) => {
    setCurrentColorName(newName);
  };
  const OnHexChange = (newHexCode: string) => {
    setNewHexCode(newHexCode);
  };
  const handleOpenAdd = () => {
    setNewHexCode("");
    setAdd(true);
  };
  const handleAddColor = () => {
    // Ovdje možete ažurirati stanje kategorija, na primjer, ponovno dohvatiti podatke
    axios
      .get("api/colors")
      .then((response) => {
        setColors(response.data.color);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleCloseClick = () => {
    setAdd(false);
  };
  const ChangeHexValue = (value: string) => {
    console.log("Setujem novu vrijednsot ", value);
    setNewHexCode(value);
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
        <Add
          onAddColor={handleAddColor}
          onClose={handleCloseClick}
          onHexChange={OnHexChange}
          newHexCode={newHexCode}
        />
      )}
      {editModalOpen && (
        <Edit
          colorId={selectedColorsId}
          colorName={currentColorName}
          onConfirmColor={handleConfirmClick}
          onClose={() => setEditModalOpen(false)}
          onColorChange={OnColorChange}
          onHexChange={OnHexChange}
          newColorName={newColorName}
          newHexCode={newHexCode}
          ChangeHexValue={ChangeHexValue}
        />
      )}
      <div className={styles.Header}>
        <p>Colors</p>
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
          <p className={styles.addProductText}>Add new Color</p>
        </button>
      </div>
      <div className={styles.TableDiv}>
        <table className={styles.table1}>
          <thead className={styles.table2}>
            <th>ID</th>
            <th>Name</th>
            <th>Hex Code</th>
            <th>Color</th>
            <th>Created at</th>
            <th>Options</th>
          </thead>
          <tbody>
            {colors &&
              colors.length > 0 &&
              colors.map((c) => (
                <tr key={c.id} className={styles.tableRow}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>{c.hex_code}</td>
                  <td>
                    <div
                      style={{
                        backgroundColor: c.hex_code,
                        width: "90%",
                        height: "40px",
                        borderRadius: "25px",
                        border: "2px solid black",
                      }}
                    ></div>
                  </td>
                  <td>{c.created_at}</td>
                  <td>
                    <div className={styles.ButtonsDiv1}>
                      <button
                        className={styles.ButtonEdit}
                        onClick={() => {
                          handleOpenEdit(c.id, c.hex_code);
                        }}
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
                        onClick={() => handleDeleteColor(c.id)}
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
export default Colors;
