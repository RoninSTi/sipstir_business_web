import { combineReducers } from 'redux'

import accountReducer from '@reducers/account'
import authReducer from '@reducers/auth'
import createAccountReducer from '@reducers/createAccount'
import createUserReducer from '@reducers/createUser'
import memberReducer from '@reducers/member'
import uiReducer from '@reducers/ui'
import uploadReducer from '@reducers/upload'

const rootReducer = combineReducers({
  account: accountReducer,
  auth: authReducer,
  createAccount: createAccountReducer,
  createUser: createUserReducer,
  member: memberReducer,
  ui: uiReducer,
  upload: uploadReducer
})

export default rootReducer
