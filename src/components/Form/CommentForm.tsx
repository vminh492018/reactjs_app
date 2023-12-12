/* eslint-disable react-refresh/only-export-components */
import { Formik, Field, Form, ErrorMessage } from 'formik'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import { RootState } from '../../store'
import { createArticleCommentRequest } from '../../store/slices/comment.slice'
import { useNavigate, useParams } from 'react-router-dom'
import { isAuthenticated } from '../../api'
import { ICommentFormProps } from '../../models'
import './CommentForm.scss'

const CommentSchema = Yup.object().shape({
  comment: Yup.string().min(3, 'Must be at least 3 characters').max(500, 'Must be 500 characters or less')
})

const CommentForm: React.FC<ICommentFormProps> = ({ isAuthenticated, createArticleCommentRequest, status, errors }) => {
  const { slug } = useParams()
  const navigate = useNavigate()
  return (
    <div className='commentForm'>
      <Formik
        initialValues={{ comment: '' }}
        validationSchema={CommentSchema}
        onSubmit={({ comment }) => {
          if (!isAuthenticated) {
            console.warn('not authenticated')
            return navigate('/login')
          }
          console.log(slug, comment, isAuthenticated, errors)
          slug && createArticleCommentRequest({ slug, comment: { body: comment } })
        }}
      >
        <Form className='form'>
          <div className='label'>
            <label htmlFor='comment'>Add a comment:</label>
          </div>
          <div className='inputForm'>
            <Field className='commentText' name='comment' as='textarea' rows='5' cols='50' />
          </div>
          <ErrorMessage name='comment' component='div' />
          <button type='submit' disabled={status === 'loading'}>
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  )
}

export default connect(
  (state: RootState) => ({
    isAuthenticated: isAuthenticated(),
    status: state.comment.status.createComment,
    errors: state.comment.errors
  }),
  { createArticleCommentRequest }
)(CommentForm)
