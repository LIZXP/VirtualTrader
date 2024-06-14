import { useState, useContext, useEffect } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { fetchCompanyNewsAndSavetoSession, fetchStockPrice } from "../../finnhubData/finnhubAPIFetching/finnhubAPIDataFetch";
import { FinnhubDataContext } from "../../finnhubData/finnhubDataStore";
import LineChart from "../BaseComponents/LineChart";
import CollapseStockList from "./CollapseStockList/CollapseStockList";
import AboutCompany from "./AboutSection/AboutCompany";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfigFrontend";
import AAPLStockData from "../../StocksHistoryData/AAPLStockData.json";
import ADBEStockData from "../../StocksHistoryData/ADBEStockData.json";
import AMDStockData from "../../StocksHistoryData/AMDStockData.json";
import AMZNStockData from "../../StocksHistoryData/AMZNStockData.json";
import CRMStockData from "../../StocksHistoryData/CRMStockData.json";
import CSCOStockData from "../../StocksHistoryData/CSCOStockData.json";
import EAStockData from "../../StocksHistoryData/EAStockData.json";
import GOOGLStockData from "../../StocksHistoryData/GOOGLStockData.json";
import IBMStockData from "../../StocksHistoryData/IBMStockData.json";
import INTCStockData from "../../StocksHistoryData/INTCStockData.json";
import METAStockData from "../../StocksHistoryData/METAStockData.json";
import MSFTStockData from "../../StocksHistoryData/MSFTStockData.json";
import NFLXStockData from "../../StocksHistoryData/NFLXStockData.json";
import NVDAStockData from "../../StocksHistoryData/NVDAStockData.json";
import ORCLStockData from "../../StocksHistoryData/ORCLStockData.json";
import PYPLStockData from "../../StocksHistoryData/PYPLStockData.json";
import SHOPStockData from "../../StocksHistoryData/SHOPStockData.json";
import SQStockData from "../../StocksHistoryData/SQStockData.json";
import TSLAStockData from "../../StocksHistoryData/TSLAStockData.json";
import UBERStockData from "../../StocksHistoryData/UBERStockData.json";
import moment from "moment";
import { stocksSymbols } from "../../finnhubData/finnhubAPIFetching/stockSymbols";
import CompanyNewsPage from "../CompanyNewsPage/CompanyNewsPage";

let stockPriceIntervalId = null;

const stockMetaDataFiles = {
    AAPL: AAPLStockData,
    ADBE: ADBEStockData,
    AMD: AMDStockData,
    AMZN: AMZNStockData,
    CRM: CRMStockData,
    CSCO: CSCOStockData,
    EA: EAStockData,
    GOOGL: GOOGLStockData,
    IBM: IBMStockData,
    INTC: INTCStockData,
    META: METAStockData,
    MSFT: MSFTStockData,
    NFLX: NFLXStockData,
    NVDA: NVDAStockData,
    ORCL: ORCLStockData,
    PYPL: PYPLStockData,
    SHOP: SHOPStockData,
    SQ: SQStockData,
    TSLA: TSLAStockData,
    UBER: UBERStockData,
}

