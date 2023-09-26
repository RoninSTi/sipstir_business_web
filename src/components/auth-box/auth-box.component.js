import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import LOGO_TEXT from '../../assets/images/logo_text@3x.png';

import useStyles from './auth-box.styles';

const AuthBox = ({ children }) => {
 const classes = useStyles();

 return (
  <section className={classnames('hero', 'is-fullheight', classes.hero)}>
   <div className="hero-body">
    <div className="container">
     <div className={classnames('columns', 'is-centered')}>
      <div className={classnames('column', 'is-one-third')}>
       <div className="box">
        <figure className={classes.logo}>
         <img src={LOGO_TEXT} alt="logo" />
        </figure>
        {children}
        <div className={classnames('has-text-centered', 'mt-4', 'has-text-weight-medium')}>
         Don&rsquo;t have an account?{' '}
         <Link className="has-text-primary" to="/create">
          Sign Up Now
         </Link>
        </div>
        <hr />
        <div className={classnames('has-text-centered', 'mt-4', 'has-text-weight-medium')}>
         Any questions?{' '}
         <Link className="has-text-primary" to="/contact">
          Contact Us
         </Link>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </section>
 );
};

AuthBox.propTypes = {
 children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default AuthBox;
