import React from 'react'

import AccountBox from '@components/account-box/account-box.component'
import PageHeader from '@components/page-header/page-header.component'
import ProfileBox from '@components/profile-box/profile-box.component'

// import useStyles from './my-account.style'

const MyAccount = props => {
  return (
    <div>
      <PageHeader title='My Account' />
      <div className='tile is-ancestor'>
        <div className='tile is-parent is-6 is-vertical'>
          <div className='tile is-child'>
            <div className='box'>
              <AccountBox />
            </div>
          </div>
          <div className='tile is-child'>
            <div className='box'>
              Plan Stuff
            </div>
          </div>
        </div>
        <div className='tile is-parent is-6 is-vertical'>
          <div className='tile is-child'>
            <div className='box'>
              <ProfileBox />
            </div>
          </div>
          <div className='tile is-child'>
            <div className='box'>
              Activity Stuff
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyAccount
