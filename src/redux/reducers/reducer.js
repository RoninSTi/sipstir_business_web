import { combineReducers } from 'redux'

import accountReducer from '@reducers/account'
import authReducer from '@reducers/auth'
import memberReducer from '@reducers/member'
import navReducer from '@reducers/nav'
import productReducer from '@reducers/product'
import rewardsReducer from '@reducers/rewards'
import uiReducer from '@reducers/ui'
import uploadReducer from '@reducers/upload'

const rootReducer = combineReducers({
  account: accountReducer,
  auth: authReducer,
  member: memberReducer,
  nav: navReducer,
  rewards: rewardsReducer,
  product: productReducer,
  ui: uiReducer,
  upload: uploadReducer
})

export default rootReducer
