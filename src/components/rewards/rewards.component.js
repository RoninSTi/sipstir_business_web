import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchRewardsAction } from '@actions/rewards'
import { CREATE_REWARD_RESET } from '@actions/types'

import { Link, useHistory } from 'react-router-dom'

import NoRewards from '@components/no-rewards/no-rewards.component'

const Rewards = () => {
  const dispatch = useDispatch()

  const history = useHistory()

  const accountId = useSelector(state => state.account.activeAccount?.id)
  const rewards = useSelector(state => state.rewards.rewards)
  const token = useSelector(state => state.auth.token)

  useEffect(() => {
    dispatch({ type: CREATE_REWARD_RESET })
  })

  useEffect(() => {
    if (accountId) {
      dispatch(fetchRewardsAction({ accountId, token }))
    }
  }, [accountId, dispatch, token])

  if (rewards.length === 0) return <NoRewards />

  const handleRowClick = rewardId => {
    history.push(`/rewards/${rewardId}`)
  }

  return (
    <div>
      <div className='container'>
        <Link
          className='button is-primary'
          to='/rewards/create'
        >
          Create reward
        </Link>
      </div>
      <div className='table-container'>
        <table className='table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Points</th>
              <th>Discount</th>
              <th>Image</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>
            {rewards.map(reward => (
              <tr
                key={reward.id}
                onClick={() => handleRowClick(reward.id)}
                style={{ cursor: 'pointer' }}
              >
                <td>{reward.name}</td>
                <td>{reward.subject}</td>
                <td>{reward.message}</td>
                <td>{reward.points}</td>
                <td>{reward.discount}</td>
                <td>
                  <img
                    alt='reward'
                    src={`${reward.image}`}
                  />
                </td>
                <td>{`${reward.isActive}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}

export default Rewards
