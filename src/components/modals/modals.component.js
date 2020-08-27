import React from 'react'

import { useSelector } from 'react-redux'

import ConfirmationModal from '@components/confirmation-modal/confirmation-modal.component'
import SubscriptionModal from '@components/subscription-modal/subscription-modal.component'
import UpdatePaymentModal from '@components/update-payment-modal/update-payment-modal.component'

const Modals = () => {
  const activeModal = useSelector(state => state.modals.activeModal)

  return (
    <div>
      <ConfirmationModal />
      {activeModal === 'subscription' && <SubscriptionModal />}
      {activeModal === 'update-payment' && <UpdatePaymentModal />}
    </div>
  )
}

export default Modals
