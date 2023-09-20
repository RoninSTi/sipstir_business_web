import React from 'react';

import AccountInfoBlock from '@components/account-info-block/account-info-block.component';
import GooglePhoto from '@components/google-photo/google-photo.component';
import NoAccount from '@components/no-account/no-account.component';

import useStyles from './account-info.style';
import { useGetAccounts, useGetRewards } from '@hooks/queries';
import { useNavigate } from 'react-router-dom';

const AccountInfo = () => {
 const classes = useStyles();

 const getAccounts = useGetAccounts();

 const account = getAccounts.data?.[0];

 const getRewards = useGetRewards({ accountId: account?.id });

 const numRewards = getRewards.data?.length;

 const navigate = useNavigate();

 const handleOnClickRewards = () => {
  navigate('/dashboard/rewards');
 };

 // const handleOnClickPlan = () => {
 //   dispatch({ type: SET_REDIRECT, payload: '/subscription' })
 // }

 return account ? (
  <div className={`box ${classes.box}`}>
   <div className="container">
    <div className="columns is-gapless">
     <div className={`column is-one-quarter ${classes.column}`}>
      {account?.image ? (
       <img
        alt="business"
        className={classes.accountImage}
        src={`${account.image}?w=200&h=200&fit=crop`}
       />
      ) : (
       <GooglePhoto
        // eslint-disable-next-line camelcase
        photoreference={account?.location?.photo?.photo_reference}
        size={200}
       />
      )}
     </div>
     <div className={`column ${classes.column}`}>
      <div className={classes.info}>
       <div className={classes.infoSubtitle}>
        <span>{account?.name || 'Account name'}</span>
       </div>
       <div>
        <span className={classes.infoTitle}>{account?.location?.name || 'Location name'}</span>
        <br />
        <span className={classes.infoVicinity}>
         {account?.location?.vicinity || 'Location vicinity'}
        </span>
        <br />
       </div>
      </div>
     </div>
     <div className={`column is-two-fifths ${classes.column}`}>
      <div className={classes.blockContainer}>
       <AccountInfoBlock
        buttonTitle="Manage"
        onClick={handleOnClickRewards}
        subtitle="Rewards"
        title={`${numRewards}`}
       />
       {/* <AccountInfoBlock
                buttonTitle='Manage'
                onClick={handleOnClickPlan}
                subtitle='Payment Method'
                title='Visa'
              /> */}
      </div>
     </div>
    </div>
   </div>
  </div>
 ) : (
  <NoAccount />
 );
};

export default AccountInfo;
