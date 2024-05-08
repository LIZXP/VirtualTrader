export default function stockPriceReducer(state, action) {
    switch (action.type) {
        case 'SET_STOCK_PRICE':
            return { ...state, stockPrice: action.payload, lastUpdate: new Date().toISOString() };
        default:
            return state;
    }
}