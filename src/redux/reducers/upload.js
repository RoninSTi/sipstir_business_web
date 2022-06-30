import { GET_SIGNED_URL_SUCCESS } from '@actions/types';

const initialState = {
 signedRequest: null,
 url: null,
};

const reducer = (state = initialState, action) => {
 const { payload, type } = action;

 switch (type) {
  case GET_SIGNED_URL_SUCCESS:
   return {
    ...state,
    ...payload.data,
   };
  default:
   return state;
 }
};

export default reducer;
