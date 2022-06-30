import { SET_AUTH } from '@actions/types';

const initialState = {
 user: null,
 token: null,
};

const reducer = (state = initialState, action) => {
 const { type } = action;
 const { payload } = action;

 switch (type) {
  case SET_AUTH:
   return {
    ...state,
    ...payload,
   };
  default:
   return state;
 }
};

export default reducer;
