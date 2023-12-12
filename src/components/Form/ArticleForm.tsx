/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux'
import { RootState } from '../../store'
import {
  createArticleRequest,
  setArticleDetailsRequest,
  updateArticleRequest,
  resetStatusFormArticle
} from '../../store/slices/article.slice'
import { redirect, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import { IArticleFormProps } from '../../models'
import './ArticleForm.scss'
import { IonIcon } from '@ionic/react'

const ArticleForm: React.FC<IArticleFormProps> = ({
  isLoading,
  isActionLoading,
  isActionSuccess,
  status,
  article,
  setArticleDetailsRequest,
  createArticleRequest,
  updateArticleRequest,
  resetStatusFormArticle,
  errors
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { slug } = useParams<string>()
  const lastPath = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
  const [form, setForm] = useState({
    title: (location.pathname !== '/new' && article?.title) || '',
    description: (location.pathname !== '/new' && article?.description) || '',
    tagList: (location.pathname !== '/new' && article?.tagList) || [],
    body: (location.pathname !== '/new' && article?.body) || ''
  })
  const refInput = useRef(null)
  const [currentTag, setCurrentTag] = useState('')
  const [error, setError] = useState({
    title: '',
    description: '',
    tagList: '',
    body: ''
  })
  useEffect(() => {
    if (isActionSuccess) {
      resetStatusFormArticle()

      navigate(`/${article?.author.username}/${article?.slug}`, { replace: true })
    }
    console.log(article)
  }, [isActionSuccess])
  const validate = ({ title, description, body, tagList }: any) => {
    if (!title) {
      setError({ ...error, title: 'Require' })
      return
    }
    if (!description) {
      setError({ ...error, description: 'Require' })
      return
    }
    if (!tagList) {
      setError({ ...error, tagList: 'Require' })
      return
    }
    if (!body) {
      setError({ ...error, body: 'Require' })
      return
    }
    return true
  }
  const handleInput = (tag: string) => {
    if (form.tagList.includes(tag)) {
      setCurrentTag('')
      return
    }
    setForm({ ...form, tagList: form.tagList.concat(tag) })
    setCurrentTag('')
  }
  const submit = ({ title, description, body, tagList }: any) => {
    const isValidated = validate({ title, description, body, tagList })
    if (document.activeElement === refInput.current || !isValidated) return

    if (lastPath === 'new') {
      createArticleRequest({
        article: { title, description, body, tagList }
      })
    }
    if (lastPath === 'edit' && slug) {
      updateArticleRequest({
        slug,
        article: { title, description, body, tagList }
      })
    }

    if (isActionSuccess) {
      console.log('success')
      navigate(-1)
    }
  }

  const clear = (tag: string) => {
    setForm({ ...form, tagList: form.tagList.filter((currentTag) => currentTag !== tag) })
  }
  useEffect(() => {
    if (!article) {
      slug && setArticleDetailsRequest(slug)
    }
  }, [article])

  if (isLoading) {
    return <div style={{ color: 'green' }}>Form Article Loading...</div>
  }

  console.log(status, isActionSuccess, article)

  return (
    <>
      <div className='article-form-wrapper'>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            submit(form)
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              submit(form)
            }
          }}
        >
          <div>
            <input
              name='title'
              type='text'
              placeholder='Article Title'
              value={form.title}
              onChange={(e) => {
                setForm({ ...form, title: e.target.value }), setError({ ...error, title: '' })
              }}
            />
            <div>{error.title}</div>
          </div>
          <div>
            <input
              name='description'
              type='text'
              placeholder="What's this article about?"
              value={form.description}
              onChange={(e) => {
                setForm({ ...form, description: e.target.value }), setError({ ...error, description: '' })
              }}
            />
            <div>{error.description}</div>
          </div>
          <div>
            <input
              ref={refInput}
              name='title'
              type='text'
              placeholder='EnterTag'
              value={currentTag}
              onChange={(e) => {
                setCurrentTag(e.target.value)
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleInput(currentTag)
                }
              }}
            />
            <ul className='tags-list'>
              {form.tagList.map((tag: string) => (
                <li onClick={() => clear(tag)}>
                  {tag} <IonIcon icon='close-outline' className='ion-icon'></IonIcon>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <input
              name='title'
              type='textarea'
              placeholder='Write your article (in mark down)'
              value={form.body}
              onChange={(e) => {
                setForm({ ...form, body: e.target.value }), setError({ ...error, body: '' })
              }}
            />
            <div>{error.body}</div>
          </div>
          <button type='submit'>Publish Article</button>
        </form>
      </div>
    </>
  )
}

export default connect(
  (state: RootState) => ({
    isLoading: state.article.status.articleDetails === 'loading',
    isActionLoading:
      state.article.status.createArticle === 'loading' || state.article.status.updateArticle === 'loading',
    isActionSuccess:
      state.article.status.createArticle === 'successed' || state.article.status.updateArticle === 'successed',
    status: state.article.status,
    article: state.article.articleDetails,
    errors: state.auth.errors
  }),
  { setArticleDetailsRequest, createArticleRequest, updateArticleRequest, resetStatusFormArticle }
)(ArticleForm)
