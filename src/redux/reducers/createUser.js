import { CHECK_USERNAME_SUCCESS, CREATE_USER_SUCCESS, CREATE_USER_UPDATE_FORM } from '@actions/types'

const initialState = {
  email: '',
  username: '',
  avatar: '',
  usernameIsAvailable: true
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
  case CHECK_USERNAME_SUCCESS:
    return {
      ...state,
      usernameIsAvailable: payload.data.isAvailable
    }
  case CREATE_USER_UPDATE_FORM:
    return {
      ...state,
      [payload.name]: payload.value
    }
  case CREATE_USER_SUCCESS: {
    return {
      ...initialState
    }
  }
  default:
    return state
  }
}

export default reducer
