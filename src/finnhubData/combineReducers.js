import stockPriceReducer from "./reducers/stockPriceReducer"
import stockNewsReducer from "./reducers/stockNewsReducer"

function combineReducers(reducers) {
    return (state, action) => {
        return Object.keys(reducers).reduce(
            (newState, key) => {
                newState[key] = reducers[key](state[key], action);
                return newState;
            },
            {}
        );
    };
}

const rootReducer = combineReducers({
    stockPriceState: stockPriceReducer,
    stockNewsState: stockNewsReducer
});

export default rootReducer