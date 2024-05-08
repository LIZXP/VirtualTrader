export default function stockNewsReducer(state, action) {
    switch (action.type) {
        case 'SET_STOCK_NEWS':
            return { ...state, stockNews: action.payload, lastUpdate: new Date().toISOString() };
        default:
            return state;
    }
}