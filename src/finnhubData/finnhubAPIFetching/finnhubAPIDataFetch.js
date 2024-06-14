import { setStockPrice, setStockNews, setCompanyNews } from "../actions/actions";
import { stocksSymbols } from "./stockSymbols";
import axios from 'axios';
import moment from "moment";

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

export const fetchStockPrice = async (dispatch) => {
    try {
        const getStocksData = async (stock) => {
            try {
                const response = await axios.get(`${BASE_URL}/quote?symbol=${stock.name}&token=${API_KEY}`);
                return {
                    ...response.data,
                    symbol: stock.name,
                    img: stock.img,
                    companyName: stock.companyName,
                    website: stock.website,
                    about: stock.about
                };
            } catch (error) {
                console.error("Error fetching stock data for", stock.name, error.message);
                return undefined;
            }
        };

        const allStockPriceData = await Promise.all(stocksSymbols.map(ssymb => getStocksData(ssymb)));

        const validData = allStockPriceData.filter(data => data !== undefined);

        dispatch(setStockPrice(validData));

        const dataPriceSessionData = validData.reduce((acc, cur) => {
            acc[cur.symbol] = cur;
            return acc;
        }, {});

        sessionStorage.setItem("currentStocksPrice", JSON.stringify(dataPriceSessionData));
    } catch (error) {
        console.error('Failed to fetch stock prices:', error);
    }
};

export const fetchStockNews = async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/news?category=general&token=${API_KEY}`);
        dispatch(setStockNews(response.data));
    } catch (error) {
        console.error('Failed to fetch stock news:', error);
    }
};

export const fetchCompanyNews = async (dispatch) => {
    try {
        const getCompanyNewsData = async (stock) => {
            const dateFormat = "YYYY-MM-DD";
            const currentDay = moment(new Date()).format(dateFormat);
            const fiveDaysAgo = moment().subtract(3, 'days').format(dateFormat);

            try {
                const response = await axios.get(`${BASE_URL}/company-news?symbol=${stock.name}&from=${fiveDaysAgo}&to=${currentDay}&token=${API_KEY}`);
                return { [stock.name]: response.data };
            } catch (error) {
                console.log(`Error fetching data for ${stock.name}:`, error);
                return { [stock.name]: { error: 'Failed to fetch data', details: error } };
            }
        };

        const allCompanyNewsData = await Promise.all(stocksSymbols.slice(0, 3).map(ssymb => getCompanyNewsData(ssymb)));

        const filteredData = allCompanyNewsData.reduce((acc, data) => ({ ...acc, ...data }), {});
        dispatch(setCompanyNews(filteredData));

    } catch (error) {
        console.error('Failed to fetch company news:', error);
    }
};

export const fetchCompanyNewsAndSavetoSession = async (stockName) => {

    if (!stockName) {
        console.log("cant passing in empty string!");
        return;
    }

    const dateFormat = "YYYY-MM-DD";
    const currentDay = moment(new Date()).format(dateFormat);
    const fiveDaysAgo = moment().subtract(5, 'days').format(dateFormat);

    try {
        const response = await axios.get(`${BASE_URL}/company-news?symbol=${stockName}&from=${fiveDaysAgo}&to=${currentDay}&token=${API_KEY}`);

        if (response.data && response.data.length > 0) {
            response.data = response.data.filter(news => news.image).slice(0, 10);
        }

        sessionStorage.setItem("SelectedCompanyNews", JSON.stringify(response.data));
        return response.data;

    } catch (error) {
        console.log(`Error fetching data for ${stockName}:`, error);
        return { stockName: { error: 'Failed to fetch data', details: error } };

    }
};
