/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { RootState } from '../../store'
import { setArticlesRequest, setTagsRequest } from '../../store/slices/article.slice'
import { CardArticle, Pagination } from '../../components/UI'
import { getPagination } from '../../store/selectors'
import { ITagsProps } from '../../models'
import './Tags.scss'
const Tags: React.FC<ITagsProps> = ({
  setTagsRequest,
  setArticlesRequest,
  isLoadingTags,
  isLoading,
  tagList,
  articles,
  total,
  limit,
  pagination
}) => {
  const { tag } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const page: number = Number(searchParams.get('page')) || 1

  useEffect(() => {
    if (tagList.length === 0) {
      setTagsRequest()
    }
  }, [])

  useEffect(() => {
    console.log(tagList)

    console.log(page)
    const offset = (page - 1) * limit
    setArticlesRequest({ tag, limit, offset })
  }, [tag, page])

  return (
    <div>
      <h1>{tag}</h1>
      {isLoadingTags && <div style={{ color: 'green' }}>Tags Loading...</div>}
      <div className='wraperTagsList'>
        {tagList?.map((tag: string) => (
          <Link className='tagslist' key={tag} to={`/tags/${tag}`}>
            #{tag}
          </Link>
        ))}
      </div>

      {articles.map((article: any) => (
        <CardArticle key={article.slug} article={article} />
      ))}

      {isLoading && <div style={{ color: 'green' }}>Articles Loading...</div>}
      {articles.length <= 0 && !isLoading && <div style={{ color: 'green' }}>No articles yet</div>}

      <Pagination pagination={pagination} total={total} limit={limit} page={page} setSearchParams={setSearchParams} />
    </div>
  )
}

export default connect(
  (state: RootState) => ({
    tagList: state.article.tagList,
    isLoading: state.article.status.articles === 'loading',
    isLoadingTags: state.article.status.tagList === 'loading',
    articles: state.article.articles,
    total: state.article.total,
    limit: state.article.limit,
    pagination: getPagination(state.article)
  }),
  { setTagsRequest, setArticlesRequest }
)(Tags)
