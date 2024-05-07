import { Box, Grid, Typography } from "@mui/material";
import MainPageTwoImg from "../../../assets/MainPageTwoImg.svg"

function MainPageBodyTwo() {
    return (
        <Grid container spacing={0.5} sx={{ height: "100vh" }}>
            <Grid item md={12} lg={7}>
                <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {/* <img src={MainPageTwoImg} style={{ width: "600px" }} /> */}
                </Box>
            </Grid>
            <Grid item md={12} lg={5}>
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: "flex-start" }}>
                    <Typography component="span" sx={{ fontSize: "1.8rem", fontWeight: "600", fontFamily: "Lato,sans-serif", textAlign: "left" }}>Grow fast,</Typography>
                    <Typography component="span" sx={{ fontSize: "1.9rem", fontWeight: "700", fontFamily: "Lato,sans-serif", textAlign: "left" }}>Invest smart,</Typography>
                    <Typography component="span" sx={{ fontSize: "2.0rem", fontWeight: "800", fontFamily: "Lato,sans-serif", textAlign: "left" }}>
                        Begin your trading journey with us.</Typography>
                </Box>
            </Grid>
        </Grid>
    );
}

export default MainPageBodyTwo;
