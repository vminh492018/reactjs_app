/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux'
import { RootState } from '../../store'
import { deleteArticleCommentRequest, setArticleCommentRequest } from '../../store/slices/comment.slice'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { currentUser } from '../../api'
import { IComment, ICommentListProps } from '../../models'
import { timeSince } from '../../utils'
import { AiFillDelete } from 'react-icons/ai'
const CommentList: React.FC<ICommentListProps> = ({
  user,
  setArticleCommentRequest,
  deleteArticleCommentRequest,
  comments
}) => {
  const { slug } = useParams()

  useEffect(() => {
    if (slug) {
      setArticleCommentRequest({ slug })
    }
  }, [])

  return (
    <>
      <h2>List comments</h2>
      <ul>
        {comments.map((comment: IComment) => (
          <li className='eachComment' key={comment.id}>
            <div className='commentAuthor'>
              {comment.author.username} {'-'}{' '}
              <span style={{ color: 'lightgreen' }}>{timeSince(new Date(comment.createdAt))}</span>
              <div className='commentBody'>{comment.body}</div>
            </div>

            {user?.username === comment.author.username && (
              <button
                className='btnDeleteComment'
                disabled={comment.status?.delete === 'loading'}
                onClick={() => slug && deleteArticleCommentRequest({ slug, commentId: comment.id })}
              >
                <AiFillDelete />
              </button>
            )}
          </li>
        ))}
      </ul>
    </>
  )
}

export default connect(
  (state: RootState) => ({
    user: currentUser(),
    comments: state.comment.comments
  }),
  { setArticleCommentRequest, deleteArticleCommentRequest }
)(CommentList)
