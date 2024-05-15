import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../../components/MainPage/MainPage.jsx";
import MainPageLayout from "../../components/MainPageLayout/MainPageLayout.jsx";
import NewsPageIndex from "../../components/NewsPage/NewsPageIndex.jsx"
import StockMarketPage from "../../components/StockMarketPage/StockMarketPage.jsx";
import LoginPage from "../../components/AuthPage/LoginPage.jsx";
import SignUpPage from "../../components/AuthPage/SignUpPage.jsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPageLayout><MainPage /></MainPageLayout>} />
        <Route path="/news" element={<MainPageLayout><NewsPageIndex /></MainPageLayout>} />
        <Route path="/stockmarket" element={<MainPageLayout><StockMarketPage /></MainPageLayout>} />
        <Route path="/login" element={<MainPageLayout><LoginPage /></MainPageLayout>} />
        <Route path="/signup" element={<MainPageLayout><SignUpPage /></MainPageLayout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
