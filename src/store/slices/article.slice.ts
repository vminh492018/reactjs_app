/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IArticle, IArticleFollowingUsersParams, IArticleResponse, IArticleState, IArticlesParams } from '../../models'

export const initialState: IArticleState = {
  tagList: [],
  articles: [],
  articleDetails: null,
  isLoading: false,
  status: {
    articles: 'idle',
    articleDetails: 'idle',
    tagList: 'idle',
    createArticle: 'idle',
    updateArticle: 'idle',
    deleteArticle: 'idle'
  },
  limit: 10,
  total: 0,
  errors: null
}

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    // Set articles
    setArticleFollowingRequest: (state, _action: PayloadAction<IArticleFollowingUsersParams>) => {
      state.status.articles = 'loading'
      state.total = 0
      state.articles = []
      state.errors = null
    },
    setArticlesRequest: (state, _action: PayloadAction<IArticlesParams>) => {
      state.status.articles = 'loading'
      state.total = 0
      state.articles = []
      state.errors = null
    },
    setArticlesSuccess: (state, action: PayloadAction<any>) => {
      state.articles = action.payload.articles
      state.total = action.payload.articlesCount
      state.status.articles = 'idle'
    },
    setArticlesFailure: (state, action: PayloadAction<any>) => {
      state.total = 0
      state.errors = action.payload.errors
      state.status.articles = 'failed'
    },
    // Set article details
    /**Handle get article of click Link*/
    setArticleDetails: (state, action: PayloadAction<IArticle>) => {
      state.articleDetails = action.payload
    },
    setArticleDetailsRequest: (state, _action: PayloadAction<string>) => {
      state.status.articleDetails = 'loading'
      state.errors = null
    },
    setArticleDetailsSuccess: (state, action: PayloadAction<IArticleResponse>) => {
      state.articleDetails = action.payload.article
      state.status.articleDetails = 'idle'
    },
    setArticleDetailsFailure: (state, action: PayloadAction<any>) => {
      state.errors = action.payload
      state.status.articleDetails = 'failed'
    },
    //  Create article
    createArticleRequest: (state, _action: PayloadAction<any>) => {
      state.status.createArticle = 'loading'
      state.errors = null
    },
    createArticleSuccess: (state, action: PayloadAction<any>) => {
      state.articleDetails = action.payload.article
      state.status.createArticle = 'successed'
    },
    createArticleFailure: (state, action: PayloadAction<any>) => {
      state.errors = action.payload.errors
      state.status.createArticle = 'failed'
    },
    // Update article
    updateArticleRequest: (state, _action: PayloadAction<any>) => {
      state.status.updateArticle = 'loading'
      state.errors = null
    },
    updateArticleSuccess: (state, action: PayloadAction<any>) => {
      const index = state.articles.findIndex((e) => e.slug === action.payload.article.slug) // id should be unique.
      if (index !== -1) {
        state.articles[index] = action.payload.article
      }
      if (state.articleDetails?.slug === action.payload.article.slug) {
        state.articleDetails = action.payload.article
      }
      state.status.updateArticle = 'successed'
    },
    updateArticleFailure: (state, action: PayloadAction<any>) => {
      state.errors = action.payload.errors
      state.status.updateArticle = 'failed'
    },
    // Delete article
    deleteArticleRequest: (state, _action: PayloadAction<any>) => {
      state.status.deleteArticle = 'loading'
      state.errors = null
    },
    deleteArticleSuccess: (state, _action: PayloadAction<any>) => {
      state.status.deleteArticle = 'idle'
    },
    deleteArticleFailure: (state, action: PayloadAction<any>) => {
      state.errors = action.payload.errors
      state.status.deleteArticle = 'failed'
    },
    // Reset status Form article
    resetStatusFormArticle: (state) => {
      state.status.createArticle = 'idle'
      state.status.updateArticle = 'idle'
      state.status.deleteArticle = 'idle'
    },

    // Create article favorite
    createArticleFavoriteRequest: (state, action: PayloadAction<string>) => {
      const article: IArticle | undefined = state.articles.find((p) => p.slug === action.payload)
      if (article) {
        article.status = {
          favorite: 'loading'
        }
      }
      if (state.articleDetails?.slug === action.payload) {
        state.articleDetails.status = { favorite: 'loading' }
      }
    },
    createArticleFavoriteSuccess: (state, action: PayloadAction<IArticleResponse>) => {
      const article = state.articles.find((p) => p.slug === action.payload.article.slug)
      if (state.articleDetails?.slug === action.payload.article.slug) {
        state.articleDetails.favorited = action.payload.article.favorited
        state.articleDetails.favoritesCount = action.payload.article.favoritesCount
        state.articleDetails.status = { favorite: 'idle' }
      }
      if (article) {
        article.favorited = action.payload.article.favorited
        article.favoritesCount = action.payload.article.favoritesCount
        article.status.favorite = 'idle'
      }
    },
    createArticleFavoriteFailure: (state, action: PayloadAction<{ slug: string; errors: any }>) => {
      const article = state.articles.find((p) => p.slug === action.payload.slug)
      if (article) {
        article.status.favorite = 'failed'
      }
      if (state.articleDetails?.slug === action.payload.slug) {
        state.articleDetails.status = { favorite: 'failed' }
      }
    },
    // Delete article favorite
    deleteArticleFavoriteRequest: (state, action: PayloadAction<string>) => {
      const article = state.articles.find((p) => p.slug === action.payload)
      if (article) {
        article.status = {
          favorite: 'loading'
        }
      }
      if (state.articleDetails?.slug === action.payload) {
        state.articleDetails.status = { favorite: 'loading' }
      }
    },
    deleteArticleFavoriteSuccess: (state, action: PayloadAction<IArticleResponse>) => {
      const article = state.articles.find((p) => p.slug === action.payload.article.slug)
      if (article) {
        article.favorited = action.payload.article.favorited
        article.favoritesCount = action.payload.article.favoritesCount
        article.status.favorite = 'idle'
      }

      if (state.articleDetails?.slug === action.payload.article.slug) {
        state.articleDetails.favorited = action.payload.article.favorited
        state.articleDetails.favoritesCount = action.payload.article.favoritesCount
        state.articleDetails.status = { favorite: 'idle' }
      }
    },
    deleteArticleFavoriteFailure: (state, action: PayloadAction<{ slug: string; errors: any }>) => {
      const article = state.articles.find((p) => p.slug === action.payload.slug)
      if (article) {
        article.status.favorite = 'failed'
      }
      if (state.articleDetails?.slug === action.payload.slug) {
        state.articleDetails.status = { favorite: 'failed' }
      }
    },
    // Set tags
    setTagsRequest: (state) => {
      state.status.tagList = 'loading'
      state.errors = null
    },
    setTagsSuccess: (state, action: PayloadAction<{ tags: string[] }>) => {
      state.tagList = action.payload.tags
      state.status.tagList = 'idle'
    },
    setTagsFailure: (state, action: PayloadAction<any>) => {
      state.errors = action.payload
      state.status.tagList = 'failed'
    }
  }
})

export const {
  setArticleFollowingRequest,
  setArticlesRequest,
  setArticlesSuccess,
  setArticlesFailure,
  setArticleDetails,
  setArticleDetailsRequest,
  setArticleDetailsSuccess,
  setArticleDetailsFailure,
  createArticleRequest,
  createArticleSuccess,
  createArticleFailure,
  updateArticleRequest,
  updateArticleSuccess,
  updateArticleFailure,
  deleteArticleRequest,
  deleteArticleSuccess,
  deleteArticleFailure,
  resetStatusFormArticle,
  createArticleFavoriteRequest,
  createArticleFavoriteSuccess,
  createArticleFavoriteFailure,
  deleteArticleFavoriteRequest,
  deleteArticleFavoriteSuccess,
  deleteArticleFavoriteFailure,
  setTagsRequest,
  setTagsSuccess,
  setTagsFailure
} = articleSlice.actions

export default articleSlice.reducer
