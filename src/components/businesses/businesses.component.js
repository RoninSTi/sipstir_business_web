import React from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import BusinessRow from '@components/business-row/business-row.component';
import PageHeader from '@components/page-header/page-header.component';

import useStyles from './businesses.style';

const Businesses = () => {
 const classes = useStyles();

 const businesses = useSelector((state) => state.account.businesses);

 return (
  <div>
   <PageHeader title="Businesses" />
   <div className="box">
    <div className="level">
     <div className="level-left">
      <div className="level-item">
       <span className={classes.tableTitle}>Businesses</span>
      </div>
     </div>
     <div className="level-right">
      <div className="level-item">
       <Link className="button is-normal is-info has-text-weight-semibold" to="/accounts/create">
        Add New Business
       </Link>
      </div>
     </div>
    </div>
    <table className="table is-fullwidth">
     <thead>
      <tr>
       <th>Name</th>
       <th>Address</th>
       <th>Email</th>
       <th>Active</th>
       <th width={150}>
        <div>Actions</div>
       </th>
      </tr>
     </thead>
     <tbody>
      {businesses.map((business) => (
       <BusinessRow key={`business-${business.id}`} business={business} />
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default Businesses;
