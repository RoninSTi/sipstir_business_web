import { FETCH_USER_ACCOUNTS_SUCCESS, SET_ACTIVE_ACCOUNT } from '@actions/types'
import { FETCH_BUSINESSES_SUCCESS, FETCH_ACCOUNT_ACTIVITY_SUCCESS } from '../actions/types'

const initialState = {
  accounts: [],
  activeAccount: null,
  activity: [],
  businesses: []
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
  case FETCH_ACCOUNT_ACTIVITY_SUCCESS:
    return {
      ...state,
      activity: payload.data
    }
  case FETCH_BUSINESSES_SUCCESS:
    return {
      ...state,
      businesses: payload.data
    }
  case FETCH_USER_ACCOUNTS_SUCCESS:
    return {
      ...state,
      accounts: payload.data
    }
  case SET_ACTIVE_ACCOUNT:
    return {
      ...state,
      activeAccount: payload
    }
  default:
    return state
  }
}

export default reducer
