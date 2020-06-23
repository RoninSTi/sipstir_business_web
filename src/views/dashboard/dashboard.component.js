import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Accounts from '@components/accounts/accounts.component'
import Navbar from '@components/navbar/navbar.component'
import AccountCreate from '@components/account-create/account-create.component'
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
        </Switch>
      </div>
    </div>
  )
}

export default Dashboard
