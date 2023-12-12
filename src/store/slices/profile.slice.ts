/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export const initialState = {
  profile: null
}

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<any>) => {},
    followUser: (state, action: PayloadAction<any>) => {},
    unfollowUser: (state, action: PayloadAction<any>) => {}
  }
})

export const { setProfile, followUser, unfollowUser } = profileSlice.actions

export default profileSlice.reducer
