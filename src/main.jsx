import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css';
import { FinnhubStockDataProvider } from "./finnhubData/finnhubDataStore.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FinnhubStockDataProvider>
      <App />
    </FinnhubStockDataProvider>
  </React.StrictMode>,
)
