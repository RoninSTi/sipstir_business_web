import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { SET_MODAL } from '@actions/types';

import moment from 'moment';

import useStyles from './plan-box.style';
import { useGetAccounts, useGetPaymentMethod, useGetSubscription } from '@hooks/queries';
import { useDestroySubscription } from '@hooks/mutations';

const PlanActive = ({ accountId }) => {
 const dispatch = useDispatch();

 const { data: subscription } = useGetSubscription({ accountId });

 const { mutate: destroy, isLoading } = useDestroySubscription();

 const handleOnClickCancel = () => {
  dispatch({
   type: SET_MODAL,
   payload: {
    activeModal: 'confirmation',
    triggerOnClose: () => destroy({ subscriptionId: subscription.id }),
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

PlanActive.propTypes = {
 accountId: PropTypes.number,
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

 const { data: account } = useGetAccounts();

 const { data: paymentMethod } = useGetPaymentMethod({ accountId: account?.id });

 const handleUpdatePaymentMethod = () => {
  dispatch({ type: SET_MODAL, payload: { activeModal: 'update-payment' } });
 };

 return (
  <div className="container">
   <h5 className={`title is-5 ${classes.boxTitle}`}>Plan</h5>
   {account?.isActive ? <PlanActive accountId={account?.id} /> : <PlanInactive />}
   <h5 className={`title is-5 ${classes.boxTitle}`}>Payment Method</h5>
   {paymentMethod && account?.isActive ? (
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
