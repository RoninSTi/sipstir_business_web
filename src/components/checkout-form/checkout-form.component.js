import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { createSubscriptionAction, getProductsAction } from '@actions/product'

import {
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'

import Products from '@components/products/products.component'
import CardSection from '@components/card-section/card-section.component'

const CheckoutForm = () => {
  const dispatch = useDispatch()

  const stripe = useStripe()

  const elements = useElements()

  const customerId = useSelector(state => state.account.activeAccount?.stripeCustomerId)
  const selectedPrice = useSelector(state => state.product.selectedPrice)
  const token = useSelector(state => state.auth.token)

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
      customerId: customerId,
      paymentMethodId: paymentMethod.id,
      priceId: selectedPrice.id,
      token
    }))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Products />
        <CardSection />
      </form>
    </div>
  )
}

export default CheckoutForm

