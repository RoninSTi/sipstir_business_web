import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import useStyles from './user-management.style';

import MemberInput from '@components/member-input/member-input.component';
import UserRow from '@components/user-row/user-row.component';

import { ADD_USER } from '@redux/actions/types';
import { addUserAction } from '@redux/actions/account';

const UserManagement = (props) => {
 const classes = useStyles(props);

 const dispatch = useDispatch();

 const account = useSelector((state) => state.account.activeAccount);

 const isLoading = useSelector((state) => state.ui.isLoading);

 const token = useSelector((state) => state.auth.token);

 const users = account?.users;

 if (!users) return null;

 const isAdding = isLoading.some((element) => element.loadingType === ADD_USER);

 const handleOnAdd = ({ email, role }) => {
  dispatch(addUserAction({ accountId: account?.id, email, role, token }));
 };

 return (
  <div className="box">
   <div className="level">
    <div className="level-left">
     <div className="level-item">
      <span className={classes.tableTitle}>User Accounts</span>
     </div>
    </div>
   </div>
   <MemberInput isLoading={isAdding} onAdd={handleOnAdd} />
   <div className="table-container">
    <table className="table is-fullwidth">
     <thead>
      <tr>
       <th>Email</th>
       <th>Role</th>
       <th width={150}>Actions</th>
      </tr>
     </thead>
     <tbody>
      {users.map((user) => (
       <UserRow key={`user-${user.id}`} user={user} />
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default UserManagement;
