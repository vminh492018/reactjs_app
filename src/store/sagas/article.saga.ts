import { AxiosError, AxiosResponse } from 'axios'
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { GetArticleFollowingUsers, GetArticles, IArticle, IArticleResponse } from '../../models'
import {
  createArticle,
  updateArticle,
  getArticle,
  getArticleFollowingUsers,
  getArticles,
  getTags,
  deleteArticle
} from '../../api/articleAPI'
import {
  createArticleFavoriteRequest,
  createArticleFavoriteSuccess,
  createArticleFavoriteFailure,
  createArticleRequest,
  createArticleSuccess,
  createArticleFailure,
  updateArticleRequest,
  updateArticleSuccess,
  updateArticleFailure,
  deleteArticleRequest,
  deleteArticleSuccess,
  deleteArticleFailure,
  deleteArticleFavoriteRequest,
  deleteArticleFavoriteSuccess,
  deleteArticleFavoriteFailure,
  setArticleFollowingRequest,
  setArticlesRequest,
  setArticlesSuccess,
  setArticlesFailure,
  setArticleDetailsRequest,
  setArticleDetailsSuccess,
  setArticleDetailsFailure,
  setTagsRequest,
  setTagsSuccess,
  setTagsFailure
} from '../slices/article.slice'
import { deleteArticleFavorite, createArticleFavorite } from '../../api/favoriteAPI'

// Actions
function* handleSetArticleFollowing(action: ReturnType<typeof setArticleFollowingRequest>) {
  try {
    const response: AxiosResponse<IArticle[]> = yield call<GetArticleFollowingUsers>(
      getArticleFollowingUsers,
      action.payload
    )

    yield put(setArticlesSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(setArticlesSuccess(response?.data))
  }
}
function* handleSetArticles(action: ReturnType<typeof setArticlesRequest>) {
  try {
    const response: AxiosResponse<{
      articles: IArticle[]
      articlesCount: number
    }> = yield call<GetArticles>(getArticles, action.payload)
    yield put(setArticlesSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(setArticlesFailure(response?.data))
  }
}

function* handleCreateArticleFavorite(action: ReturnType<typeof createArticleFavoriteRequest>) {
  try {
    const response: AxiosResponse<IArticleResponse> = yield call(createArticleFavorite, action.payload)
    yield put(createArticleFavoriteSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(createArticleFavoriteFailure(response?.data))
  }
}

function* handleDeleteArticleFavorite(action: ReturnType<typeof deleteArticleFavoriteRequest>) {
  try {
    const response: AxiosResponse<IArticleResponse> = yield call(deleteArticleFavorite, action.payload)
    yield put(deleteArticleFavoriteSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(
      deleteArticleFavoriteFailure({
        slug: action.payload,
        errors: response?.data
      })
    )
  }
}

function* handleSetArticleDetails(action: ReturnType<typeof setArticleDetailsRequest>) {
  try {
    const response: AxiosResponse<IArticleResponse> = yield call(getArticle, action.payload)
    yield put(setArticleDetailsSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(setArticleDetailsFailure(response?.data))
  }
}

function* handleSetTags() {
  try {
    const response: AxiosResponse<{ tags: string[] }> = yield call(getTags)
    yield put(setTagsSuccess(response.data))
  } catch (error) {
    yield put(setTagsFailure(error))
  }
}

function* handleCreateArticle(action: ReturnType<typeof createArticleRequest>) {
  try {
    const response: AxiosResponse<IArticleResponse> = yield call(createArticle, action.payload)
    yield put(createArticleSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(createArticleFailure(response?.data))
  }
}

function* handleuUdateArticle(action: ReturnType<typeof updateArticleRequest>) {
  try {
    const response: AxiosResponse<IArticleResponse> = yield call(updateArticle, action.payload)
    yield put(updateArticleSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(updateArticleFailure(response?.data))
  }
}

function* handleDeleteArticle(action: ReturnType<typeof deleteArticleRequest>) {
  try {
    const response: AxiosResponse<IArticleResponse> = yield call(deleteArticle, action.payload)
    yield put(deleteArticleSuccess(response.data))
  } catch (error) {
    const { response } = error as AxiosError
    yield put(deleteArticleFailure(response?.data))
  }
}

// Watchers
export function* watchArticle() {
  yield takeLatest(setTagsRequest, handleSetTags)
  yield takeLatest(setArticlesRequest, handleSetArticles)
  yield takeLatest(setArticleFollowingRequest, handleSetArticleFollowing)
  yield takeLatest(createArticleFavoriteRequest, handleCreateArticleFavorite)
  yield takeEvery(deleteArticleFavoriteRequest, handleDeleteArticleFavorite)
  yield takeLatest(setArticleDetailsRequest, handleSetArticleDetails)
  yield takeLatest(createArticleRequest, handleCreateArticle)
  yield takeLatest(updateArticleRequest, handleuUdateArticle)
  yield takeLatest(deleteArticleRequest, handleDeleteArticle)
}
