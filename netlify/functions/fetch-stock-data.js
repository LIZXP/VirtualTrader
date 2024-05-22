import axios from 'axios';
import { db } from '../../src/firebase/firebaseConfig';
import { collection, doc, setDoc } from "firebase/firestore";
import { stocksSymbols } from '../../src/finnhubData/finnhubAPIFetching/stockSymbols';
import moment from 'moment';

export async function fetchAndStoreStockData() {
    try {
        const finnhub_API_KEY = import.meta.env.VITE_FINNHUB_API_KEY;

        const fetchAndEachStoreStockdata = async (stock) => {
            let randomFiveDigitNumber = Math.floor(Math.random() * 100000);
            let fiveDigitString = randomFiveDigitNumber.toString().padStart(5, '0');
            let sixDigitString = '1' + fiveDigitString;

            try {
                const response = await axios.get(`https://finnhub.io/api/v1/quote?symbol=${stock}&token=${finnhub_API_KEY}`);
                const data = response.data;

                const date = moment.unix(data.t).format("YYYY-MM-DD");

                console.log(data, date);
                const stockDocRef = doc(db, 'stockPrice', stock);
                const dateCollectionRef = collection(stockDocRef, 'historical');
                const dateDocRef = doc(dateCollectionRef, date);

                await setDoc(dateDocRef, {
                    open: data.o,
                    high: data.h,
                    low: data.l,
                    close: data.c,
                    volume: sixDigitString
                });

                console.log('Data successfully stored in Firebase for', stock);
            } catch (error) {
                console.error('Error in fetching or storing data for', stock, ':', error);
            }
        };

        const allOperations = stocksSymbols.map(stock => fetchAndEachStoreStockdata(stock.name));

        await Promise.all(allOperations);
        console.log("All operations completed.");
    } catch (error) {
        console.error('Error fetching or storing data:', error);
    }
}

fetchAndStoreStockData();