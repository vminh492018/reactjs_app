/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { currentUserRequest, updateRequest } from '../../store/slices/auth.slice'
import { currentUser } from '../../api'
import { IUserSettingProps } from '../../models'
import './UserSettings.scss'

const UserSetting: React.FC<IUserSettingProps> = ({ user, currentUserRequest, updateRequest }): JSX.Element => {
  const [updatedUser, setUpdatedUser] = useState({
    email: user?.email || '',
    password: '',
    username: user?.username || '',
    bio: user?.bio || '',
    image: user?.image || ''
  })

  useEffect(() => {
    if (!user) {
      currentUserRequest()
    }
  }, [])

  useEffect(() => {
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      email: user?.email || '',
      password: '',
      username: user?.username || '',
      bio: user?.bio || '',
      image: user?.image || ''
    }))
  }, [user])
  const handleInputChange = (event: any) => {
    const { name, value } = event.target
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }))
  }

  const handleUpdateClick = () => {
    user && updateRequest({ user: updatedUser })
  }

  return (
    <>
      <div className='User-Setting-wrapper'>
  

      <>
      <div>
        <h3>Your Setting</h3>
        <input placeholder="Avatar Url"type='text' name='image' value={updatedUser.image} onChange={handleInputChange} />
        <input placeholder="Username" type='text' name='username' value={updatedUser.username} onChange={handleInputChange} />
        <textarea placeholder="Short bio about you" name='bio' cols={30} rows={10} value={updatedUser.bio} onChange={handleInputChange}></textarea>
        <input placeholder="Email" type='email' name='email' value={updatedUser.email} onChange={handleInputChange} />
        <input placeholder="New Password" type='text' name='password' value={updatedUser.password} onChange={handleInputChange} />

        <button onClick={handleUpdateClick}>Submit to update</button>
      </div>
      </>
      </div>
    </>
  )
}

export default connect(
  () => ({
    user: currentUser()
  }),
  { currentUserRequest, updateRequest }
)(UserSetting)
