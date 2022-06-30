import { FETCH_PRODUCTS_SUCCESS, SET_PRICE } from '@actions/types';

const initialState = {
 products: [],
 selectedPrice: null,
};

const reducer = (state = initialState, action) => {
 const { payload, type } = action;

 switch (type) {
  case FETCH_PRODUCTS_SUCCESS:
   return {
    ...state,
    products: payload.data,
   };
  case SET_PRICE:
   return {
    ...state,
    selectedPrice: payload,
   };
  default:
   return state;
 }
};

export default reducer;
