import { CLEAR_REDIRECT, SET_REDIRECT } from '@redux/actions/types'

const initialState = {
  redirect: null
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
  case CLEAR_REDIRECT:
    return {
      ...state,
      redirect: null
    }
  case SET_REDIRECT:
    return {
      ...state,
      redirect: payload
    }
  default:
    return {
      ...state
    }
  }
}

export default reducer
