export default function companyNewsReducer(state, action) {
    switch (action.type) {
        case 'SET_COMPANY_NEWS':
            return { ...state, companyNews: action.payload, lastUpdate: new Date().toISOString() };
        default:
            return state;
    }
}