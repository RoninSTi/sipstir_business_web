import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_MODAL, UPDATE_PAYMENT_METHOD } from '@redux/actions/types';
import { updatePaymentMethodAction } from '@redux/actions/paymentMethod';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

import CardSection from '@components/card-section/card-section.component';

const UpdatePaymentModal = () => {
 const dispatch = useDispatch();

 const stripe = useStripe();

 const elements = useElements();

 const [errors, setErrors] = useState({});

 const isActive = useSelector((state) => state.modals.activeModal === 'update-payment');

 const isLoading = useSelector((state) =>
  state.ui.isLoading.some((element) => element.loadingType === UPDATE_PAYMENT_METHOD),
 );

 const accountId = useSelector((state) => state.account.activeAccount?.id);

 const customerId = useSelector((state) => state.account.activeAccount?.stripeCustomerId);

 const token = useSelector((state) => state.auth.token);

 const handleUpdate = async () => {
  const { error, paymentMethod } = await stripe.createPaymentMethod({
   type: 'card',
   card: elements.getElement(CardElement),
  });

  if (error) {
   setErrors({
    card: {
     message: error.message,
    },
   });

   return;
  }

  dispatch(
   updatePaymentMethodAction({ accountId, customerId, paymentMethodId: paymentMethod.id, token }),
  );

  setErrors({});
 };

 const handleOnCancel = () => {
  dispatch({ type: CLEAR_MODAL });

  setErrors({});
 };

 return (
  <div className={`modal${isActive ? ' is-active' : ''}`}>
   <div className="modal-background" />
   <div className="modal-card">
    <header className="modal-card-head">
     <p className="modal-card-title">Update Payment Method</p>
     <button aria-label="close" className="delete" onClick={handleOnCancel} />
    </header>
    <section className="modal-card-body">
     <CardSection />
     {errors.card && <p className="help is-danger">{errors.card?.message}</p>}
    </section>
    <footer className="modal-card-foot">
     <button className={`button is-info ${isLoading ? ' is-loading' : ''}`} onClick={handleUpdate}>
      Update
     </button>
     <button className="button" onClick={handleOnCancel}>
      Cancel
     </button>
    </footer>
   </div>
  </div>
 );
};

export default UpdatePaymentModal;
