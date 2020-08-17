import React from 'react'

import useStyles from './account-info-block.style'

const AccountInfoBlock = ({ buttonTitle, onClick, subtitle, title }) => {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <div>
        <span className={classes.subtitle}>{subtitle}</span>
      </div>
      <div>
        <span className={classes.title}>{title}</span>
      </div>
      <div>
        <button
          className={`button is-text ${classes.button}`}
          onClick={onClick}
        >{buttonTitle}
        </button>
      </div>
    </div>
  )
}

export default AccountInfoBlock
