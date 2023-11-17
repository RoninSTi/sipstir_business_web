import React from 'react';

import useStyles from './activity-box.style';

import moment from 'moment';
import { useGetAccounts, useGetActivity } from '../../hooks/queries';

const NoActivity = () => {
 const classes = useStyles();

 return (
  <div className="container">
   <h5 className={`title is-5 ${classes.boxTitle}`}>Activity</h5>
   <h3 className="title is-3">No Activity</h3>
  </div>
 );
};

const ActivityBox = (props) => {
 const classes = useStyles(props);

 const { data: account } = useGetAccounts();

 const { data: activity = [] } = useGetActivity({ accountId: account?.id });

 return activity.length === 0 ? (
  <NoActivity />
 ) : (
  <div className="container">
   <h5 className={`title is-5 ${classes.boxTitle}`}>Activity</h5>
   {activity.map((item, index) => (
    <div key={`activity-${index}`} className="mb-3">
     <span className="has-text-weight-bold">{item.message}</span>
     <br />
     <span>{moment.utc(item.createdAt).local().fromNow()}</span>
    </div>
   ))}
  </div>
 );
};

export default ActivityBox;
