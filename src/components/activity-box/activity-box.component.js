import React from 'react';

import { useSelector } from 'react-redux';

import useStyles from './activity-box.style';

import moment from 'moment';

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

 const activity = useSelector((state) => state.account.activity);

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
