import { axiosCustom } from './axiosCustom'
import { CreateArticleFavorite } from '../models'

export const createArticleFavorite: CreateArticleFavorite = (slug) => {
  return axiosCustom.post(`/articles/${slug}/favorite`)
}

export const deleteArticleFavorite: CreateArticleFavorite = (slug) => {
  return axiosCustom.delete(`/articles/${slug}/favorite`)
}
