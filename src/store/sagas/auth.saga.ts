import { call, put, takeLatest } from 'redux-saga/effects'
import { getCurrentUser, login, register, updateUser } from '../../api/authAPI'
import { IUser, Login, Register } from '../../models'
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  currentUserRequest,
  currentUserSuccess,
  currentUserFailure,
  registerRequest,
  registerSuccess,
  registerFailure,
  updateRequest,
  updateFailure,
  updateSuccess
} from '../slices/auth.slice'
import { AxiosError, AxiosResponse } from 'axios'
import { clearItem } from '../../api'

// Actions
function* handleRegister(action: ReturnType<typeof registerRequest>) {
  try {
    const response: AxiosResponse<{ user: IUser }> = yield call<Register>(register, action.payload)
    const user: IUser = response.data.user
    yield put(registerSuccess(user))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(registerFailure(response?.data))
  }
}

function* handleLogin(action: ReturnType<typeof loginRequest>) {
  try {
    const response: AxiosResponse<{ user: IUser }> = yield call<Login>(login, action.payload)
    const user: IUser = response.data.user
    yield put(loginSuccess(user))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(loginFailure(response?.data))
  }
}

function* handlelogout() {
  clearItem('token')
  yield put(logoutSuccess())
}

function* handleUpdate(action: ReturnType<typeof updateRequest>) {
  try {
    const response: AxiosResponse<{ user: IUser }> = yield call(updateUser, action.payload)
    console.log('action: ', response)
    const user: IUser = response.data.user
    yield put(updateSuccess(user))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(updateFailure(response?.data))
  }
}

export function* handleCurrentUser() {
  try {
    const response: AxiosResponse<{ user: IUser }> = yield call(getCurrentUser)
    const user: IUser = response.data.user

    if (user) {
      yield put(currentUserSuccess(user))
    } else {
      yield put(currentUserFailure({ errors: ['User not found'] }))
    }
  } catch (error) {
    const { response } = error as AxiosError
    yield put(currentUserFailure(response?.data))
  }
}

// Watchers
export function* watchAuth() {
  yield takeLatest(currentUserRequest, handleCurrentUser)
  yield takeLatest(registerRequest, handleRegister)
  yield takeLatest(loginRequest, handleLogin)
  yield takeLatest(updateRequest, handleUpdate)
  yield takeLatest(logoutRequest, handlelogout)
}
