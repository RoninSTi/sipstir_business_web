import React from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux';
import { SET_MODAL } from '@redux/actions/types';

import { Link } from 'react-router-dom';
import { useDestroyReward } from '@hooks/mutations';

const RewardRow = ({ reward }) => {
 const dispatch = useDispatch();

 const { id, isActive, message, points, redemptionCount, title } = reward;

 const { mutate: destroy, isLoading } = useDestroyReward();

 const handleDeleteReward = () => {
  dispatch({
   type: SET_MODAL,
   payload: {
    activeModal: 'confirmation',
    triggerOnClose: () => destroy({ rewardId: id }),
    title: 'Delete reward?',
    message:
     'This action will permanently delete the reward.  Ensure you have an active reward to pariticipate in our advertising progam.',
   },
  });
 };

 return (
  <tr>
   <td>{title}</td>
   <td>{message}</td>
   <td>{points}</td>
   <td>{redemptionCount}</td>
   <td>{isActive ? 'Active' : 'Inactive'}</td>
   <td>
    <div className="buttons" style={{ justifyContent: 'flex-end' }}>
     <Link className="button is-small" to={`/dashboard/rewards/${id}`}>
      Edit
     </Link>
     <button
      className={`button is-primary is-small${isLoading ? ' is-loading' : ''}`}
      disabled={isActive}
      onClick={handleDeleteReward}
     >
      Delete
     </button>
    </div>
   </td>
  </tr>
 );
};

RewardRow.propTypes = {
 reward: PropTypes.shape({
  id: PropTypes.string,
  isActive: PropTypes.bool,
  message: PropTypes.string,
  points: PropTypes.number,
  redemptionCount: PropTypes.number,
  title: PropTypes.string,
 }),
};

export default RewardRow;
