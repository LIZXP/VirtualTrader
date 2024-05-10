import { useContext, useEffect } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import MainPageBodyOne from "./MainBody/MainPageBodyOne";
import MainPageBodyTwo from "./MainBody/MainPageBodyTwo";
import "./MainPage.style.css"
import { fetchStockPrice, fetchStockNews } from "../../finnhubData/finnhubAPIFetching/finnhubAPIDataFetch"
import { FinnhubDataContext } from "../../finnhubData/finnhubDataStore.jsx"
import { useNavigate } from "react-router-dom";

function MainPage() {
  // const { state, dispatch } = useContext(FinnhubDataContext)
  // useEffect(() => {
  //   fetchStockPrice(dispatch)
  //   fetchStockNews(dispatch)
  // }, [dispatch])

  // console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++", (state.stockNewsState));
  const navigate = useNavigate();
  const handleNavigate = (path) => {
    navigate(path);
  }
  return (
    <div style={{ width: "100%", overflowX: "hidden", margin: "auto" }}>
      <section style={{ position: "relative", width: "100%", margin: "auto" }}>
        <Box className="MainPageBanner" sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <Stack sx={{ alignItems: "flex-start", width: { xs: "42%", md: "33%", lg: "42%" } }}>
            <Typography variant="body1" sx={{ fontFamily: "PT Serif Caption,sans-serif", textAlign: "left", fontSize: { xs: "18px", sm: "24px", md: "33px", lg: "42px" }, fontWeight: { xs: "800" } }}>Invest Smart,</Typography>
            <Typography variant="body1" sx={{ fontFamily: "PT Serif Caption,sans-serif", textAlign: "left", fontSize: { xs: "18px", sm: "24px", md: "33px", lg: "42px" }, fontWeight: { xs: "800" } }}>Practice Smarter.</Typography>
            <Typography variant="body1"
              sx={{ fontFamily: "PT Serif Caption,sans-serif", fontStyle: "italic", textAlign: "left", fontSize: { xs: "12px", sm: "17px", md: "18px", lg: "21px" }, fontWeight: { xs: "600" } }}>
              Unleash your full investment potential —
              <Button
                size="small"
                onClick={() => { handleNavigate("/signup") }}
                sx={{
                  marginLeft: "2px",
                  fontSize: { xs: "8px", sm: "12px", md: "12px" }, borderRadius: "20px", backgroundColor: "#191919", color: "white",
                  paddingX: "10px",
                  '&:hover': {
                    backgroundColor: "#666666"
                  }
                }} >Get start</Button> today!
            </Typography>
          </Stack>
        </Box>
      </section>
      <section className="MainPageBodyOne-container" style={{ width: "90%", margin: "auto" }}>
        <MainPageBodyOne />
      </section>
      <section className="MainPageBodyTwo-container" style={{ width: "90%", margin: "auto" }}>
        <MainPageBodyTwo />
      </section>
    </div>
  );
}

export default MainPage;
