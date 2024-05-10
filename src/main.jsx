import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css';
import { FinnhubStockDataProvider } from "./finnhubData/finnhubDataStore.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
    <FinnhubStockDataProvider>
      <App />
  </FinnhubStockDataProvider>
)
