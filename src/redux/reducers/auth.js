import { CHECK_USERNAME_SUCCESS, CREATE_MEMBER_SUCCESS, SET_AUTH } from '@actions/types'

/**
 * isAuthenticated denotes an auth0 success
 * isValidated denotes auth0 success and the account user has been fetched
 */

const initialState = {
  claims: null,
  isAuthenticated: false,
  isLoading: true,
  isValidated: false,
  token: null,
  user: null,
  usernameExists: false
}

const reducer = (state = initialState, action) => {
  const { type } = action
  let { payload } = action

  if (payload && payload.history) {
    const { history, ...payloadWithOutHistory } = payload
    payload = payloadWithOutHistory
  }

  switch (type) {
  case CHECK_USERNAME_SUCCESS:
    return {
      ...state,
      ...payload
    }
  case CREATE_MEMBER_SUCCESS:
    return {
      ...state,
      isValidated: true
    }
  case SET_AUTH:
    return {
      ...state,
      ...payload
    }
  default:
    return state
  }
}

export default reducer
