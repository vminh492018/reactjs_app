import { axiosCustom } from './axiosCustom'
import { IProfile, Profile } from '../models'

export const getProfile: Profile = (username) => {
  return axiosCustom.get<IProfile>(`/profiles/${username}`)
}

export const followUser: Profile = (username) => {
  return axiosCustom.post<IProfile>(`/profiles/${username}/follow`)
}

export const deleteUnfollowUser: Profile = (username) => {
  return axiosCustom.delete<IProfile>(`/profiles/${username}/unfollow`)
}
