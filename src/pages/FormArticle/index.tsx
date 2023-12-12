/* eslint-disable react-refresh/only-export-components */
import { LoaderFunction, redirect } from 'react-router-dom'
import ArticleForm from '../../components/Form/ArticleForm'
import { isAuthenticated } from '../../api'

export const formArticleLoader: LoaderFunction = () => {
  if (!isAuthenticated()) {
    return redirect('/login')
  }
  return null
}

const FormArticle: React.FC = () => {
  return <ArticleForm />
}

export default FormArticle
