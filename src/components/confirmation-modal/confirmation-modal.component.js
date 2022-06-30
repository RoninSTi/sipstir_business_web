import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { CLEAR_MODAL } from '../../redux/actions/types';

const ConfirmationModal = () => {
 const dispatch = useDispatch();

 const isActive = useSelector((state) => state.modals.activeModal === 'confirmation');

 const { message, title, dispatchOnClose: action } = useSelector((state) => state.modals);

 const handleConfirmation = () => {
  if (action) {
   //  dispatch(action);
   action();
  }

  dispatch({ type: CLEAR_MODAL });
 };

 const handleOnCancel = () => {
  dispatch({ type: CLEAR_MODAL });
 };

 return (
  <div className={`modal${isActive ? ' is-active' : ''}`}>
   <div className="modal-background" />
   <div className="modal-card">
    <header className="modal-card-head">
     <p className="modal-card-title">{title || 'Are you sure?'}</p>
     <button aria-label="close" className="delete" onClick={handleOnCancel} />
    </header>
    <section className="modal-card-body">
     <span>{message}</span>
    </section>
    <footer className="modal-card-foot">
     <button className="button is-info" onClick={handleConfirmation}>
      Yes
     </button>
     <button className="button" onClick={handleOnCancel}>
      Cancel
     </button>
    </footer>
   </div>
  </div>
 );
};

export default ConfirmationModal;
