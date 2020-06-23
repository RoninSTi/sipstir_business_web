import { CREATE_MEMBER_SUCCESS } from '@actions/types'

const initialState = {
  createdAt: '',
  email: '',
  id: '',
  permissions: [],
  updatedAt: ''
}

const reducer = (state = initialState, action) => {
  const { payload, type } = action

  switch (type) {
  case CREATE_MEMBER_SUCCESS:
    return {
      ...state,
      ...payload.data,
      permissions: JSON.parse(payload.data.permissions)
    }
  default:
    return state
  }
}

export default reducer
