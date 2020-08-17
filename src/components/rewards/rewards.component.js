import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { deleteRewardAction } from '@redux/actions/rewards'
import { DELETE_REWARD } from '@redux/actions/types'

import { Link } from 'react-router-dom'

import useStyles from './rewards.style'

import NoRewards from '@components/no-rewards/no-rewards.component'
import PageHeader from '@components/page-header/page-header.component'

const Rewards = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const isLoading = useSelector(state => state.ui.isLoading)

  const rewards = useSelector(state => state.rewards.rewards)

  const token = useSelector(state => state.auth.token)

  const handleDeleteReward = rewardId => {
    dispatch(deleteRewardAction({ rewardId, token }))
  }

  return (
    <div>
      <PageHeader title='Rewards' />
      <div className='box'>
        <div className='level'>
          <div className='level-left'>
            <div className='level-item'>
              <span className={classes.tableTitle}>My Rewards</span>
            </div>
          </div>
          <div className='level-right'>
            <div className='level-item'>
              <Link
                className='button is-normal is-info has-text-weight-semibold'
                to='/rewards/create'
              >Add New Reward
              </Link>
            </div>
          </div>
        </div>
        {rewards.length === 0 ? <NoRewards /> : (
          <div className='table-container'>
            <table className='table is-fullwidth'>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Message</th>
                  <th>Points</th>
                  <th>Active</th>
                  <th width={150}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rewards.map(reward => {
                  const isDeleting = isLoading.some(element => element.loadingType === DELETE_REWARD && element.meta === reward.id)
                  return (
                    <tr key={`reward-${reward.id}`}>
                      <td>{reward.title}</td>
                      <td>{reward.message}</td>
                      <td>{reward.points}</td>
                      <td>{reward.isActive ? 'Active' : 'Inactive'}</td>
                      <td>
                        <div
                          className='buttons'
                          style={{ justifyContent: 'flex-end' }}
                        >
                          <Link
                            className='button is-small'
                            to={`/rewards/${reward.id}`}
                          >Edit
                          </Link>
                          <button
                            className={`button is-primary is-small${isDeleting ? ' is-loading' : ''}`}
                            disabled={reward.isActive}
                            onClick={() => handleDeleteReward(reward.id)}
                          >Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>)}
      </div>
    </div>

  )
}

export default Rewards
