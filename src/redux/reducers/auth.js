import { CHECK_USERNAME_SUCCESS, SET_AUTH } from '@actions/types'

const initialState = {
  isAuthenticated: false,
  isLoading: true,
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
