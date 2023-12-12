/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, LoaderFunction, redirect, useNavigate } from 'react-router-dom'
import { IRegisterProps } from '../../models'
import SignUpForm from '../../components/Form/SignUpForm'
import { clearLogin } from '../../store/slices/auth.slice'
import { isAuthenticated } from '../../api'
import './Register.scss'

export const registerLoader: LoaderFunction = () => {
  if (isAuthenticated()) {
    return redirect('/')
  }
  return null
}

const Register: React.FC<IRegisterProps> = ({ isAuthenticated, clearLogin }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  return (
    <>
      <section>
        <div className='form-box-register'>
          <div className='form-value'>
            <div className='headerForm'>
              <Link to={'/'}>Register</Link>
            </div>
            <SignUpForm />
            <div className='register'>
              <p>
                Already have an account?{' '}
                <Link className='link' onClick={() => clearLogin()} to='/login'>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default connect(
  () => ({
    isAuthenticated: isAuthenticated()
  }),
  { clearLogin }
)(Register)
