/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux'
import { currentUser } from '../../api'
import { Link } from 'react-router-dom'
import { FiLogOut } from 'react-icons/fi'
import './UI.scss'

const Menu: React.FC<any> = ({ user, isActive }) => {
  return (
    <div className={`container menu ${isActive && 'active'}`}>
      <ul className='list'>
        <li className='item'>
          <Link to='/me/settings' className='link'>
            Settings
          </Link>
        </li>
        <li className='item'>
          <Link to='/me' className='linkUser'>
            <strong className='username'>{user?.username}</strong>
          </Link>
        </li>
        <li className='item'>
          <Link to='/me/signout' className='link'>
            <FiLogOut />
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default connect(() => ({
  user: currentUser()
}))(Menu)
