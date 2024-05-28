import axios from 'axios';
import { db } from '../../src/firebase/firebaseConfig';
import { collection, doc, setDoc } from 'firebase/firestore';
import { stocksSymbols } from '../../src/finnhubData/finnhubAPIFetching/stockSymbols';
import moment from 'moment';

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

        const finnhub_API_KEY = process.env.FINNHUB_API_KEY;
        const firestore_API_KEY = process.env.FIRESTORE_API_KEY;
        const firestore_AUTH_DOMAIN = process.env.FIRESTORE_AUTH_DOMAIN;
        const firestore_PROJECT_ID = process.env.FIRESTORE_PROJECT_ID;
        const firestore_STORAGE_BUCKET = process.env.FIRESTORE_STORAGE_BUCKET;
        const firestore_MESSAGING_SENDER_ID = process.env.FIRESTORE_MESSAGING_SENDER_ID;
        const firestore_APP_ID = process.env.FIRESTORE_APP_ID;
        const firestore_MEASUREMENT_ID = process.env.FIRESTORE_MEASUREMENT_ID;

        if (!finnhub_API_KEY || !firestore_API_KEY) {
            throw new Error('Environment variables are not defined');
        }

        const fetchAndEachStoreStockdata = async (stock) => {
            let randomFiveDigitNumber = Math.floor(Math.random() * 100000);
            let fiveDigitString = randomFiveDigitNumber.toString().padStart(5, '0');
            let sixDigitString = '1' + fiveDigitString;

            try {
                const response = await axios.get(
                    `https://finnhub.io/api/v1/quote?symbol=${stock}&token=${finnhub_API_KEY}`
                );
                const data = response.data;

                console.log(response.data); //<-------------here

                const date = moment.unix(data.t).format('YYYY-MM-DD');

                const stockDocRef = doc(db, 'stockPrice', stock);
                const dateCollectionRef = collection(stockDocRef, 'historical');
                const dateDocRef = doc(dateCollectionRef, date);

                await setDoc(dateDocRef, {
                    open: data.o,
                    high: data.h,
                    low: data.l,
                    close: data.c,
                    volume: sixDigitString,
                });

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