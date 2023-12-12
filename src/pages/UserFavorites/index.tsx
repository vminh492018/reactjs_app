/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useSearchParams, useLocation, useParams } from 'react-router-dom'
import { RootState } from '../../store'
import { currentUserRequest } from '../../store/slices/auth.slice'
import { setArticlesRequest } from '../../store/slices/article.slice'
import { IArticle, IUserDetailsProps } from '../../models'
import { currentUser } from '../../api'
import { CardArticle, Pagination } from '../../components/UI'
import { getPagination } from '../../store/selectors'
import './UserFavorites.scss'
import { IonIcon } from '@ionic/react'
const UserFavorites: React.FC<IUserDetailsProps> = ({
  user,
  articles,
  currentUserRequest,
  setArticlesRequest,
  total,
  limit,
  pagination
}): JSX.Element => {
  const { username } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const page: number = Number(searchParams.get('page')) || 1
  const location = useLocation()

  useEffect(() => {
    if (!user) {
      currentUserRequest()
    }
    console.log(user?.username)
  }, [])

  useEffect(() => {
    // Assuming setArticlesRequest requires parameters like author or tags
    // Modify this accordingly based on your API requirements

    const offset = (page - 1) * limit

    const favorited = username || user?.username

    setArticlesRequest({ favorited, limit, offset })
  }, [user?.username, page])

  return (
    <>
      <div className='UserFavorites-wrapper'>
        <div className='user-detail'>
          <Link to='/me/settings'>
            <IonIcon icon='settings-outline' className='ion-icon' />
            Setting
          </Link>

          <img src={user?.image} alt='' />
          <p>{user?.username}</p>
        </div>
        <div className='tabs'>
          <ul>
            <li>
              <Link className={location.pathname === '/me' ? 'active' : ''} to={'/me'}>
                My Articles
              </Link>
            </li>
            <li>
              <Link className={location.pathname === '/me/favorites' ? 'active' : ''} to={'/me/favorites'}>
                My Favorites
              </Link>
            </li>
          </ul>
        </div>
        <ul className='content'>
          {articles ? (
            articles.map((article: IArticle) => (
              <li key={article.slug}>
                {article.author ? <CardArticle article={article} /> : <p>No author information available</p>}
              </li>
            ))
          ) : (
            <li>No articles available</li>
          )}
          <Pagination
            pagination={pagination}
            total={total}
            limit={limit}
            page={page}
            setSearchParams={setSearchParams}
          />
        </ul>
      </div>
    </>
  )
}

export default connect(
  (state: RootState) => ({
    user: currentUser(),
    articles: state.article.articles,
    total: state.article.total,
    limit: state.article.limit,
    pagination: getPagination(state.article)
  }),
  { currentUserRequest, setArticlesRequest }
)(UserFavorites)
