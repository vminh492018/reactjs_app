/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-refresh/only-export-components */
import { useEffect } from 'react'
import { Link, LoaderFunction, redirect, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { ILoginProps } from '../../models'
import SignInForm from '../../components/Form/SignInForm'
import { clearRegister } from '../../store/slices/auth.slice'
import { isAuthenticated } from '../../api'
import './Login.scss'
import { RootState } from '../../store'

export const loginLoader: LoaderFunction = () => {
  if (isAuthenticated()) {
    return redirect('/')
  }
  return null
}

const Login: React.FC<ILoginProps> = ({ isAuthenticated, status, errors, clearRegister }) => {
  const navigate = useNavigate()
  useEffect(() => {
    if (isAuthenticated) navigate('/')
  }, [isAuthenticated])

  return (
    <>
      <section>
        <div className='form-box'>
          <div className='form-value'>
            {/* {status === 'failed' && errors && (
              <div className='errorResponse'>
                <strong className='title'>Unable to login.</strong>
              </div>
            )} */}
            <div className='headerForm'>
              <Link to={'/'}>Login</Link>
            </div>
            {/*--------- Form -----------*/}
            <SignInForm />
            {/*--------- Register ---------*/}
            <div className='register'>
              <p>
                Don't have a account?{' '}
                <Link className='link' onClick={() => clearRegister()} to='/register'>
                  SignUp !
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
  (state: RootState) => ({
    isAuthenticated: isAuthenticated(),
    status: state.auth.status.login,
    errors: state.auth.errors.login
  }),
  { clearRegister }
)(Login)
