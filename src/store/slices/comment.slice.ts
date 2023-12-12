/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { IComment, ICommentState } from '../../models'

export const initialState: ICommentState = {
  isLoading: false,
  comments: [],
  errors: {
    comment: null,
    createComment: null,
    deleteComment: null
  },
  status: {
    comment: 'idle',
    createComment: 'idle'
  }
}

const comment = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    setArticleCommentRequest: (state, _action: PayloadAction<{ slug: string }>) => {
      console.log(_action.payload.slug)

      state.status.comment = 'loading'
      state.errors.comment = null
    },
    setArticleCommentSuccess: (state, action: PayloadAction<{ comments: IComment[] }>) => {
      state.comments = action.payload.comments
      state.status.comment = 'idle'
    },
    setArticleCommentError: (state, action: PayloadAction<any>) => {
      state.errors.comment = action.payload
      state.status.comment = 'failed'
    },
    createArticleCommentRequest: (
      state,
      _action: PayloadAction<{
        slug: string
        comment: { body: string }
      }>
    ) => {
      state.status.createComment = 'loading'
      state.errors.createComment = null
    },
    createArticleCommentSuccess: (state, action: PayloadAction<{ comment: IComment }>) => {
      state.comments.push(action.payload.comment)
      state.status.createComment = 'idle'
    },
    createArticleCommentError: (state, action: PayloadAction<any>) => {
      state.errors.createComment = action.payload
      state.status.createComment = 'failed'
    },
    deleteArticleCommentRequest: (state, action: PayloadAction<{ slug: string; commentId: string | number }>) => {
      const comment = state.comments.find((comment) => comment.id === action.payload.commentId)
      if (comment) {
        comment.status = { delete: 'loading' }
      }
      state.errors.deleteComment = null
    },
    deleteArticleCommentSuccess: (state, action: PayloadAction<any>) => {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload.commentId)
    },
    deleteArticleCommentError: (state, action: PayloadAction<any>) => {
      state.errors = action.payload
    }
  }
})

export const {
  setArticleCommentRequest,
  setArticleCommentSuccess,
  setArticleCommentError,
  createArticleCommentRequest,
  createArticleCommentSuccess,
  createArticleCommentError,
  deleteArticleCommentRequest,
  deleteArticleCommentSuccess,
  deleteArticleCommentError
} = comment.actions

export default comment.reducer
