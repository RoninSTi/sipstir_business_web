import React from 'react';
import classnames from 'classnames';
import { Link, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import useStyles from './login.style';

import NAV_LOGO from '../../assets/images/sipstir_nav_logo.png';

const Login = () => {
 const classes = useStyles();

 const [cookies] = useCookies(['logged_in']);

 if (cookies.logged_in) {
  return <Navigate to="/dashboard" />;
 }

 return (
  <section className={classnames(['hero', 'is-primary', 'is-fullheight'])}>
   <div className="hero-body">
    <div className="container">
     <div className={classnames(['columns', 'is-centered'])}>
      <div className={classnames(['column', 'is-5-tablet', 'is-4-desktop', 'is-3-widescreen'])}>
       <div className={classes.loginContainer}>
        <div className={classes.logoContainer}>
         <img alt="logo" className={classes.logo} height={69} src={NAV_LOGO} width={84} />
         <div className={classes.titleContainer}>
          <span className={classes.title}>SipStir</span>
          <span className={classes.subtitle}>For Business</span>
         </div>
        </div>
        <Link
         className={classnames(['button', 'is-info', 'has-text-weight-semibold', 'mb-2'])}
         to="/create"
        >
         Create Account
        </Link>
        <Link
         className={classnames([
          'button',
          'is-primary',
          'is-inverted',
          'has-text-weight-semibold',
          classes.button,
         ])}
         to="/auth"
        >
         Business Login
        </Link>
       </div>
      </div>
     </div>
    </div>
   </div>
  </section>
 );
};

export default Login;
