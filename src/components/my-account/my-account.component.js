import React from 'react';

import AccountBox from '@components/account-box/account-box.component';
import ActivityBox from '@components/activity-box/activity-box.component';
import PageHeader from '@components/page-header/page-header.component';
import PlanBox from '@components/plan-box/plan-box.component';
import ProfileBox from '@components/profile-box/profile-box.component';

// import useStyles from './my-account.style'

const MyAccount = () => {
 return (
  <div>
   <PageHeader title="My Account" />
   <div className="tile is-ancestor">
    <div className="tile is-parent is-6 is-vertical">
     <div className="tile is-child">
      <div className="box">
       <AccountBox />
      </div>
     </div>
     <div className="tile is-child">
      <div className="box">
       <PlanBox />
      </div>
     </div>
    </div>
    <div className="tile is-parent is-6 is-vertical">
     <div className="tile is-child">
      <div className="box">
       <ProfileBox />
      </div>
     </div>
     <div className="tile is-child">
      <div className="box">
       <ActivityBox />
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default MyAccount;
