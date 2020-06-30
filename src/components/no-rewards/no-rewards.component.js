import React from 'react'

import { Link } from 'react-router-dom'

const NoRewards = () => {
  return (
    <div className='card'>
      <div className='card-content'>
        <div className='content'>
          <Link
            className='button is-primary'
            to='/rewards/create'
          >Create reward
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NoRewards
