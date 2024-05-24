import { Grid, Stack, Typography } from "@mui/material"
import { useContext, useEffect } from "react";
import { fetchStockPrice } from "../../finnhubData/finnhubAPIFetching/finnhubAPIDataFetch";
import { FinnhubDataContext } from "../../finnhubData/finnhubDataStore";
import underConstruction from "../../assets/underConstruction.svg";

let stockPriceIntervalId = null

function StockMarketPage() {
    const { state, dispatch } = useContext(FinnhubDataContext)

    useEffect(() => {

        if (!stockPriceIntervalId) {
            stockPriceIntervalId = setInterval(() => {
                fetchStockPrice(dispatch);
            }, 500000)
        }

        return () => {
            clearInterval(stockPriceIntervalId);
            stockPriceIntervalId = null;
        }
    }, [dispatch])

    return (
        <Grid container spacing={2} sx={{ width: "90%", marginX: "auto", marginTop: { xs: "54px", sm: "87px" }, borderRadius: "25px" }}>
            <Grid item xs={12} sx={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Stack sx={{ marginTop: "51px" }}>
                    <Typography variant="h3" sx={{ fontWeight: "600" }}>Under Construction, Please come back and visit later</Typography>
                    <img src={underConstruction} style={{ height: "400px" }} />
                </Stack>
            </Grid>
            {/* <Grid item xs={12} md={7} sx={{ border: "red solid 2px" }}>
            </Grid>
            <Grid item xs={12} md={5} sx={{ border: "red solid 2px" }}>
            </Grid> */}
        </Grid>
    )
}

export default StockMarketPage