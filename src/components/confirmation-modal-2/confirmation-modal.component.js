import React from 'react';
import PropTypes from 'prop-types';

const ConfirmationModal2 = ({ action, isActive, message, onClose, title }) => {
 const handleConfirmation = () => {
  if (action) {
   action();
  }

  onClose();
 };

 const handleOnCancel = () => {
  onClose();
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

ConfirmationModal2.propTypes = {
 action: PropTypes.func,
 isActive: PropTypes.bool,
 message: PropTypes.string,
 onClose: PropTypes.func,
 title: PropTypes.string,
};

export default ConfirmationModal2;
