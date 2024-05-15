import axios from 'axios';
import { db } from '../../src/firebase/firebaseConfig';
import { collection, doc, setDoc } from "firebase/firestore";
import { stocksSymbols } from '../../src/finnhubData/finnhubAPIFetching/stockSymbols';

// export async function fetchAndStoreStockData() {
//     try {
//         const alphavantage_API_KEY = import.meta.env.VITE_ALPHA_VANTAGE_API_KEY;

//         const fetchAndEachStoreStockdata = async (stock) => {
//             try {
//                 // const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&outputsize=full&apikey=${alphavantage_API_KEY}`);
//                 const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&outputsize=full&apikey=demo`);
//                 const data = response.data;
//                 const metaData = data["Meta Data"];
//                 const timeSeriesData = data["Time Series (Daily)"];
//                 const stockName = metaData["2. Symbol"];

//                 const stockDocRef = doc(db, 'stockPrice', stockName);
//                 const dateCollectionRef = collection(stockDocRef, 'historical');

//                 for (const date in timeSeriesData) {
//                     const stockData = timeSeriesData[date];
//                     const dateDocRef = doc(dateCollectionRef, date);

//                     await setDoc(dateDocRef, {
//                         open: stockData["1. open"],
//                         high: stockData["2. high"],
//                         low: stockData["3. low"],
//                         close: stockData["4. close"],
//                         volume: stockData["5. volume"]
//                     });
//                 }
//                 console.log('Data successfully stored in Firebase for', stockName);
//             } catch (error) {
//                 console.error('Error in fetching or storing data for', stock, ':', error);
//             }
//         }

//         const allOperations = stocksSymbols.map(ssbol => fetchAndEachStoreStockdata(ssbol.name));

//         await Promise.all(allOperations);
//         console.log("All operations completed.");
//     } catch (error) {
//         console.error('Error fetching or storing data:', error);
//     }
// }