import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../../components/MainPage/MainPage.jsx";
import MainPageLayout from "../../components/MainPageLayout/MainPageLayout.jsx";
import NewsPageIndex from "../../components/NewsPage/NewsPageIndex.jsx"

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPageLayout><MainPage /></MainPageLayout>} />
        <Route path="/news" element={<MainPageLayout><NewsPageIndex /></MainPageLayout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
