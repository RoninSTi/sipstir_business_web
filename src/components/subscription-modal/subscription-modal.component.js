import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { createSubscriptionAction, getProductsAction } from '@actions/product'
import { CLEAR_MODAL, CREATE_SUBSCRIPTION, SET_PRICE } from '@redux/actions/types'

import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

import useStyles from './subscription-modal.style'

import CardSection from '@components/card-section/card-section.component'

const SubscriptionModal = props => {
  const classes = useStyles(props)

  const dispatch = useDispatch()

  const isActive = useSelector(state => state.modals.activeModal === 'subscription')

  const account = useSelector(state => state.account.activeAccount)

  const stripe = useStripe()

  const elements = useElements()

  const customerId = useSelector(state => state.account.activeAccount?.stripeCustomerId)

  const selectedPrice = useSelector(state => state.product.selectedPrice)

  const token = useSelector(state => state.auth.token)

  const prices = useSelector(state => state.product?.products[0]?.prices)

  const isLoading = useSelector(state => state.ui.isLoading.some(element => element.loadingType === CREATE_SUBSCRIPTION))

  const cardElement = elements?.getElement(CardElement)

  const [errors, setErrors] = useState({})
  const [cardComplete, setCardComplete] = useState(false)

  useEffect(() => {
    if (cardElement) {
      cardElement.on('change', ({ error, complete }) => {
        if (complete) setCardComplete(true)
        if (error) {
          setErrors({
            ...errors,
            card: {
              message: error.message
            }
          })
        } else {
          setErrors({})
        }
      })
    }
  }, [cardElement, setErrors])

  const handleSelectPrice = (price) => {
    dispatch({
      type: SET_PRICE,
      payload: price
    })
  }

  useEffect(() => {
    dispatch(getProductsAction({ token }))
  }, [dispatch, token])

  const handleSubmit = async e => {
    e.preventDefault()

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement)
    })

    if (error) {
      console.log({ error })
      return
    }

    dispatch(createSubscriptionAction({
      accountId: account?.id,
      customerId: customerId,
      paymentMethodId: paymentMethod.id,
      priceId: selectedPrice.id,
      token
    }))
  }

  const handleOnCancel = () => {
    dispatch({ type: CLEAR_MODAL })
  }

  return (
    <div className={`modal${isActive ? ' is-active' : ''}`}>
      <div className='modal-background' />
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title'>Create Subscription</p>
          <button
            aria-label='close'
            className='delete'
            onClick={handleOnCancel}
          />
        </header>
        <section className='modal-card-body'>
          <div className='mb-3'>
            <span className={classes.cardTitle}>Subscription Benefits</span>
          </div>
          <ul className='mb-3'>
            <li>
              <span className='icon has-text-success'>
                <i className='fas fa-check-square' />
              </span>
              Ability to offer rewards to users
            </li>
            <li>
              <span className='icon has-text-success'>
                <i className='fas fa-check-square' />
              </span>
              Reward advertisement to users during the guess process
            </li>
            <li>
              <span className='icon has-text-success'>
                <i className='fas fa-check-square' />
              </span>
              Preferred placement on location search screens
            </li>
          </ul>
          {prices &&
            <div className='container'>
              <div className='columns'>
                <div className='column is-one-half'>
                  <div className='card'>
                    <div className='card-content'>
                      <div className='content'>
                        <span className={classes.offerTitle}>Yearly Renewal <span className='tag is-success'>17% Savings</span></span>
                        <div className={classes.offerText}>$100 / Year</div>
                        <button
                          className={`button is-info${selectedPrice === prices[1] ? ' is-outlined' : ''}`}
                          onClick={() => handleSelectPrice(prices[0])}
                        >Select Yearly
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='column is-one-half'>
                  <div className='card'>
                    <div className='card-content'>
                      <div className='content'>
                        <span className={classes.offerTitle}>Monthly Renewal</span>
                        <div className={classes.offerText}>$10 / Month</div>
                        <button
                          className={`button is-info${selectedPrice === prices[0] ? ' is-outlined' : ''}`}
                          onClick={() => handleSelectPrice(prices[1])}
                        >Select Monthly
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          <CardSection />
          {errors.card && <p className='help is-danger'>{errors.card?.message}</p>}
        </section>
        <footer className='modal-card-foot'>
          <button
            className={`button is-info${isLoading ? ' is-loading' : ''}`}
            disabled={!cardComplete}
            onClick={handleSubmit}
          >Submit
          </button>
          <button
            className='button'
            onClick={handleOnCancel}
          >Cancel
          </button>
        </footer>
      </div>
    </div>
  )
}

export default SubscriptionModal
