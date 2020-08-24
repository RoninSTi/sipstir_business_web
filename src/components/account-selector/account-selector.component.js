import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { SET_ACTIVE_ACCOUNT } from '@actions/types'

import useStyles from './account-selector.style'

const AccountSelector = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const [isActive, setIsActive] = useState(false)

  const accounts = useSelector(state => state.account.accounts)
  const activeAccount = useSelector(state => state.account.activeAccount)

  if (accounts.length < 2) return null

  const handleClick = () => {
    setIsActive(!isActive)
  }

  const handleSetActive = account => {
    setIsActive(false)

    dispatch({
      type: SET_ACTIVE_ACCOUNT,
      payload: account
    })
  }

  return (
    <div className='navbar-item'>
      <div className={`dropdown is-hoverable${isActive ? ' is-active' : ''}`}>
        <div className='dropdown-trigger'>
          <button
            aria-controls='dropdown-menu'
            aria-haspopup='true'
            className={`button ${classes.button}`}
            onClick={handleClick}
          >
            <span>{activeAccount?.name || 'No active account'}</span>
            <span className='icon is-small'>
              <i
                aria-hidden='true'
                className='fas fa-angle-down'
              />
            </span>
          </button>
        </div>
        <div
          className='dropdown-menu'
          id='dropdown-menu'
          role='menu'
        >
          <div className='dropdown-content'>
            {accounts.map((account, index) => {
              const isActive = account.id === activeAccount?.id
              return (
                <a
                  key={`account-${index}`}
                  className={`dropdown-item ${classes.dropdownItem}${isActive ? ' is-active' : ''}`}
                  href='/#'
                  onClick={() => handleSetActive(account)}
                >{account.name}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountSelector
