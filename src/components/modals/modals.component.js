import React from 'react';

import { useSelector } from 'react-redux';

import ConfirmationModal from '@components/confirmation-modal/confirmation-modal.component';
import NoAccountsModal from '@components/no-accounts-modal/no-accounts-modal.component';
import SubscriptionModal from '@components/subscription-modal/subscription-modal.component';
import UpdatePaymentModal from '@components/update-payment-modal/update-payment-modal.component';

const Modals = () => {
 const activeModal = useSelector((state) => state.modals.activeModal);

 return (
  <div>
   <ConfirmationModal />
   {activeModal === 'subscription' && <SubscriptionModal />}
   {activeModal === 'update-payment' && <UpdatePaymentModal />}
   {activeModal === 'no-accounts' && <NoAccountsModal />}
  </div>
 );
};

export default Modals;
