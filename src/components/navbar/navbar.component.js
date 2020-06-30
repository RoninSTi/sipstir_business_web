import React, { useState } from 'react'

import { NavLink } from 'react-router-dom'

import { useAuth0 } from '@contexts/auth0-context.component'

const Navbar = () => {
  const auth0 = useAuth0()

  const [burgerIsActive, setBurgerIsActive] = useState(false)

  const handleBurger = e => {
    e.preventDefault()

    setBurgerIsActive(!burgerIsActive)
  }

  const handleLogout = e => {
    e.preventDefault()

    auth0.logout({ returnTo: window.location.origin })
  }

  return (
    <nav
      aria-label='main navigation'
      className='navbar'
      role='navigation'
    >
      <div className='navbar-brand'>
        <a
          className='navbar-item'
          href='https://bulma.io'
        >
          <img
            alt='logo'
            height='28'
            src='https://bulma.io/images/bulma-logo.png'
            width='112'
          />
        </a>

        <button
          aria-expanded='false'
          aria-label='menu'
          className={`navbar-burger burger${burgerIsActive ? ' is-active' : ''}`}
          data-target='navbarBasicExample'
          onClick={handleBurger}
        >
          <span aria-hidden='true' />
          <span aria-hidden='true' />
          <span aria-hidden='true' />
        </button>
      </div>

      <div
        className={`navbar-menu${burgerIsActive ? ' is-active' : ''}`}
        id='navbarBasicExample'
      >
        <div className='navbar-start'>
          <NavLink
            className='navbar-item'
            to='/accounts'
          >
            Accounts
          </NavLink>
          <NavLink
            className='navbar-item'
            to='/subscription'
          >
            Subscription
          </NavLink>
          <NavLink
            className='navbar-item'
            to='/rewards'
          >
            Rewards
          </NavLink>
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <button
                className='button is-light'
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
