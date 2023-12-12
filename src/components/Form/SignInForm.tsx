/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { ISignInProps } from '../../models'
import { RootState } from '../../store'
import { loginRequest } from '../../store/slices/auth.slice'
import './SignIn&Up.scss'
import { PiSpinnerBold } from 'react-icons/pi'
import { IonIcon } from '@ionic/react'

const SigInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required.'),
  password: Yup.string().min(8, 'Password must be at least 8 characters long').required('Password is required.')
})

const SignInForm: React.FC<ISignInProps> = ({ loginRequest, status, errors }) => {
  console.log(errors)
  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={SigInSchema}
      onSubmit={({ email, password }) => {
        loginRequest({ email, password })
      }}
    >
      <Form className='form' autoComplete='off'>
        {/* <ErrorMessage name='email'>{(msg) => <div className='error'>{msg}</div>}</ErrorMessage>
        <ErrorMessage name='password'>{(msg) => <div className='error'>{msg}</div>}</ErrorMessage> */}
        <div className='inputbox'>
          <IonIcon icon='mail' className='ion-icon'></IonIcon>
          <Field className='formControl' id='email' name='email' type='email' required />
          <label className='label' htmlFor='email'>
            Email
          </label>
        </div>

        {/*----------------------------------------------------------------------------------------- */}
        <div className='inputbox'>
          <IonIcon className='ion-icon' name='lock-closed'></IonIcon>
          <Field className='formControl' id='password' name='password' type='password' required />
          <label className='label' htmlFor='password'>
            Password
          </label>
        </div>
        {status === 'failed' && errors && <div className='error'>{`Email or Password invalid`}</div>}

        <ErrorMessage name='email'>{(msg) => <div className='error'>{msg}</div>}</ErrorMessage>
        <ErrorMessage name='password'>{(msg) => <div className='error'>{msg}</div>}</ErrorMessage>
        {/*----------------------------------------------------------------------------------------- */}
        <div className='forget'>
          <label className='label' htmlFor=''>
            <input className='checkbox' type='checkbox' />
            Remember me{' '}
          </label>
          <a className='link' href='#'>
            Forget Password
          </a>
        </div>
        {/*----------------------------------------------------------------------------------------- */}
        <button className='submit' disabled={status === 'loading'} type='submit'>
          Log in {status === 'loading' && <PiSpinnerBold className='spinner' />}
        </button>
      </Form>
    </Formik>
  )
}

export default connect(
  (state: RootState) => ({
    status: state.auth.status.login,
    errors: state.auth.errors.login
  }),
  { loginRequest }
)(SignInForm)
