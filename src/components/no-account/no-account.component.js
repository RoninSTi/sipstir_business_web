import React from 'react'

import useStyles from './no-account.style'

const NoAccount = props => {
  const classes = useStyles(props)

  return (
    <div className={`box ${classes.box}`}>
      <div className='container'>
        <div>
          <p>You currently don't have any accounts.  Accounts need to be setup by a SipStir representative.</p>
          <p>Please contact sales@sipstir.app for more information.</p>
        </div>
      </div>
    </div>
  )
}

export default NoAccount
