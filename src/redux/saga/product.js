import { put, takeEvery } from 'redux-saga/effects';

import { FETCH_PRODUCTS_SUCCESS, SET_PRICE } from '@actions/types';

function* onFetchProductsSuccess(action) {
 const { data: products } = action.payload;

 const [product] = products;

 const { prices } = product;

 const [price] = prices;

 yield put({
  type: SET_PRICE,
  payload: price,
 });
}

export function* watchProduct() {
 yield takeEvery(FETCH_PRODUCTS_SUCCESS, onFetchProductsSuccess);
}
