import { useContext, useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import MainNavBar from "../MainNavBar/MainNavBar";
import MainPageBodyOne from "./MainBody/MainPageBodyOne";
import MainPageBodyTwo from "./MainBody/MainPageBodyTwo";
import "./MainPage.style.css"
import { fetchStockPrice, fetchStockNews } from "../../finnhubData/finnhubAPIFetching/finnhubAPIDataFetch"
import { FinnhubDataContext } from "../../finnhubData/finnhubDataStore.jsx"

function MainPage() {
  const { state, dispatch } = useContext(FinnhubDataContext)
  useEffect(() => {
    fetchStockPrice(dispatch)
    fetchStockNews(dispatch)
  }, [dispatch])

  console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++", (state.FinnhubDataContext));

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <section>
        <MainNavBar />
      </section>
      <section style={{ position: "relative" }}>
        <Box className="MainPageBanner" sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "100%" }}>
          <Stack sx={{ alignItems: "flex-start", width: { xs: "42%", md: "33%", lg: "45%" } }}>
            <Typography variant="body1" sx={{ textAlign: "left", fontSize: { xs: "18px", md: "27px", lg: "36px" }, fontWeight: { xs: "800" } }}>Invest Smart,</Typography>
            <Typography variant="body1" sx={{ textAlign: "left", fontSize: { xs: "18px", md: "27px", lg: "36px" }, fontWeight: { xs: "800" } }}>Practice Smarter.</Typography>
            <Typography variant="body1" sx={{ fontStyle: "italic", textAlign: "left", fontSize: { xs: "12px", md: "15px", lg: "18px" }, fontWeight: { xs: "600" } }}>
              Unleash your full investment potential —
              <Button
                size="small"
                sx={{
                  marginLeft: "2px",
                  fontSize: { xs: "8px", md: "12px" }, borderRadius: "20px", backgroundColor: "#191919", color: "white",
                  paddingX: "10px",
                  '&:hover': {
                    backgroundColor: "#666666"
                  }
                }} >Get start</Button> today!
            </Typography>
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
