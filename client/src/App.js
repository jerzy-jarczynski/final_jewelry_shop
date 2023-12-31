import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadLoggedUser } from "./redux/usersRedux";
import { loadProductsRequest } from "./redux/productsRedux";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout/MainLayout";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound/NotFound";
import ProductDetails from "./components/pages/ProductDetails/ProductDetails"
import Login from "./components/pages/Login/Login";
import Logout from "./components/pages/Logout/Logout";
import Register from "./components/pages/Register/Register";
import Cart from "./components/pages/Cart/Cart";
import Orders from "./components/pages/Orders/Orders";
import OrderDetails from "./components/pages/OrderDetails/OrderDetails";
import ProceedOrder from "./components/pages/ProceedOrder/ProceedOrder";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadLoggedUser());
    dispatch(loadProductsRequest());    
  }, [dispatch]);  

  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path="/proceed-order" element={<ProceedOrder />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MainLayout>
  );
};

export default App;
