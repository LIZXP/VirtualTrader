import { Typography } from "@mui/material";
import MainNavBar from "../MainNavBar/MainNavBar";
import MainPageBodyOne from "./MainBody/MainPageBodyOne";
import MainPageBodyTwo from "./MainBody/MainPageBodyTwo";
import "./MainPage.style.css"


function MainPage() {
  return (
    <div>
      <section
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 99
        }}
      >
        <MainNavBar />
      </section>
      <section className="MainPageBanner" style={{ width: "100vw" }}>
        <Typography variant="h1">Hello</Typography>
      </section>
      <section className="MainPageBodyOne" style={{ width: "90vw", margin: "auto" }}>
        <MainPageBodyOne />
      </section>
      <section className="MainPageBodyTwo" style={{ width: "90vw", margin: "auto" }}>
        <MainPageBodyTwo />
      </section>
    </div>
  );
}

export default MainPage;
