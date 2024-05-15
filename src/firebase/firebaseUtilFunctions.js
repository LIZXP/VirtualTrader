import { db, auth } from './firebaseConfig';
import { collection, doc, addDoc, getDoc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';


export async function queryStockData(stockSymbol, startDate, endDate) {
    try {
        const stockCollectionRef = collection(db, 'stockprice', stockSymbol);

        const q = query(stockCollectionRef, where('__name__', '>=', startDate), where('__name__', '<=', endDate));

        const querySnapshot = await getDocs(q);

        const stockData = [];
        querySnapshot.forEach((doc) => {
            stockData.push({ date: doc.id, ...doc.data() });
        });

        console.log('Stock data within the date range:', stockData);
        return stockData;
    } catch (error) {
        console.error('Error querying stock data:', error);
    }
}