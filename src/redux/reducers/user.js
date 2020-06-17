import { LOGIN_SUCCESS } from '@actions/types'

const initialState = {
  accounts: [],
  avatar: '',
  createdAt: '',
  email: '',
  id: '',
  role: '',
  username: ''
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
  case LOGIN_SUCCESS:
    return {
      ...state,
      ...payload.data
    }
  default:
    return state
  }
}

export default reducer