function StockMarketPage() {
    const { state, dispatch } = useContext(FinnhubDataContext);
    const [selectedStockSymbol, setSelectedStockSymbol] = useState(null);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "Stock Price",
                data: [],
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
            },
        ],
    });
    const [clickedButton, setClickedButton] = useState(0);
    const [companyNewsArray, setCompanyNewsArray] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const dateRangeButton = ["5D", "1M", "1QT", "YTD"];

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            await fetchStockPrice(dispatch);
            const storageData = JSON.parse(sessionStorage.getItem("currentStocksPrice"));
            if (storageData?.AAPL) {
                setSelectedStockSymbol(storageData.AAPL);
            }
            setIsLoading(false);
        };

        if (!sessionStorage.getItem("currentStocksPrice")) {
            fetchData();
        } else {
            const storageData = JSON.parse(sessionStorage.getItem("currentStocksPrice"));
            if (storageData?.AAPL) {
                setSelectedStockSymbol(storageData.AAPL);
            }
            setIsLoading(false);
        }

        if (!stockPriceIntervalId) {
            stockPriceIntervalId = setInterval(() => {
                fetchStockPrice(dispatch);
            }, 500000);
        }

        return () => {
            clearInterval(stockPriceIntervalId);
            stockPriceIntervalId = null;
        };
    }, [dispatch]);

    useEffect(() => {
        if (selectedStockSymbol) {
            formatStockPriceChart(clickedButton, selectedStockSymbol);
            formatAndPrepareCompanyNews(selectedStockSymbol);
        }
    }, [selectedStockSymbol, clickedButton]);

    const handleButtonClick = (index) => {
        setClickedButton(index);
    };

    const saveToSessionStorage = (key, data) => {
        sessionStorage.setItem(key, JSON.stringify(data));
    };

    const getFromSessionStorage = (key) => {
        return JSON.parse(sessionStorage.getItem(key))
    }

    const getLastWorkingDays = (days, daysToSkip) => {
        const dates = [];
        let currentDate = moment().subtract(1, 'days').subtract(daysToSkip, 'days');
        while (dates.length < days) {
            if (currentDate.day() !== 0 && currentDate.day() !== 6) {
                dates.push(currentDate.format('YYYY-MM-DD'));
            }
            currentDate = currentDate.subtract(1, 'days');
        }
        return dates;
    };

    const formatAndPrepareCompanyNews = async (stockModel) => {
        try {
            if (!stockModel || !stockModel.symbol) {
                console.log('No stock symbol provided');
                return;
            }

            const sessionStorageValue = JSON.parse(sessionStorage.getItem("SelectedCompanyNews"));

            if (sessionStorageValue && sessionStorageValue[0].related === stockModel.symbol) {
                setCompanyNewsArray(sessionStorageValue);
                return;
            }

            const companyNewsRawModel = await fetchCompanyNewsAndSavetoSession(stockModel.symbol)
            if (!companyNewsRawModel || companyNewsRawModel.error) {
                console.log("Empty news array or error fetching news, please check!");
                return;
            }

            const savedCompanyNews = JSON.parse(sessionStorage.getItem("SelectedCompanyNews"));

            if (savedCompanyNews) {
                console.log("News fetched and saved to session storage:", savedCompanyNews);
                setCompanyNewsArray(savedCompanyNews);
            } else {
                console.log("No news found in session storage after fetching.");
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }


    const formatStockPriceChart = async (i, stockModel) => {
        try {
            if (!stockModel || !stockModel.symbol) {
                console.log('No stock symbol provided');
                return;
            }

            const stockSymbol = stockModel.symbol;
            const stockData = stockMetaDataFiles[stockSymbol];

            if (!stockData) {
                console.log(`No data available for the given stock symbol: ${stockSymbol}`);
                return;
            }

            const historicalCollectionRef = collection(db, "stockPrice", stockSymbol, "historical");
            const snapshot = await getDocs(historicalCollectionRef);

            if (snapshot.empty) {
                console.log('No matching documents.');
                return;
            }

            const fireBaseHistoricalData = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    time: doc.id,
                    price: data.close,
                };
            });

            const timeFrames = [
                { caseValue: 0, days: 5, sessionKey: "chartDataSet5D" },
                { caseValue: 1, days: 30, sessionKey: "chartDataSet1M" },
                { caseValue: 2, days: 90, sessionKey: "chartDataSet1QT" },
                { caseValue: 3, days: 365, sessionKey: "chartDataSet1Y" },
            ];

            const selectedTimeFrame = timeFrames.find(tf => tf.caseValue === i);

            if (selectedTimeFrame) {
                await processChartData(selectedTimeFrame.days, selectedTimeFrame.sessionKey, fireBaseHistoricalData, stockData);
            }
        } catch (e) {
            console.log(e.message);
        }
    };

    const processChartData = async (days, sessionKey, fireBaseHistoricalData, stockData) => {
        if (fireBaseHistoricalData.length >= days) {
            saveToSessionStorage(sessionKey, fireBaseHistoricalData.slice(0, days));
        } else {
            const dates = getLastWorkingDays(days - fireBaseHistoricalData.length, fireBaseHistoricalData.length);
            dates.forEach(d => {
                if (stockData["Time Series (Daily)"][d]) {
                    fireBaseHistoricalData.unshift({
                        time: d,
                        price: parseFloat(stockData["Time Series (Daily)"][d]["4. close"]).toFixed(2),
                    });
                }
            });
            saveToSessionStorage(sessionKey, fireBaseHistoricalData);
        }

        const chartData = getFromSessionStorage(sessionKey);
        if (chartData) {
            setChartData({
                labels: chartData.map(data => data.time),
                datasets: [
                    {
                        label: "Stock Price",
                        data: chartData.map(data => data.price),
                        borderColor: "rgba(75,192,192,1)",
                        backgroundColor: "rgba(75,192,192,0.2)",
                    },
                ],
            });
        }
    };

    const getStockList = () => {
        const sessionStorageStockList = sessionStorage.getItem("currentStocksPrice");
        const stockList = sessionStorageStockList ? JSON.parse(sessionStorageStockList) : {};

        const initialStockList = {};
        const remainingStockList = {};
        let count = 0;

        for (const key in stockList) {
            if (count < 5) {
                initialStockList[key] = stockList[key];
            } else {
                remainingStockList[key] = stockList[key];
            }
            count++;
        }

        return { initialStockList, remainingStockList };
    };

    const { initialStockList, remainingStockList } = getStockList();

    if (isLoading) {
        return <Box>Loading...</Box>;
    }

    return (
        <Grid container spacing={2} sx={{ width: "90%", marginX: "auto", marginTop: { xs: "54px", sm: "87px" }, borderRadius: "25px" }}>
            <Grid item xs={12} sx={{ borderBottom: "#D3D3D3 solid 1px", marginBottom: "5px" }}>
                <Box sx={{ display: "flex" }}>
                    {selectedStockSymbol && (
                        <>
                            {/* <img src={selectedStockSymbol.img} style={{ width: "51px", padding: "5px" }} /> */}
                            <Stack sx={{ display: "flex", justifyContent: "center", marginLeft: "10px" }}>
                                <Typography sx={{ fontSize: "27px", fontWeight: "600" }}>
                                    {selectedStockSymbol.companyName}
                                </Typography>
                                <Typography sx={{ fontSize: "15px" }}>
                                    NASDAQ: {selectedStockSymbol.symbol}
                                </Typography>
                            </Stack>
                        </>
                    )}
                </Box>
            </Grid>
            <Grid item xs={12} md={7} sx={{ padding: { xs: "10px", lg: "60px" } }}>
                <Stack direction={"row"}>
                    {dateRangeButton.map((drBtn, i) => (
                        <Button key={i}
                            disableRipple={true}
                            name={drBtn}
                            sx={{
                                marginX: "5px",
                                borderRadius: "0",
                                borderBottom: clickedButton === i ? "2px solid black" : "2px solid transparent",
                                paddingBottom: "8px",
                                height: "40px",
                                "&:hover": {
                                    borderBottom: "2px solid black",
                                    backgroundColor: "inherit",
                                },
                                "&:focus": {
                                    outline: "none",
                                },
                            }}
                            onClick={() => handleButtonClick(i)}
                        >
                            {drBtn}
                        </Button>
                    ))}
                </Stack>
                <LineChart chartData={chartData} />
                <Grid item >
                    <Typography variant="h6" sx={{ lineHeight: "1.2em", marginY: "10px" }}>
                        News
                    </Typography>
                    <CompanyNewsPage companyNewsArray={companyNewsArray} />
                </Grid>
            </Grid>
            <Grid item xs={12} md={5} lg={4} xl={3} sx={{ borderLeft: { md: "#D3D3D3 solid 1px", xs: "none" } }}>
                <Grid item xs={12}>
                    <Typography variant="h6" sx={{ lineHeight: "1.2em", marginTop: "10px", borderBottom: "#D3D3D3 solid 1px", paddingBottom: "10px" }}>
                        Explore More Opportunities
                    </Typography>
                    <CollapseStockList initialStockList={initialStockList} remainingStockList={remainingStockList} setSelectedStockSymbol={setSelectedStockSymbol} />
                </Grid>
                <Grid item xs={12} sx={{ borderTop: "#D3D3D3 solid 1px", borderBottom: "#D3D3D3 solid 1px", marginTop: "10px" }}>
                    <Typography variant="h6" sx={{ lineHeight: "1.2em", marginY: "10px" }}>
                        About
                    </Typography>
                    <AboutCompany selectedStockModel={selectedStockSymbol} />
                </Grid>
            </Grid>
        </Grid>
    );
}
export default StockMarketPage;