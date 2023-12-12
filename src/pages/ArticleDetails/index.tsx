/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { deleteArticleRequest, setArticleDetailsRequest } from '../../store/slices/article.slice'
import { IArticleDetailsProps } from '../../models'
import { Comments } from '../../components/UI'
import { currentUser, isAuthenticated } from '../../api'
import './ArticleDetails.scss'
import { FcLike } from 'react-icons/fc'
import { timeSince } from '../../utils'
const ArticleDetails: React.FC<IArticleDetailsProps> = ({
  isLoading,
  isDeleted,
  isAuthenticated,
  user,
  article,
  setArticleDetailsRequest,
  deleteArticleRequest,
  errors
}) => {
  const navigate = useNavigate()
  const { slug, author } = useParams()
  useEffect(() => {
    if (slug) {
      setArticleDetailsRequest(slug)
    }
  }, [])

  useEffect(() => {
    if (article?.author) {
      if (article?.author?.username !== author) {
        console.warn('Warning!')
      }
    }
  }, [article?.author.username])

  if (isLoading) {
    return <div style={{ color: 'green' }}>Loading...</div>
  }

  const handleDeleteArticle = () => {
    deleteArticleRequest(slug)
    if (isDeleted) {
      navigate('/')
    }
  }

  return (
    article && (
      <div className='articleDetail'>
        <div className='articleAuthor'>
          <Link className='link' to={author === user?.username ? '/me' : `/${author}`}>
            <img className='avatar' src={article.author.image} alt={article.author.username} />
            <strong>{article.author.username}</strong>
            <time className='time'>{timeSince(new Date(article.createdAt))}</time>
          </Link>
          <p>
            {' '}
            <span className='icon'>
              <FcLike />
            </span>
            {article.favoritesCount}
          </p>
        </div>
        <div>
          <h1>{article.title}</h1>
          <p style={{ whiteSpace: 'pre-line', color: 'lightgrey' }}>{article.body.replace(/(\\n)/g, '\n')}</p>
        </div>
        <div className='tagListArticle'>
          {article.tagList?.map((tag: string) => (
            <Link key={tag} to={`/tags/${tag}`}>
              #{tag}
            </Link>
          ))}
        </div>
        {isAuthenticated && author === user?.username && article.author.username === user?.username && (
          <div className='editArticle'>
            <div className='editBtn'>
              <Link to={`/${slug}/edit`}>Edit</Link>
            </div>

            <div>
              <button className='deleteBtn' onClick={handleDeleteArticle}>
                Delete
              </button>
            </div>
          </div>
        )}
        <div>
          <Comments />
        </div>
      </div>
    )
  )
}

export default connect(
  (state: RootState) => ({
    isAuthenticated: isAuthenticated(),
    isLoading: state.article.status.articleDetails === 'loading',
    isDeleted: state.article.status.deleteArticle === 'idle',
    user: currentUser(),
    article: state.article.articleDetails,
    errors: state.article.errors
  }),
  {
    setArticleDetailsRequest,
    deleteArticleRequest
  }
)(ArticleDetails)
