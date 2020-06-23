import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getMemberAccountsAction } from '@actions/account'

import { Link } from 'react-router-dom'

import AccountInfo from '@components/account-info/account-info.component'

const Accounts = () => {
  const dispatch = useDispatch()

  const memberId = useSelector(state => state.member.id)
  const token = useSelector(state => state.auth.token)
  const showCreateAccountButton = useSelector(state => state.member.permissions.some(permission => permission === 'create:account'))

  useEffect(() => {
    if (memberId) {
      dispatch(getMemberAccountsAction({ memberId, token }))
    }
  }, [dispatch, memberId, token])

  return (
    <div>
      <AccountInfo />
      {showCreateAccountButton &&
        <div>
          <Link
            className='button is-primary'
            to='/accounts/create'
          >Create Account
          </Link>
        </div>}
    </div>
  )
}

export default Accounts
