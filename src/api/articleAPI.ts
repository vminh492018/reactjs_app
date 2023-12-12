import { axiosCustom } from './axiosCustom'
import {
  CreateArticle,
  DeleteArticle,
  GetArticle,
  GetArticles,
  GetArticleFollowingUsers,
  UpdateArticle
} from '../models'

export const getArticleFollowingUsers: GetArticleFollowingUsers = (params) => {
  return axiosCustom.get('/articles/feed', { params })
}

export const getArticles: GetArticles = (params) => {
  return axiosCustom.get('/articles', { params })
}

export const createArticle: CreateArticle = (article) => {
  return axiosCustom.post('/articles', article)
}

export const getArticle: GetArticle = (slug) => {
  return axiosCustom.get(`/articles/${slug}`)
}

export const updateArticle: UpdateArticle = ({ slug, article }) => {
  return axiosCustom.put(`/articles/${slug}`, { article })
}

export const deleteArticle: DeleteArticle = (slug) => {
  return axiosCustom.delete(`/articles/${slug}`)
}

export const getTags = () => {
  return axiosCustom.get('/tags')
}
