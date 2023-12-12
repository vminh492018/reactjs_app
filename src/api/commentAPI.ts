import { axiosCustom } from './axiosCustom'
import { CreateArticleComment, DeleteArticleComment, GetArticleComments } from '../models'

export const getArticleComments: GetArticleComments = ({ slug }) => {
  return axiosCustom.get(`/articles/${slug}/comments`)
}

export const createArticleComment: CreateArticleComment = ({ slug, comment }) => {
  return axiosCustom.post(`/articles/${slug}/comments`, { comment })
}

export const deleteArticleComment: DeleteArticleComment = ({ slug, commentId }) => {
  return axiosCustom.delete(`/articles/${slug}/comments/${commentId}`)
}
