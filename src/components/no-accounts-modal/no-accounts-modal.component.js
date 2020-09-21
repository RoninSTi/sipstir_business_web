import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { CLEAR_MODAL } from '@redux/actions/types'

const NoAccountsModal = () => {
  const dispatch = useDispatch()

  const isActive = useSelector(state => state.modals.activeModal === 'no-accounts')

  const handleOnCancel = () => {
    dispatch({ type: CLEAR_MODAL })
  }

  return (
    <div className={`modal${isActive ? ' is-active' : ''}`}>
      <div className='modal-background' />
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>No Established Account</p>
          <button
            aria-label='close'
            className='delete'
            onClick={handleOnCancel}
          />
        </header>
        <section className='modal-card-body'>
          <div>
            <p>You currently don't have any accounts.  Accounts need to be setup by a SipStir representative.  Please contact sales@sipstir.app for more information.</p>
          </div>
        </section>
        <footer className='modal-card-foot'>
          <button
            className='button is-info'
            onClick={handleOnCancel}
          >OK
          </button>
        </footer>
      </div>
    </div>
  )
}

export default NoAccountsModal
