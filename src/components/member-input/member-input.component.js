import React from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  role: yup.string().required()
})

const MemberInput = ({ isLoading, onAdd }) => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = data => {
    onAdd({ ...data })

    reset()
  }

  return (
    <form
      className='mb-3'
      onSubmit={handleSubmit(onSubmit)}
    >
      <label className='label'>Add New User</label>
      <div className='field is-horizontal'>
        <div className='field-body'>
          <div className='field has-addons'>
            <div className='control is-expanded'>
              <input
                ref={register}
                className='input is-small'
                name='email'
                placeholder='e.g. awesome_business@aol.com'
                type='email'
              />
            </div>
            <div className='control'>
              <div className='select is-small'>
                <select
                  ref={register}
                  defaultValue='admin'
                  name='role'
                >
                  <option value='admin'>Admin</option>
                  <option value='super-admin'>Super Admin</option>
                </select>
              </div>
            </div>
            <div className='control'>
              <button
                className={`button is-small is-info${isLoading ? ' is-loading' : ''}`}
                type='submit'
              >Add
              </button>
            </div>
          </div>
        </div>
      </div>
      {errors.email && <p className='help is-danger'>{errors.email?.message}</p>}
    </form>
  )
}

export default MemberInput
