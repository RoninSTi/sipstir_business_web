import { combineReducers } from 'redux'

import accountReducer from '@reducers/account'
import authReducer from '@reducers/auth'
import createAccountReducer from '@reducers/createAccount'
import createRewardReducer from '@reducers/createReward'
import createUserReducer from '@reducers/createUser'
import memberReducer from '@reducers/member'
import productReducer from '@reducers/product'
import rewardsReducer from '@reducers/rewards'
import uiReducer from '@reducers/ui'
import uploadReducer from '@reducers/upload'

const rootReducer = combineReducers({
  account: accountReducer,
  auth: authReducer,
  createAccount: createAccountReducer,
  createReward: createRewardReducer,
  createUser: createUserReducer,
  member: memberReducer,
  rewards: rewardsReducer,
  product: productReducer,
  ui: uiReducer,
  upload: uploadReducer
})

export default rootReducer
