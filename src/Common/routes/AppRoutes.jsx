import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../../components/MainPage/MainPage.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
