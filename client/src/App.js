import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout/MainLayout";
import Home from "./components/pages/Home/Home";
import NotFound from "./components/pages/NotFound/NotFound";

const App = () => (
  <MainLayout>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </MainLayout>
);

export default App;
