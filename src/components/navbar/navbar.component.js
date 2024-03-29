import React, { useState } from 'react';

import { Link, NavLink, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { logout as logoutFn } from '@mutations/auth';
import { setUser } from '@slices/auth';

import AccountSelector from '@components/account-selector/account-selector.component';
import ConfirmationModal2 from '../confirmation-modal-2/confirmation-modal.component';

import useStyles from './navbar.styles';

import NAV_LOGO from '../../assets/images/sipstir_nav_logo.png';

const EmployeeItems = () => {
 return (
  <>
   <AccountSelector />
   <NavLink
    activeClassName="is-active"
    className="navbar-item has-text-weight-bold is-size-6"
    to="/"
   >
    Businesses
   </NavLink>
  </>
 );
};

const AdminItems = () => {
 return (
  <>
   <AccountSelector />
   <NavLink
    className={({ isActive }) =>
     `navbar-item has-text-weight-bold is-size-6${isActive ? ' is-active' : ''}`
    }
    end
    to="/dashboard"
   >
    Overview
   </NavLink>
   <NavLink
    className={({ isActive }) =>
     `navbar-item has-text-weight-bold is-size-6${isActive ? ' is-active' : ''}`
    }
    to="/dashboard/rewards"
   >
    Rewards
   </NavLink>
   <NavLink
    className={({ isActive }) =>
     `navbar-item has-text-weight-bold is-size-6${isActive ? ' is-active' : ''}`
    }
    to="/dashboard/account"
   >
    My Account
   </NavLink>
  </>
 );
};

const Navbar = () => {
 const dispatch = useDispatch();

 const [confirmationIsActive, setConfirmationIsActive] = useState(false);

 const navigate = useNavigate();

 const classes = useStyles();

 const isEmployee = useSelector((state) =>
  state.auth.user?.roles.some((role) => role === 'employee'),
 );

 const { mutate: logout } = useMutation(() => logoutFn(), {
  onSuccess: () => {
   dispatch(setUser(null));
   navigate('/');
   toast.success('You successfully logged out');
  },
 });

 const handleLogout = (e) => {
  e.preventDefault();

  setConfirmationIsActive(true);
 };

 const handleOnClose = () => {
  setConfirmationIsActive(false);
 };

 return (
  <nav aria-label="main navigation" className="navbar" role="navigation">
   <div className="container">
    <div className="navbar-brand">
     <Link className="navbar-item" to="/">
      <img alt="logo" src={NAV_LOGO} />
     </Link>
    </div>

    <div className="navbar-start">
     <div className="navbar-item has-text-white">
      <div className={classes.brandText}>
       <span className="has-text-weight-bold" style={{ fontSize: 21, lineHeight: '22px' }}>
        SipStir
       </span>
       <span className="has-text-weight-bold" style={{ fontSize: 14, lineHeight: '13px' }}>
        For Business
       </span>
      </div>
     </div>
    </div>

    <div className="navbar-end">
     {isEmployee ? <EmployeeItems /> : <AdminItems />}
     <div className="navbar-item">
      <button
       className={`button is-text has-text-weight-bold is-size-6 ${classes.logoutButton}`}
       onClick={handleLogout}
      >
       Logout
      </button>
     </div>
    </div>
   </div>
   <ConfirmationModal2
    action={logout}
    isActive={confirmationIsActive}
    message="Are you sure you want to logout?"
    title="Logout?"
    onClose={handleOnClose}
   />
  </nav>
 );
};

export default Navbar;
