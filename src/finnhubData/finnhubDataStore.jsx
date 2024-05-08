import { createContext, useReducer } from 'react';
import rootReducer from './combineReducers';
import initialState from "./initialState/initialStates"

export const FinnhubDataContext = createContext();

export const FinnhubStockDataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(rootReducer, initialState);

    return (
        <FinnhubDataContext.Provider value={{ state, dispatch }}>
            {children}
        </FinnhubDataContext.Provider>
    );
};