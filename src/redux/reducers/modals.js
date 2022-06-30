import { CLEAR_MODAL, SET_MODAL } from '@redux/actions/types';

const initialState = {
 activeModal: null,
 dispatchOnClose: null,
 title: '',
 message: '',
};

const reducer = (state = initialState, action) => {
 const { payload, type } = action;

 switch (type) {
  case CLEAR_MODAL:
   return {
    ...initialState,
   };
  case SET_MODAL:
   return {
    ...state,
    ...payload,
   };
  default:
   return {
    ...state,
   };
 }
};

export default reducer;
