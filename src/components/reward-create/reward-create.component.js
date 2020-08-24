import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { CREATE_REWARD } from '@actions/types'
import { createRewardAction, updateRewardAction } from '@actions/rewards'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

import { Link, useParams } from 'react-router-dom'

import PageHeader from '@components/page-header/page-header.component'
import { UPDATE_REWARD } from '../../redux/actions/types'

const schema = yup.object().shape({
  isActive: yup.boolean().required(),
  message: yup.string().required(),
  points: yup.number().required(),
  title: yup.string().required()
})

const AccountCreate = () => {
  const dispatch = useDispatch()

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema)
  })

  const { rewardId } = useParams()

  const reward = useSelector(state => state.rewards.rewards.find(rwd => rwd.id === parseInt(rewardId)))

  useEffect(() => {
    if (reward) {
      Object.keys(reward).forEach(key => {
        setValue(key, reward[key], {
          shouldValidate: true,
          shouldDirty: true
        })
      })
    }
  }, [reward, setValue])

  const isLoading = useSelector(state => state.ui.isLoading.some(item => item.loadingType === CREATE_REWARD || item.loadingType === UPDATE_REWARD))

  const token = useSelector(state => state.auth.token)

  const accountId = useSelector(state => state.account.activeAccount?.id)

  const onSubmit = data => {
    const action = reward ? updateRewardAction({ ...data, rewardId, token }) : createRewardAction({ accountId, ...data, token })
    dispatch(action)
  }

  return (
    <div>
      <PageHeader title={`${reward ? 'Update' : 'Add'} New Reward`} />
      <div className='box'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='field'>
            <label className='label'>Title</label>
            <div className='control'>
              <input
                ref={register}
                className='input'
                name='title'
                placeholder='10% off your next bill'
                type='text'
              />
            </div>
            {errors.title && <p className='help is-danger'>{errors.title?.message}</p>}
          </div>
          <div className='field'>
            <label className='label'>Message</label>
            <div className='control'>
              <input
                ref={register}
                className='input'
                name='message'
                placeholder='Offer for a limited time only!'
                type='text'
              />
            </div>
            {errors.message && <p className='help is-danger'>{errors.message?.message}</p>}
          </div>
          <div className='field'>
            <label className='label'>Points</label>
            <div className='control'>
              <input
                ref={register}
                className='input'
                defaultValue={100}
                name='points'
                type='number'
              />
            </div>
            {errors.points && <p className='help is-danger'>{errors.points?.message}</p>}
          </div>
          <div className='field'>
            <label className='checkbox'>
              <input
                ref={register}
                className='mr-2'
                defaultValue
                name='isActive'
                type='checkbox'
              />
              Activate
            </label>
            {errors.isActive && <p className='help is-danger'>{errors.isActive?.message}</p>}
          </div>
          <div className='field'>
            <div className='buttons mt-2'>
              <Link
                className='button'
                to='/rewards'
              >Cancel
              </Link>
              <button
                className={`button is-info${isLoading ? ' is-loading' : ''}`}
                type='submit'
              >Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>

  )
}

export default AccountCreate
