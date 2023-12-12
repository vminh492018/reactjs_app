/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../store'
import { setArticleFollowingRequest, setArticlesRequest, setTagsRequest } from '../../store/slices/article.slice'
import { Link, LoaderFunction, NavLink, redirect, useLoaderData, useSearchParams } from 'react-router-dom'
import { getPagination } from '../../store/selectors'
import { IArticle, IHomeProps } from '../../models'
import { CardArticle, Pagination } from '../../components/UI'
import { isAuthenticated } from '../../api'
import './Home.scss'
export const homeLoader: LoaderFunction = ({ request }) => {
  const url: URL = new URL(request.url)
  const isFollowing: boolean = url.pathname === '/following'
  if (!isAuthenticated() && isFollowing) {
    return redirect('/login')
  }
  return { isFollowing }
}

const Home: React.FC<IHomeProps> = ({
  isAuthenticated,
  setTagsRequest,
  setArticlesRequest,
  setArticleFollowingRequest,
  isLoadingTags,
  isLoading,
  tagList,
  articles,
  limit,
  total,
  pagination
}): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page: number = Number(searchParams.get('page')) || 1

  const { isFollowing } = useLoaderData() as { isFollowing: boolean }
  useEffect(() => {
    if (tagList.length === 0) {
      setTagsRequest()
    }
  }, [])

  useEffect(() => {
    const offset = (page - 1) * limit

    if (isAuthenticated && isFollowing) {
      setArticleFollowingRequest({
        limit,
        offset
      })
    } else {
      setArticlesRequest({
        limit,
        offset
      })
    }
  }, [isAuthenticated, page, isFollowing])

  return (
    <>
      {isLoadingTags && <div>Tags Loading...</div>}
      {isAuthenticated && (
        <div className='navFeed'>
          <NavLink to='/'>Global feed</NavLink>
          <NavLink to='/following'>Your feed</NavLink>
        </div>
      )}
      <div className='flexHome'>
        <div className='tagsWrapper'>
          <div className='listTags'>
            {' '}
            {tagList?.map((tag: string) => (
              <Link className='link' key={tag} to={`/tags/${tag}`}>
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        <div className='articleWrapper'>
          {isLoading && <div className='message_loading'>Articles Loading...</div>}
          {articles.length <= 0 && !isLoading && <div className='message_loading'>No articles yet</div>}
          {articles?.map((article: IArticle) => <CardArticle key={article.slug} article={article} />)}
        </div>
      </div>

      <Pagination pagination={pagination} total={total} limit={limit} page={page} setSearchParams={setSearchParams} />
    </>
  )
}

export default connect(
  (state: RootState) => ({
    isAuthenticated: isAuthenticated(),
    isLoading: state.article.status.articles === 'loading',
    isLoadingTags: state.article.status.tagList === 'loading',
    tagList: state.article.tagList,
    articles: state.article.articles,
    limit: state.article.limit,
    total: state.article.total,
    pagination: getPagination(state.article)
  }),
  {
    setTagsRequest,
    setArticlesRequest,
    setArticleFollowingRequest
  }
)(Home)
