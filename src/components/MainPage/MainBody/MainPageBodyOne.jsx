import { Box, Grid, Typography } from "@mui/material";
import mainPageVideo from "../../../assets/videos/enjoy_life_sea.mp4"
import "../MainPage.style.css"

function MainPageBodyOne() {
  return (
    <Grid container spacing={0.5} sx={{ minHeight: { xs: "100vh", md: "80vh", lg: "100vh" }, margin: "auto", position: "relative", paddingTop: "30px" }}>
      <Grid item xs={12} md={7}>
        <Box sx={{ height: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "flex-start", paddingX: { lg: "80px", xl: "100px" }, paddingBottom: { xs: "60px", md: "0px" } }}>
          <Typography component="span" sx={{ fontFamily: "PT Serif Caption,sans-serif", lineHeight: { lg: "60px" }, fontSize: { xs: "1.7rem", sm: "2.7rem", md: "2.7rem", lg: "3.3rem" }, fontWeight: "600", textAlign: { xs: "center", lg: "left" }, paddingBottom: "21px" }}>
            Ease into Investing Grow Your Knowledge</Typography>
          <Typography component="span" sx={{ fontFamily: "PT Serif Caption,sans-serif", fontSize: { xs: "0.8rem", sm: "1.3rem", md: "1.5rem", lg: "1.2rem" }, textAlign: "left" }}>
            Explore market insights that pave the way to prosperity, And navigate towards a fulfilling future. Begin your enlightening path with us today.</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={5} sx={{ height: "100%" }}>
        <Box sx={{ height: "100%", display: 'flex', alignItems: 'center', justifyContent: 'center', border: "none" }}>
          <video className="mainPageOneVideo" src={mainPageVideo} autoPlay muted loop />
        </Box>
      </Grid>
    </Grid>
  );
}

export default MainPageBodyOne;
