/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { IHeaderProps } from '../../models'
import { currentUser, isAuthenticated } from '../../api'
import { currentUserRequest } from '../../store/slices/auth.slice'
import { Menu } from '../UI'

// import './Layouts.scss'

const Header: React.FC<IHeaderProps> = ({ isAuthenticated, currentUserRequest, user }) => {
  const [isActive, setActive] = useState(false)
  useEffect(() => {
    if (isAuthenticated && !user) {
      currentUserRequest()
    }
  }, [])

  const handleToggleMenu = (event: React.MouseEvent) => {
    event.preventDefault()
    setActive(!isActive)
  }

  return (
    <header>
      <Link className='logo' to='/' aria-label='logo'>
        Logo
      </Link>
      <div className='navigation'>
        {isAuthenticated ? (
          // Before login
          <div className='navigationItem'>
            <Link className='navLink button' to='/new'>
              New Article
            </Link>
            <Link className='navLink' onClick={handleToggleMenu} to='/me'>
              <div className='avatarWrapper'>
                <span style={{ backgroundImage: `url(${user?.image})` }} className='avatar'></span>
              </div>
            </Link>
            <Menu isActive={isActive} />
          </div>
        ) : (
          // After login
          <>
            <div className='navigationItem'>
              <Link className='navLink register' to='/register'>
                Register
              </Link>
              <Link className='navLink login' to='/login'>
                Login
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  )
}

export default connect(
  () => ({
    isAuthenticated: isAuthenticated(),
    user: currentUser()
  }),
  { currentUserRequest }
)(Header)
