import { FETCH_PAYMENT_METHOD_SUCCESS } from '@actions/types';

const initialState = {
 paymentMethod: null,
};

const reducer = (state = initialState, action) => {
 const { payload, type } = action;

 switch (type) {
  case FETCH_PAYMENT_METHOD_SUCCESS:
   return {
    ...state,
    paymentMethod: payload.data,
   };
  default:
   return {
    ...state,
   };
 }
};

export default reducer;
