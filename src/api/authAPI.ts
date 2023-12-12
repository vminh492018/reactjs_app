import { IUser, IUserInfo, Register, Login, GetCurrentUser, UpdateUser } from '../models'
import { axiosCustom } from './axiosCustom'

export const login: Login = ({ email, password }) => {
  return axiosCustom.post<IUser>('/users/login', {
    user: {
      email,
      password
    }
  })
}

export const register: Register = ({ username, email, password }) => {
  return axiosCustom.post<IUser>('/users', {
    user: {
      username,
      email,
      password
    }
  })
}

export const getCurrentUser: GetCurrentUser = () => {
  return axiosCustom.get<IUser>('/user')
}

export const updateUser: UpdateUser = ({ user }) => {
  return axiosCustom.put<IUserInfo>('/user', {
    user
  })
}
