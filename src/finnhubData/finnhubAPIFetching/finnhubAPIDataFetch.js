import { setStockPrice, setStockNews } from "../actions/actions"
import { stocksSymbols } from "./stockSymbols";
import axios from 'axios';

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