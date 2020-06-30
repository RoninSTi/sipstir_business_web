import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { CREATE_REWARD_UPDATE_FORM, POPULATE_CREATE_REWARD_FORM, UPDATE_REWARD } from '@actions/types'
import { fetchRewardsAction, updateRewardAction } from '@actions/rewards'

import { useParams } from 'react-router-dom'

import ImageUpload from '@components/image-upload/image-upload.component'

const RewardDetail = () => {
  const dispatch = useDispatch()

  const [isEditing, setIsEditing] = useState(false)

  const { rewardId } = useParams()

  const token = useSelector(state => state.auth.token)
  const reward = useSelector(state => state.rewards.rewards.find(reward => reward.id === parseInt(rewardId)))
  const accountId = useSelector(state => state.account.activeAccount?.id)

  useEffect(() => {
    if (!reward) {
      dispatch(fetchRewardsAction({ accountId, token }))
    } else {
      dispatch({ type: POPULATE_CREATE_REWARD_FORM, payload: { ...reward } })
    }
  }, [accountId, dispatch, reward, rewardId, token])

  const isLoading = useSelector(state => state.ui.isLoading.some(item => item.loadingType === UPDATE_REWARD))

  const editReward = useSelector(state => state.createReward)

  if (!reward) return null

  const { discount, isActive, image, message, name, points, subject } = editReward

  const handleInputChange = e => {
    let { name, value } = e.target

    if (name === 'isActive') {
      value = !isActive
    }

    if (name === 'discount' || name === 'points') {
      value = parseInt(value)
    }

    dispatch({ type: CREATE_REWARD_UPDATE_FORM, payload: { name, value } })
  }

  const handleSubmit = () => {
    dispatch(updateRewardAction({
      rewardId: parseInt(rewardId),
      token,
      ...editReward
    }))
  }

  const handleUpload = ({ fileUrl }) => {
    dispatch({
      type: CREATE_REWARD_UPDATE_FORM,
      payload: {
        name: 'image',
        value: `${fileUrl}`
      }
    })
  }

  const handleEditClick = () => {
    if (!isEditing) {
      setIsEditing(true)
    } else {
      handleSubmit()
      setIsEditing(false)
    }
  }

  return (
    <div className='card'>
      <div className='card-header'>
        <div className='card-header-icon'>
          <button
            className={`button${isLoading ? ' is-loading' : ''}`}
            onClick={handleEditClick}
          >{isEditing ? 'Save' : 'Edit'}
          </button>
        </div>
      </div>
      <div className='card-content'>
        <div className='content'>
          <form onSubmit={handleSubmit}>
            <div className='field'>
              <label className='label'>Name</label>
              <div className='control'>
                <input
                  className='input'
                  disabled={!isEditing}
                  name='name'
                  onChange={handleInputChange}
                  placeholder='Reward name'
                  type='text'
                  value={name}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Subject</label>
              <div className='control'>
                <input
                  className='input'
                  disabled={!isEditing}
                  name='subject'
                  onChange={handleInputChange}
                  placeholder='Reward subject'
                  type='text'
                  value={subject}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Message</label>
              <div className='control'>
                <input
                  className='input'
                  disabled={!isEditing}
                  name='message'
                  onChange={handleInputChange}
                  placeholder='Reward message'
                  type='text'
                  value={message}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Points</label>
              <div className='control'>
                <input
                  className='input'
                  disabled={!isEditing}
                  name='points'
                  onChange={handleInputChange}
                  placeholder='Points required for reward'
                  type='number'
                  value={points}
                />
              </div>
            </div>
            <div className='field'>
              <label className='label'>Discount</label>
              <div className='control'>
                <input
                  className='input'
                  disabled={!isEditing}
                  name='discount'
                  onChange={handleInputChange}
                  placeholder='Percentage off bill'
                  type='number'
                  value={discount}
                />
              </div>
            </div>
            <ImageUpload
              label='Reward image'
              onComplete={handleUpload}
            />
            {image &&
              <img
                alt='reward'
                src={image}
              />}
            <div className='field'>
              <label className='checkbox'>
                <input
                  checked={isActive}
                  disabled={!isEditing}
                  name='isActive'
                  onChange={handleInputChange}
                  type='checkbox'
                />
                Active
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RewardDetail
