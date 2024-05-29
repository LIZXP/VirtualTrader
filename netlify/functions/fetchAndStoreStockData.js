import axios from 'axios';
import { stocksSymbols } from '../../src/finnhubData/finnhubAPIFetching/stockSymbols';
import moment from 'moment';
import { storeFinnhubStockData } from '../../src/firebase/firebaseUtilFunctions';

export default async (req) => {
    console.log('Starting fetchAndStoreStockData function');
    try {
        const currentDate = moment();
        const startDate = moment('2024-05-22');
        const endDate = moment('2025-06-01');

        if (!currentDate.isBetween(startDate, endDate, undefined, '[]')) {
            console.log('Current date is outside the desired range. Exiting function.');
            return new Response(JSON.stringify({ message: 'Current date is outside the desired range.' }), {
                status: 200,
            });
        }

        const finnhub_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

        const fetchAndEachStoreStockdata = async (stock) => {
            try {
                const response = await axios.get(
                    `https://finnhub.io/api/v1/quote?symbol=${stock}&token=${finnhub_API_KEY}`
                );
                const data = response.data;

                await storeFinnhubStockData(data, stock)
                console.log('Data successfully stored in Firebase for', stock);

            } catch (error) {
                console.error('Error in fetching or storing data for', stock, ':', error);
            }
        };

        const allOperations = stocksSymbols.map((stock) => fetchAndEachStoreStockdata(stock.name));

        await Promise.all(allOperations);
        console.log('All operations completed.');

        return new Response(JSON.stringify({ message: 'All operations completed.' }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error fetching or storing data:', error);
        return new Response(JSON.stringify({ error: 'Error fetching or storing data', details: error.message }), {
            status: 500,
        });
    }
};