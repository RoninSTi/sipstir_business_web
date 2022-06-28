import React from 'react';
import PropTypes from 'prop-types';

import useStyles from './account-info-block.style';

const AccountInfoBlock = ({ buttonTitle, onClick, subtitle, title }) => {
 const classes = useStyles();

 return (
  <div className={classes.container}>
   <div>
    <span className={classes.subtitle}>{subtitle}</span>
   </div>
   <div>
    <span className={classes.title}>{title}</span>
   </div>
   <div>
    <button className={`button is-text ${classes.button}`} onClick={onClick}>
     {buttonTitle}
    </button>
   </div>
  </div>
 );
};

AccountInfoBlock.propTypes = {
 buttonTitle: PropTypes.string,
 onClick: PropTypes.func,
 subtitle: PropTypes.string,
 title: PropTypes.string,
};

export default AccountInfoBlock;
