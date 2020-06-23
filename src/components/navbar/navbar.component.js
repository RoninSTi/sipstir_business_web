import React, { useState } from 'react'

import { NavLink } from 'react-router-dom'

import { useAuth0 } from '@contexts/auth0-context.component'

const Navbar = () => {
  const auth0 = useAuth0()

  const [burgerIsActive, setBurgerIsActive] = useState(false)

  const handleBurger = e => {
    console.log('hey')
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
            height='28'
            src='https://bulma.io/images/bulma-logo.png'
            width='112'
          />
        </a>

        <a
          aria-expanded='false'
          aria-label='menu'
          className={`navbar-burger burger${burgerIsActive ? ' is-active' : ''}`}
          data-target='navbarBasicExample'
          onClick={handleBurger}
          role='button'
        >
          <span aria-hidden='true' />
          <span aria-hidden='true' />
          <span aria-hidden='true' />
        </a>
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

          <a className='navbar-item'>
            Documentation
          </a>

          <div className='navbar-item has-dropdown is-hoverable'>
            <a className='navbar-link'>
              More
            </a>

            <div className='navbar-dropdown'>
              <a className='navbar-item'>
                About
              </a>
              <a className='navbar-item'>
                Jobs
              </a>
              <a className='navbar-item'>
                Contact
              </a>
              <hr className='navbar-divider' />
              <a className='navbar-item'>
                Report an issue
              </a>
            </div>
          </div>
        </div>

        <div className='navbar-end'>
          <div className='navbar-item'>
            <div className='buttons'>
              <a
                className='button is-light'
                onClick={handleLogout}
              >
                Log out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
