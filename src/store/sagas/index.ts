import { all } from 'redux-saga/effects'
import { watchAuth } from '../sagas/auth.saga'
import { watchArticle } from './article.saga'
import { watchComments } from './comment.saga'

export default function* rootSaga() {
  yield all([
    // User
    watchAuth(),
    // Article
    watchArticle(),
    // Comment
    watchComments()
  ])
}
