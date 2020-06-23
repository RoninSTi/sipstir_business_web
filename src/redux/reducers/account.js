import { FETCH_MEMBER_ACCOUNTS_SUCCESS, SET_ACTIVE_ACCOUNT } from '@actions/types'

const initialState = {
  accounts: [],
  activeAccount: null
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
  case FETCH_MEMBER_ACCOUNTS_SUCCESS: {
    return {
      ...state,
      accounts: payload.data
    }
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
