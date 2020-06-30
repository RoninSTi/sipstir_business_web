import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { CREATE_REWARD, CREATE_REWARD_UPDATE_FORM } from '@actions/types'
import { createRewardAction } from '@actions/rewards'

import { useHistory } from 'react-router-dom'

import ImageUpload from '@components/image-upload/image-upload.component'

const RewardCreate = () => {
  const dispatch = useDispatch()

  const history = useHistory()

  const { discount, isActive, image, message, name, points, subject } = useSelector(state => state.createReward)
  const token = useSelector(state => state.auth.token)
  const isLoading = useSelector(state => state.ui.isLoading.some(item => item.loadingType === CREATE_REWARD))
  const accountId = useSelector(state => state.account.activeAccount?.id)

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

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(createRewardAction({ accountId, history, token, discount, isActive, image, message, name, points, subject }))
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

  return (
    <div className='card'>
      <div className='card-content'>
        <div className='content'>
          <form onSubmit={handleSubmit}>
            <div className='field'>
              <label className='label'>Name</label>
              <div className='control'>
                <input
                  className='input'
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
                  name='isActive'
                  onChange={handleInputChange}
                  type='checkbox'
                />
                Active
              </label>
            </div>
            <div className='field'>
              <div className='control'>
                <button
                  className={`button is-primary${isLoading ? ' is-loading' : ''}`}
                  type='submit'
                >Create reward
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default RewardCreate
