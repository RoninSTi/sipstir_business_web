import React, { useEffect } from 'react'

import { Route, Switch } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { SET_REDIRECT } from '@redux/actions/types'
import { getBusinessesAction, getUserAccountsAction } from '@actions/account'
import { fetchRewardsAction } from '@actions/rewards'

import AccountCreate from '@components/account-create/account-create.component'
import AccountOverview from '@components/account-overview/account-overview.component'
import Accounts from '@components/accounts/accounts.component'
import Businesses from '@components/businesses/businesses.component'
import MyAccount from '@components/my-account/my-account.component'
import Navbar from '@components/navbar/navbar.component'
import Rewards from '@components/rewards/rewards.component'
import RewardCreate from '@components/reward-create/reward-create.component'

const Dashboard = () => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user)

  const isEmployee = useSelector(state => state.auth.user?.roles.some(role => role === 'employee'))

  const userId = useSelector(state => state.auth.user?.id)

  const accountId = useSelector(state => state.account.activeAccount?.id)

  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    if (userId && token) {
      dispatch(getUserAccountsAction({ userId, token }))
    }

    if (accountId && token) {
      dispatch(fetchRewardsAction({ accountId, token }))
    }

    if (isEmployee) {
      dispatch(getBusinessesAction({ token }))
    }
  }, [accountId, dispatch, isEmployee, userId, token])

  useEffect(() => {
    if (!user) {
      dispatch({ type: SET_REDIRECT, payload: '/login' })
    }
  }, [dispatch, user])

  return (
    <div>
      <Navbar />
      <div className='container'>
        <div className='section'>
          <Switch>
            <Route path='/accounts/create'>
              <AccountCreate />
            </Route>
            <Route path='/accounts/:accountId'>
              <AccountCreate />
            </Route>
            <Route path='/accounts'>
              <Accounts />
            </Route>
            <Route path='/my-account'>
              <MyAccount />
            </Route>
            <Route path='/rewards/create'>
              <RewardCreate />
            </Route>
            <Route path='/rewards/:rewardId'>
              <RewardCreate />
            </Route>
            <Route path='/rewards'>
              <Rewards />
            </Route>
            <Route
              exact
              path='/'
            >
              {isEmployee ? <Businesses /> : <AccountOverview />}
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
