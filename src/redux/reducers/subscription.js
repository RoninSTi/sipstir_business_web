import {
  CANCEL_SUBSCRIPTION_SUCCESS,
  CREATE_SUBSCRIPTION_SUCCESS,
  FETCH_SUBSCRIPTION_SUCCESS
} from '@redux/actions/types'

const initialState = {
  subscription: null
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
  case CREATE_SUBSCRIPTION_SUCCESS:
  case FETCH_SUBSCRIPTION_SUCCESS:
    return {
      ...state,
      subscription: payload.data
    }
  case CANCEL_SUBSCRIPTION_SUCCESS:
    return {
      ...state,
      subscription: null
    }
  default:
    return {
      ...state
    }
  }
}

export default reducer
