import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { CANCEL_SUBSCRIPTION, SET_MODAL } from '@actions/types';
import { cancelSubscriptionAction } from '@actions/subscription';

import moment from 'moment';

import useStyles from './plan-box.style';

const PlanActive = () => {
 const dispatch = useDispatch();

 const subscription = useSelector((state) => state.subscription.subscription);

 const isLoading = useSelector((state) =>
  state.ui.isLoading.some((element) => element.loadingType === CANCEL_SUBSCRIPTION),
 );

 const token = useSelector((state) => state.auth.token);

 const handleOnClickCancel = () => {
  dispatch({
   type: SET_MODAL,
   payload: {
    activeModal: 'confirmation',
    dispatchOnClose: cancelSubscriptionAction({ subscriptionId: subscription.id, token }),
    message: 'You will no longer have access to the subscriber perks.',
    title: 'Cancel Subscription?',
   },
  });
 };

 return (
  <div className="mb-5">
   <span className="has-text-weight-bold has-text-success is-size-4">Plan Active</span>
   <br />
   <span className="has-text-weight-semibold">{`Auto renews ${moment(
    subscription?.currentPeriodEnd * 1000,
   ).format('MMMM DD, YYYY')}`}</span>
   <br />
   <button
    className={`button is-primary mt-5${isLoading ? ' is-loading' : ''}`}
    onClick={handleOnClickCancel}
   >
    Cancel Subscription
   </button>
  </div>
 );
};

const PlanInactive = () => {
 const dispatch = useDispatch();

 const handleOnClick = () => {
  dispatch({
   type: SET_MODAL,
   payload: {
    activeModal: 'subscription',
   },
  });
 };

 return (
  <div className="mb-5">
   <span className="has-text-weight-bold has-text-primary is-size-4">Plan Inactive</span>
   <br />
   <button className="button is-info mt-4" onClick={handleOnClick}>
    Start Subscription
   </button>
  </div>
 );
};

const PlanBox = (props) => {
 const classes = useStyles(props);

 const dispatch = useDispatch();

 const account = useSelector((state) => state.account.activeAccount);

 const paymentMethod = useSelector((state) => state.paymentMethod?.paymentMethod);

 const handleUpdatePaymentMethod = () => {
  dispatch({ type: SET_MODAL, payload: { activeModal: 'update-payment' } });
 };

 return (
  <div className="container">
   <h5 className={`title is-5 ${classes.boxTitle}`}>Plan</h5>
   {account?.isActive ? <PlanActive /> : <PlanInactive />}
   <h5 className={`title is-5 ${classes.boxTitle}`}>Payment Method</h5>
   {paymentMethod ? (
    <div>
     <span className="has-text-weight-semibold is-size-5">{`${paymentMethod?.brand
      .charAt(0)
      .toUpperCase()}${paymentMethod?.brand.slice(1)}`}</span>
     <br />
     <span>{paymentMethod?.last4}</span>
     <br />
     <span>{`Expires ${paymentMethod?.expMonth}/${paymentMethod?.expYear}`}</span>
     <br />
     <button className="button is-info mt-5" onClick={handleUpdatePaymentMethod}>
      Update
     </button>
    </div>
   ) : (
    <span>No subscription purchased</span>
   )}
  </div>
 );
};

export default PlanBox;
