import { Box, Stack, Typography } from "@mui/material";
import MainNavBar from "../MainNavBar/MainNavBar";
import MainPageBodyOne from "./MainBody/MainPageBodyOne";
import MainPageBodyTwo from "./MainBody/MainPageBodyTwo";
import "./MainPage.style.css"


function MainPage() {
  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <section>
        <MainNavBar />
      </section>
      <section style={{ position: "relative" }}>
        <Box className="MainPageBanner" sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
          <Stack sx={{ alignItems: "flex-start", width: { xs: "42%", md: "33%" } }}>
            <Typography variant="body1" sx={{ textAlign: "left", fontSize: { xs: "18px", md: "27px" }, fontWeight: { xs: "800" } }}>Invest Smart,</Typography>
            <Typography variant="body1" sx={{ textAlign: "left", fontSize: { xs: "18px", md: "27px" }, fontWeight: { xs: "800" } }}>Practice Smarter.</Typography>
            <Typography variant="body1" sx={{ textAlign: "left", fontSize: { xs: "12px", md: "15px" }, fontWeight: { xs: "600" } }}>Unleash your full investment potential — Get start today!</Typography>
          </Stack>
        </Box>
      </section>
      <section className="MainPageBodyOne" style={{ width: "90%", margin: "auto" }}>
        <MainPageBodyOne />
      </section>
      <section className="MainPageBodyTwo" style={{ width: "90%", margin: "auto" }}>
        <MainPageBodyTwo />
      </section>
    </div>
  );
}

export default MainPage;
