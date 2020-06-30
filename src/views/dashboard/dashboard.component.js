import React from 'react'

import { Route, Switch } from 'react-router-dom'

import AccountCreate from '@components/account-create/account-create.component'
import Accounts from '@components/accounts/accounts.component'
import Navbar from '@components/navbar/navbar.component'
import Rewards from '@components/rewards/rewards.component'
import RewardCreate from '@components/reward-create/reward-create.component'
import RewardDetail from '@components/reward-detail/reward-detail.component'
import Subscription from '@components/subscription/subscription.component'
import UserCreate from '@components/user-create/user-create.component'

const Dashboard = () => {
  return (
    <div className='container'>
      <Navbar />
      <div className='section'>
        <Switch>
          <Route path='/accounts/create'>
            <AccountCreate />
          </Route>
          <Route path='/accounts/user/create'>
            <UserCreate />
          </Route>
          <Route path='/accounts'>
            <Accounts />
          </Route>
          <Route path='/rewards/create'>
            <RewardCreate />
          </Route>
          <Route path='/rewards/:rewardId'>
            <RewardDetail />
          </Route>
          <Route path='/rewards'>
            <Rewards />
          </Route>
          <Route path='/subscription'>
            <Subscription />
          </Route>
        </Switch>
      </div>
    </div>
  )
}

export default Dashboard
