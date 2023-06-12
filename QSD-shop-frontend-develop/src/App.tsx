import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Register from "./pages/Register/Register";
import Login from "./pages/LogIn/LogIn";
import HomePage from "./pages/HomePage/HomePage";
import SingleProduct from "./pages/SingleProduct/SingleProduct";
import ShopPage from "./pages/ShopPage/ShopPage";
import MyProfile from "./pages/MyProfile/MyProfile";
import AdminPannel from "./pages/AdminPannel/AdminPannel";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import { Route, Routes } from "react-router";
import CartPage from "./pages/CartPage/CartPage";
import SendCode from "./pages/SendCodePage/SendCode";
import Redirect from "./pages/Redirect/Redirect";
import { useAppSelector } from "./redux/hooks";
import { RootState } from "./redux/store";
import PaymentPage from "./pages/PaymentPage/PaymentPage";
import ChangePasswordPage from "./pages/ChangePasswordPage/ChangePasswordPage";

function App() {
  const role = useAppSelector((state: RootState) => state.user.role);
  if (Number(role) === 0) {
    return (
      <>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="shop/:gender" element={<ShopPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="forgotPassword" element={<ForgotPassword />} />
          <Route path="sendCode" element={<SendCode></SendCode>} />
          <Route path="register" element={<Register></Register>} />
          <Route path="*" element={<Redirect></Redirect>}></Route>
          <Route
            path="product/:productId"
            element={<SingleProduct></SingleProduct>}
          ></Route>
          <Route
            path="changepasswordpage"
            element={<ChangePasswordPage></ChangePasswordPage>}
          ></Route>
        </Routes>
      </>
    );
  } else {
    return (
      <Routes>
        {(Number(role) === 2 || Number(role) === 3) && (
          <>
            <Route path="admin/products" element={<AdminPannel />} />
            {/*OVDJE SVE ADMIN RUTE */}
          </>
        )}
        {Number(role) === 3 && (
          <>
            <Route path="admin/products" element={<AdminPannel />} />{" "}
            {/*OVDJE SAMO RUTA ADMIN/USERS */}
          </>
        )}
        <Route path="/" element={<HomePage />} />
        <Route path="profile" element={<MyProfile />} />
        <Route path="shop/:gender" element={<ShopPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="*" element={<Redirect></Redirect>}></Route>
        <Route path="paymentpage" element={<PaymentPage></PaymentPage>}></Route>
        {/* <Route
                path="product/:productId"
                path="changepasswordpage"
                element={<ChangePasswordPage></ChangePasswordPage>}
              ></Route>  */}
        <Route
          path="singleproduct"
          element={<SingleProduct></SingleProduct>}
        ></Route>
      </Routes>
    );
  }
}

export default App;
