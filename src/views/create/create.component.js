import React from 'react';

import AccountCreate from '@components/account-create/account-create.component';

const Create = () => {
 return (
  <section className="section">
   <div className="container">
    <div className="columns">
     <div className="column is-three-fifths">
      <AccountCreate />
     </div>
     <div className="column">
      <div className="block has-text-centered">
       <h1 className="title">Welcome to SipStir</h1>
       <h2 className="subtitle">Start connecting with your patrons in a more meaningful way.</h2>
      </div>
     </div>
    </div>
   </div>
  </section>
 );
};

export default Create;
