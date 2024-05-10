import { Box, Card, Grid, Stack, Typography } from "@mui/material"
import { useContext, useEffect } from "react"
import { fetchStockNews } from "../../finnhubData/finnhubAPIFetching/finnhubAPIDataFetch"
import { FinnhubDataContext } from "../../finnhubData/finnhubDataStore"


function NewsPageIndex() {
    const { state, dispatch } = useContext(FinnhubDataContext)
    useEffect(() => {
        if (state.stockNewsState.stockNews.length === 0 || (!state.stockNewsState.lastUpdate || shouldFetchNews(state.stockNewsState.lastUpdate))) {
            fetchStockNews(dispatch)
        }
    }, [state.stockNewsState.stockNews.length, state.stockNewsState.lastUpdate, dispatch])

    const shouldFetchNews = (lastUpdate) => {
        const lastUpdateTime = new Date(lastUpdate).getTime();
        const currentTime = new Date().getTime();

        const oneMin = 10 * 60 * 1000;
        return (currentTime - lastUpdateTime > oneMin);
    }

    const getTimeAgo = (timestamp) => {
        const timePublished = new Date(timestamp * 1000); // Convert Unix timestamp to JavaScript Date
        const timeNow = new Date();
        const difference = timeNow - timePublished; // Difference in milliseconds
        const minutesAgo = Math.floor(difference / 60000);
        const hoursAgo = Math.floor(minutesAgo / 60);

        if (hoursAgo > 0) {
            return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
        } else {
            return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
        }
    };

    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++", state.stockNewsState);

    return (
        <Grid container spacing={2} sx={{ minHeight: "100%", width: "90%", marginX: "auto", marginTop: { xs: "54px", sm: "84px" }, borderRadius: "25px" }}>
            <Grid item xs={12} md={7} sx={{ height: "100%" }}>
                <Card >
                    <Typography sx={{ width: "95%", height: "2rem", padding: "10px 0 0 6px", fontWeight: "600" }}>Top News</Typography>
                    {state.stockNewsState?.stockNews && state.stockNewsState.stockNews.length > 0 ? state.stockNewsState.stockNews.filter(filterItem => (filterItem.image)).map((news, i) => (
                        <Grid container key={i} sx={{ width: "95%", marginX: "auto", borderTop: "grey solid 1px", paddingY: "10px" }} spacing={0.5}>
                            <Grid item xs={12}>
                            </Grid>
                            <Grid item xs={12}>
                                <Stack direction={"row"}>
                                    <Typography sx={{ fontSize: "0.8rem" }}>Source: {news.source}</Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography sx={{ fontSize: { xs: "0.85rem", sm: "1.2rem", md: "1.20rem", lg: "1.5rem", xl: "1.6rem" }, fontWeight: "600", paddingRight: "5px" }} >{news.headline}</Typography>
                            </Grid>
                            <Grid item xs={4} sx={{ flexShrink: 0 }}>
                                <img src={news.image} alt="News" style={{ width: "100%", borderRadius: "10px" }} />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem", md: "0.9rem" }, fontWeight: "500", textAlign: "right" }} >{getTimeAgo(news.datetime)}</Typography>
                            </Grid>
                        </Grid>
                    )) : (
                        <Typography variant="h6">No news to display</Typography>
                    )}
                </Card>
            </Grid>
            <Grid item xs={12} md={5} >
                <Grid container>
                    <Grid item>

                    </Grid>
                    <Grid item>

                    </Grid>
                    <Grid item>

                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default NewsPageIndex