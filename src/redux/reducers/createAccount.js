import { CREATE_ACCOUNT_ADD_MEMBER, CREATE_ACCOUNT_DELETE_MEMBER, CREATE_ACCOUNT_SUCCESS, CREATE_ACCOUNT_UPDATE_FORM } from '@actions/types'

const initialState = {
  email: '',
  name: '',
  placeId: null,
  members: []
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
  case CREATE_ACCOUNT_ADD_MEMBER: {
    return {
      ...state,
      members: [...state.members, payload]
    }
  }
  case CREATE_ACCOUNT_DELETE_MEMBER:
    return {
      ...state,
      members: state.members.slice(0, payload).concat(state.members.slice(payload + 1, state.members.length))
    }
  case CREATE_ACCOUNT_SUCCESS:
    return {
      ...initialState
    }
  case CREATE_ACCOUNT_UPDATE_FORM:
    return {
      ...state,
      [payload.name]: payload.value
    }
  default:
    return state
  }
}

export default reducer
