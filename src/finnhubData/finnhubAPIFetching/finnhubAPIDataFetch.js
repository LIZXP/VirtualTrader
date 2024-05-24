import { setStockPrice, setStockNews, setCompanyNews } from "../actions/actions"
import { stocksSymbols } from "./stockSymbols";
import axios from 'axios';
import moment from "moment";

const API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;
const BASE_URL = 'https://finnhub.io/api/v1';

export const fetchStockPrice = async (dispatch) => {
    try {
        const getStocksData = (stock) => {
            return axios.get(`${BASE_URL}/quote?symbol=${stock.name}&token=${API_KEY}`)
                .then(response => ({
                    ...response.data,
                    symbol: stock.name,
                    img: stock.img
                }))
                .catch((error) => {
                    console.error("Error fetching stock data for", stock.name, error.message);
                });
        };

        const allStockPriceData = stocksSymbols.map(ssymb => getStocksData(ssymb));

        Promise.all(allStockPriceData)
            .then(completeData => {
                dispatch(setStockPrice(completeData.filter(data => data !== undefined)))
            })
            .catch(e => console.error('Error resolving stock prices:', e))
    } catch (error) {
        console.error('Failed to fetch stock prices:', error);
    }
};

export const fetchStockNews = async (dispatch) => {
    try {
        axios.get(`${BASE_URL}/news?category=general&token=${API_KEY}`)
            .then(res => {
                dispatch(setStockNews(res.data));
            }).catch(e => console.log(e))
    } catch (error) {
        console.error('Failed to fetch stock news:', error);
    }
};

export const fetchCompanyNews = async (dispatch) => {
    try {
        const getCompanyNewsData = (stock) => {
            const dateFormat = "YYYY-MM-DD"
            const currentDay = moment(new Date()).format(dateFormat)
            const fiveDaysAgo = moment().subtract(3, 'days').format(dateFormat);

            return axios.get(`${BASE_URL}/company-news?symbol=${stock.name}&from=${fiveDaysAgo}&to=${currentDay}&token=${API_KEY}`)
                .then(res => {
                    return { [stock.name]: res.data }
                }).catch(e => {
                    console.log(`Error fetching data for ${stock.name}:`, e);
                    return { [stock.name]: { error: 'Failed to fetch data', details: e } };
                })
        }
        const allStockPriceData = stocksSymbols.slice(0, 3).map(ssymb => getCompanyNewsData(ssymb));

        Promise.all(allStockPriceData)
            .then(completeData => {
                const filteredData = completeData.reduce((acc, data) => ({ ...acc, ...data }), {});
                dispatch(setCompanyNews(filteredData));
            })
            .catch(e => console.error('Error resolving stock prices:', e))
    } catch (error) {
        console.error('Failed to fetch stock news:', error);
    }
};