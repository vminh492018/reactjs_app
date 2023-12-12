import { AxiosError, AxiosResponse } from 'axios'
import { GetArticleComments, IComment } from '../../models'
import { deleteArticleComment, getArticleComments, createArticleComment } from '../../api/commentAPI'
import {
  createArticleCommentError,
  createArticleCommentRequest,
  createArticleCommentSuccess,
  deleteArticleCommentError,
  deleteArticleCommentRequest,
  deleteArticleCommentSuccess,
  setArticleCommentError,
  setArticleCommentRequest,
  setArticleCommentSuccess
} from '../slices/comment.slice'
import { call, put, takeLatest } from 'redux-saga/effects'

// Actions
function* handlesSetArticleComments(action: ReturnType<typeof setArticleCommentRequest>) {
  try {
    const response: AxiosResponse<{ comments: IComment[] }> = yield call<GetArticleComments>(
      getArticleComments,
      action.payload
    )
    console.log(response.data)

    yield put(setArticleCommentSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(setArticleCommentError(response?.data))
  }
}

function* handlesCreateArticleComments(action: ReturnType<typeof createArticleCommentRequest>) {
  try {
    const response: AxiosResponse<{ comment: IComment }> = yield call(createArticleComment, {
      slug: action.payload.slug,
      comment: action.payload.comment
    })
    yield put(createArticleCommentSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(createArticleCommentError(response?.data))
  }
}

function* handlesDeleteArticleComments(action: ReturnType<typeof deleteArticleCommentRequest>) {
  try {
    yield call(deleteArticleComment, action.payload)
    yield put(deleteArticleCommentSuccess(action.payload))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(deleteArticleCommentError(response?.data))
  }
}

// Watchers
export function* watchComments() {
  yield takeLatest(setArticleCommentRequest, handlesSetArticleComments)
  yield takeLatest(createArticleCommentRequest, handlesCreateArticleComments)
  yield takeLatest(deleteArticleCommentRequest, handlesDeleteArticleComments)
}
