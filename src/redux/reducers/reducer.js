import { combineReducers } from 'redux'

import authReducer from '@reducers/auth'
import userReducer from '@reducers/user'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer
})

export default rootReducer
