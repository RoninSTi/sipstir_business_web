import React from 'react'

import { CardElement } from '@stripe/react-stripe-js'

const CardSection = () => {
  return (
    <div className='columns'>
      <div className='column'>
        <div className='card'>
          <div className='card-content'>
            <div className='content'>
              <CardElement />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardSection
