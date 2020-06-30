import React, { useState } from 'react'

const MemberInput = ({ isLoading, onAdd }) => {
  const [form, setForm] = useState({
    email: '',
    role: 'user'
  })

  const { email, role } = form

  const handleInputChange = e => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value
    })
  }

  const handleOnClickAdd = () => {
    onAdd({ email, role })

    setForm({
      email: '',
      role: 'user'
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    handleOnClickAdd()
  }

  return (
    <div className='field'>
      <form onSubmit={handleSubmit}>
        <label className='label'>Members</label>
        <div className='field is-horizontal'>
          <div className='field-body'>
            <div className='field has-addons'>
              <div className='control is-expanded'>
                <input
                  className='input'
                  name='email'
                  onChange={handleInputChange}
                  placeholder='e.g. awesome_business@aol.com'
                  type='email'
                  value={email}
                />
              </div>
              <div className='control'>
                <div className='select'>
                  <select
                    name='role'
                    onChange={handleInputChange}
                    value={role}
                  >
                    <option value='user'>User</option>
                    <option value='admin'>Admin</option>
                  </select>
                </div>
              </div>
              <div className='control'>
                <button
                  className={`button is-primary${isLoading ? ' is-loading' : ''}`}
                  type='submit'
                >Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default MemberInput
