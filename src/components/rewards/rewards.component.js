import React from 'react';

import { Link } from 'react-router-dom';
import { useGetAccounts, useGetRewards } from '@hooks/queries';

import useStyles from './rewards.style';

import NoRewards from '@components/no-rewards/no-rewards.component';
import PageHeader from '@components/page-header/page-header.component';
import RewardRow from '@components/reward-row/reward-row.component';

const Rewards = () => {
 const classes = useStyles();

 const { data: account } = useGetAccounts();

 const accountId = account?.id;

 const getRewards = useGetRewards({ accountId });

 const rewards = getRewards.data || [];

 return (
  <div>
   <PageHeader title="Rewards" />
   <div className="box">
    <div className="level">
     <div className="level-left">
      <div className="level-item">
       <span className={classes.tableTitle}>My Rewards</span>
      </div>
     </div>
     <div className="level-right">
      <div className="level-item">
       <Link
        className="button is-normal is-info has-text-weight-semibold"
        to="/dashboard/rewards/create"
       >
        Add New Reward
       </Link>
      </div>
     </div>
    </div>
    {rewards.length === 0 ? (
     <NoRewards />
    ) : (
     <div className="table-container">
      <table className="table is-fullwidth">
       <thead>
        <tr>
         <th>Title</th>
         <th>Message</th>
         <th>Points</th>
         <th>Redeemed</th>
         <th>Active</th>
         <th width={150}>Actions</th>
        </tr>
       </thead>
       <tbody>
        {rewards.map((reward) => (
         <RewardRow key={`reward-${reward.id}`} reward={reward} />
        ))}
       </tbody>
      </table>
     </div>
    )}
   </div>
  </div>
 );
};

export default Rewards;
