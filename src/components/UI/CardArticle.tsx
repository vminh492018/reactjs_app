/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { Link, useNavigate } from 'react-router-dom'
import { IArticleProps } from '../../models'
import { timeSince } from '../../utils'
import { connect } from 'react-redux'
import {
  createArticleFavoriteRequest,
  deleteArticleFavoriteRequest,
  setArticleDetails
} from '../../store/slices/article.slice'
import { currentUser, isAuthenticated } from '../../api'
import { PiSpinnerBold } from 'react-icons/pi'
import { FcDislike, FcLike } from 'react-icons/fc'
import './UI.scss'
const CardArticle: React.FC<IArticleProps> = ({
  user,
  isAuthenticated,
  article,
  setArticleDetails,
  createArticleFavoriteRequest,
  deleteArticleFavoriteRequest
}) => {
  const { slug, title, description, tagList, createdAt, favorited, favoritesCount, author, status } = article
  const navigate = useNavigate()

  const handleFavorite = () => {
    if (!isAuthenticated) {
      console.warn('not authenticated')
      return navigate('/login')
    }

    if (!favorited) {
      createArticleFavoriteRequest(slug)
    } else {
      deleteArticleFavoriteRequest(slug)
    }
  }

  const handleSetArticleDetails = () => {
    setArticleDetails(article)
  }

  return (
    <article className='article'>
      <div className='author'>
        <Link className='link' to={user?.username === author.username ? '/me' : `/${author.username}`}>
          <img className='avatar' src={author.image} alt={author.username} />
          <div className='wrapper'>
            <strong className='name'>{author.username}</strong>
            <time className='time'>{timeSince(new Date(createdAt))}</time>
          </div>
        </Link>
        <button
          className={`favorite ${favorited ? 'remove' : 'styadd'}`}
          onClick={handleFavorite}
          disabled={status?.favorite === 'loading'}
        >
          <span className='count'>{favoritesCount}</span>
          {status?.favorite === 'loading' ? (
            <PiSpinnerBold className='spinner' />
          ) : (
            <span className='icon'>{favorited ? <FcDislike /> : <FcLike />}</span>
          )}
        </button>
      </div>
      <div className='post'>
        <Link onClick={handleSetArticleDetails} to={`/${author.username}/${slug}`}>
          <h3 className='title'>{title}</h3>
        </Link>

        <p className='desc'>{description}</p>

        <div className='tagList'>
          {tagList?.map((tag: string) => (
            <Link className='tag' key={tag} to={`/tags/${tag}`}>
              #{tag}
            </Link>
          ))}
        </div>
      </div>
    </article>
  )
}

export default connect(
  () => ({
    isAuthenticated: isAuthenticated(),
    user: currentUser()
  }),
  {
    setArticleDetails,
    createArticleFavoriteRequest,
    deleteArticleFavoriteRequest
  }
)(CardArticle)
