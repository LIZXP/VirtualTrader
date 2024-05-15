import { Card, Grid, Stack, Typography } from "@mui/material"
import { useContext, useEffect, useState } from "react"
import { fetchCompanyNews, fetchStockNews } from "../../finnhubData/finnhubAPIFetching/finnhubAPIDataFetch"
import { FinnhubDataContext } from "../../finnhubData/finnhubDataStore"
import { stocksSymbols } from "../../finnhubData/finnhubAPIFetching/stockSymbols"


function NewsPageIndex() {
    const { state, dispatch } = useContext(FinnhubDataContext)
    const [companyNewsFetched, setCompanyNewsFetched] = useState(false);
    useEffect(() => {
        if (!state.stockNewsState.lastUpdate || shouldFetchNews(state.stockNewsState.lastUpdate)) {
            fetchStockNews(dispatch);
        }
    }, [state.stockNewsState.lastUpdate, dispatch]);

    useEffect(() => {
        if (!state.companyNewsState.lastUpdate || shouldFetchNews(state.companyNewsState.lastUpdate)) {
            fetchCompanyNews(dispatch).then(() => setCompanyNewsFetched(true));
        }
    }, [state.companyNewsState.lastUpdate, dispatch]);

    const shouldFetchNews = (lastUpdate) => {
        const lastUpdateTime = new Date(lastUpdate).getTime();
        const currentTime = new Date().getTime();

        const oneMin = 10 * 60 * 1000;
        return (currentTime - lastUpdateTime > oneMin);
    }

    const getTimeAgo = (timestamp) => {
        const timePublished = new Date(timestamp * 1000);
        const timeNow = new Date();
        const difference = timeNow - timePublished;
        const minutesAgo = Math.floor(difference / 60000);
        const hoursAgo = Math.floor(minutesAgo / 60);

        if (hoursAgo > 0) {
            return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
        } else {
            return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
        }
    };

    const topCompanyNews = () => {
        if (companyNewsFetched && state.companyNewsState.companyNews) {
            if (Object.keys(state.companyNewsState.companyNews).length > 0) {
                return stocksSymbols.filter((symbol, i) => i < 3).map((symbol, i) => (
                    <Card key={i} sx={{ marginBottom: "20px" }}>
                        <Typography sx={{ width: "95%", height: "2rem", padding: "10px 0 0 6px", fontWeight: "600" }}>{symbol.name}</Typography>
                        {state.companyNewsState.companyNews[symbol.name] && state.companyNewsState.companyNews[symbol.name].slice(0, 5).map((companyNews, j) => (
                            <Grid container key={j} sx={{ width: "95%", marginX: "auto", borderTop: "grey solid 1px", paddingY: "10px" }} spacing={0.5}>
                                <Grid item xs={12}>
                                    <Stack direction={"row"}>
                                        <Typography sx={{ fontSize: "0.8rem" }}>Source: {companyNews.source}</Typography>
                                    </Stack>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography sx={{ fontSize: { xs: "0.85rem", sm: "1.2rem", md: "1.20rem", lg: "1.5rem", xl: "1.6rem" }, fontWeight: "600", paddingRight: "5px" }}>{companyNews.headline}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography sx={{ fontSize: { xs: "0.6rem", sm: "0.8rem", md: "0.9rem" }, fontWeight: "500", textAlign: "right" }}>{getTimeAgo(companyNews.datetime)}</Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </Card>
                ));
            }
        }
    };

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
                {topCompanyNews()}
            </Grid>
        </Grid>
    )
}

export default NewsPageIndex