import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { SET_PRICE } from '@actions/types'

const Products = () => {
  const dispatch = useDispatch()

  const product = useSelector(state => state.product.products[0])
  const selectedPrice = useSelector(state => state.product.selectedPrice)

  if (!product) return null

  const { prices } = product

  const selectPrice = (price) => {
    dispatch({
      type: SET_PRICE,
      payload: price
    })
  }

  return (
    <div className='container'>
      <div className='columns'>
        {prices.map(price => {
          const selected = selectedPrice?.id === price.id

          return (
            <div
              key={price.id}
              className='column'
            >
              <div className='card'>
                <div className='card-content'>
                  <div className='content'>
                    <div>
                      <span>{product.name}</span>
                    </div>
                    <div>
                      <span>{(price.unit_amount / 100).toFixed(2)}</span>
                    </div>
                    <div>
                      <span>{`Billed once per ${price.recurring.interval}`}</span>
                    </div>
                  </div>
                </div>
                <footer className='card-footer'>
                  <div className='card-footer-item'>
                    <button
                      className={`button${selected ? ' is-primary' : ''}`}
                      disabled={selected}
                      onClick={() =>
                        selectPrice(price)}
                    >{selected ? 'Selected' : 'Select'}
                    </button>
                  </div>
                </footer>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Products
