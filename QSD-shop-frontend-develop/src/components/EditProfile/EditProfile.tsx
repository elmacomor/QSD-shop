import { useDispatch, useSelector } from "react-redux";
import styles from "./EditProfile.module.css";
import { RootState } from "../../redux/store";
import { useState, useEffect } from "react";
import axios from "../../utils/axios";
import { LogInUser } from "../../redux/slices/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProfile = () => {
  const userData = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [formValues, setFormValues] = useState({
    id: userData.id || "",
    firstName: userData.first_name || "",
    lastName: userData.last_name || "",
    email: userData.email || "",
    city: userData.city || "",
    address: userData.address || "",
    zipCode: userData.zip_code || "",
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [fieldName]: fieldValue,
    }));
  };

  const handleSave = () => {
    console.log("handle save started");
    console.log(formValues.city);
    console.log(formValues.id);
    const editedFormValues = {
      id: userData.id,
      first_name: formValues.firstName,
      last_name: formValues.lastName,
      email: formValues.email,
      phone: userData.phone || "123",
      city: formValues.city,
      address: formValues.address,
      zip_code: formValues.zipCode,
    };
    axios
      .put("api/updateUser", editedFormValues)
      .then((response) => {
        // Handle success response from API
        console.log(response);
        dispatch(
          LogInUser({
            id: editedFormValues.id,
            first_name: editedFormValues.first_name,
            last_name: editedFormValues.last_name,
            email: editedFormValues.email,
            password: userData.password,
            role: userData.role,
            phone: editedFormValues.phone,
            city: editedFormValues.city,
            address: editedFormValues.address,
            zip_code: editedFormValues.zip_code,
            access_token: userData.access_token,
          })
        );
        toast.success("Data changed successfully!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        // Handle error response from API
        console.error(error);
        toast.error("Error changing data.", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 3000,
        });
      });
  };
  return (
    <div>
      <ToastContainer />
      <p className={styles.heddingText}>
        Dear Elma, if you want to change your data locate the field that you
        want to change, and enter new value.
      </p>

      <div className={styles.InputsDiv}>
        <div className={styles.InputTextDiv}>
          <p className={styles.Inputtext}>First name:</p>
          <p className={styles.Inputtext}>Last name:</p>
          <p className={styles.Inputtext}>Email address:</p>
          <p className={styles.Inputtext}>City</p>
          <p className={styles.Inputtext}>Zip code:</p>
          <p className={styles.Inputtext}>Address:</p>
        </div>

        <div className={styles.Inputs}>
          <input
            className={styles.inp}
            name="firstName"
            value={formValues.firstName}
            onChange={handleInputChange}
          ></input>
          <input
            className={styles.inp}
            name="lastName"
            value={formValues.lastName}
            onChange={handleInputChange}
          ></input>
          <input
            className={styles.inp}
            name="email"
            value={formValues.email}
            onChange={handleInputChange}
          ></input>
          <input
            className={styles.inp}
            name="city"
            value={formValues.city}
            onChange={handleInputChange}
          ></input>
          <input
            className={styles.inp}
            name="zipCode"
            value={formValues.zipCode}
            onChange={handleInputChange}
          ></input>
          <input
            className={styles.inp}
            name="address"
            value={formValues.address}
            onChange={handleInputChange}
          ></input>
        </div>
      </div>
      <button className={styles.EditButton} onClick={handleSave}>
        Edit Profile
      </button>
    </div>
  );
};
export default EditProfile;
