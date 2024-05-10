import { Box, Grid, Stack, Typography } from "@mui/material";

const baseTypographyStyle = {
    fontFamily: "PT Serif Caption,sans-serif",
    fontWeight: "600",
    textAlign: { xs: "center", md: "left" },
};

const headingStyle = {
    ...baseTypographyStyle,
    fontSize: "1.5rem",
    paddingBottom: { xs: "12px", md: "0" }
};

const textStyle = {
    ...baseTypographyStyle,
    fontSize: "1rem",
    paddingBottom: { xs: "42px", md: "0" }
};

const stackBorderStyle = {
    borderTop: { md: "black solid 2px" },
    borderBottom: { xs: "black solid 2px", md: "none" }
};

function MainPageBodyTwo() {
    return (
        <Grid container spacing={0.5} sx={{ minHeight: "80vh", margin: "auto", position: "relative", paddingX: { lg: "80px" }, paddingTop: { xs: "5%", md: "0", lg: "10%" } }}>
            <Grid item xs={12}>
                <Box sx={{ display: 'flex', width: { xs: "100%", md: "50%", lg: "60%" } }}>
                    <Typography component="span" sx={{ lineHeight: "60px", fontSize: { xs: "2.8rem", lg: "3.9rem" }, ...baseTypographyStyle, textAlign: "left" }}>
                        Master the Markets, Invest in Your Future
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={1.5}>
                    {["Learn & Practice", "Simulate Real Trades", "Build Confidence"].map((title, index) => (
                        <Grid item md={4} key={index}>
                            <Stack sx={stackBorderStyle}>
                                <Typography component="span" sx={headingStyle}>
                                    {title}
                                </Typography>
                                <Typography component="span" sx={textStyle}>
                                    {index === 0 ? "Begin with the basics of stock trading and graduate to advanced strategies, all risk-free. Practice with virtual funds and real-time market data."
                                        : index === 1 ? "Use our simulation platform to trade stocks as if you were on Wall Street. Gain unmatched experience without using real money."
                                            : "Develop your trading skills and build confidence with each trade. Ready yourself for the real markets with our comprehensive educational tools."}
                                </Typography>
                            </Stack>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
}

export default MainPageBodyTwo;