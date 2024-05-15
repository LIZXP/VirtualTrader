import { Grid, Typography } from "@mui/material"
import { useContext, useEffect } from "react";
import { fetchStockPrice } from "../../finnhubData/finnhubAPIFetching/finnhubAPIDataFetch";
import { FinnhubDataContext } from "../../finnhubData/finnhubDataStore";

let stockPriceIntervalId = null

function StockMarketPage() {
    const { state, dispatch } = useContext(FinnhubDataContext)

    useEffect(() => {
        if (!stockPriceIntervalId) {

            stockPriceIntervalId = setInterval(() => {
                fetchStockPrice(dispatch);
            }, 300000)
        }

        return () => {
            clearInterval(stockPriceIntervalId);
            stockPriceIntervalId = null;
        }
    }, [dispatch])

    return (
        <Grid container spacing={2} sx={{ width: "90%", marginX: "auto", marginTop: { xs: "54px", sm: "87px" }, borderRadius: "25px" }}>
            <Grid item xs={12} md={7} sx={{ border: "red solid 2px" }}>
            </Grid>
            <Grid item xs={12} md={5} sx={{ border: "red solid 2px" }}>
            </Grid>
        </Grid>
    )
}

export default StockMarketPage