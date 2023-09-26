import React from 'react';
import classnames from 'classnames';

import AccountCreate from '@components/account-create/account-create.component';
import useStyles from './create.styles';

const Create = () => {
 const classes = useStyles();

 return (
  <section className={classnames('hero', 'is-fullheight', classes.hero)}>
   <div className="hero-body">
    <div className="container">
     <div className={classnames('columns', 'is-centered')}>
      <div className={classnames('column', 'is-half')}>
       <AccountCreate />
      </div>
     </div>
    </div>
   </div>
  </section>
 );
};

export default Create;
