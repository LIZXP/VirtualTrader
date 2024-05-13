export const SET_STOCK_PRICE = 'SET_STOCK_PRICE';
export const SET_STOCK_NEWS = 'SET_STOCK_NEWS';
export const SET_COMPANY_NEWS = 'SET_COMPANY_NEWS';

export const setStockPrice = (data) => ({
    type: SET_STOCK_PRICE,
    payload: data
});

export const setStockNews = (data) => ({
    type: SET_STOCK_NEWS,
    payload: data
});

export const setCompanyNews = (data) => ({
    type: SET_COMPANY_NEWS,
    payload: data
})