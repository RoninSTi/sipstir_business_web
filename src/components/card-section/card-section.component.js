import React from 'react'

import { CardElement } from '@stripe/react-stripe-js'

import { useSelector } from 'react-redux'

const CardSection = () => {
  const selectedPrice = useSelector(state => state.product.selectedPrice)

  return (
    <div className='columns'>
      <div className='column'>
        <div className='card'>
          <div className='card-content'>
            <div className='content'>
              <CardElement />
            </div>
          </div>
          <footer className='card-footer'>
            <div className='card-footer-item'>
              <button
                className='button is-primary'
                disabled={!selectedPrice}
                type='submit'
              >Buy subscription
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default CardSection
