import { combineReducers } from 'redux'

import accountReducer from '@reducers/account'
import authReducer from '@reducers/auth'
import memberReducer from '@reducers/member'
import modalsReducer from '@reducers/modals'
import navReducer from '@reducers/nav'
import paymentMethodReducer from '@reducers/paymentMethod'
import productReducer from '@reducers/product'
import rewardsReducer from '@reducers/rewards'
import subscriptionReducer from '@reducers/subscription'
import uiReducer from '@reducers/ui'
import uploadReducer from '@reducers/upload'

const rootReducer = combineReducers({
  account: accountReducer,
  auth: authReducer,
  member: memberReducer,
  modals: modalsReducer,
  nav: navReducer,
  product: productReducer,
  paymentMethod: paymentMethodReducer,
  rewards: rewardsReducer,
  subscription: subscriptionReducer,
  ui: uiReducer,
  upload: uploadReducer
})

export default rootReducer
