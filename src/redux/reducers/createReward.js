import { CREATE_REWARD_RESET, CREATE_REWARD_SUCCESS, CREATE_REWARD_UPDATE_FORM, POPULATE_CREATE_REWARD_FORM } from '@actions/types'

const initialState = {
  discount: 0,
  image: null,
  isActive: true,
  message: '',
  name: '',
  points: 0,
  subject: ''
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
  case CREATE_REWARD_RESET:
  case CREATE_REWARD_SUCCESS:
    return {
      ...initialState
    }
  case CREATE_REWARD_UPDATE_FORM:
    return {
      ...state,
      [payload.name]: payload.value
    }
  case POPULATE_CREATE_REWARD_FORM:
    return {
      ...state,
      ...action.payload
    }
  default:
    return state
  }
}

export default reducer
