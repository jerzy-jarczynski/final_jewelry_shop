import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound/NotFound";
import ProductDetails from "./components/pages/ProductDetails/ProductDetails"
import Login from "./components/pages/Login/Login";

const App = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </MainLayout>
);

export default App;
