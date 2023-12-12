/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { connect } from 'react-redux'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup'
import { ISignUpProps } from '../../models'
import { RootState } from '../../store'
import { registerRequest } from '../../store/slices/auth.slice'
import { PiSpinnerBold } from 'react-icons/pi'
import './SignIn&Up.scss'
import { IonIcon } from '@ionic/react'

const SignUpSchema = Yup.object().shape({
  username: Yup.string().min(3, 'Username too short!').max(50, 'Username too long!').required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(3, 'Password too short!').max(50, 'Password too long!').required('Password required')
})

const SignUpForm: React.FC<ISignUpProps> = ({ status, registerRequest, errors }) => {
  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: ''
      }}
      validationSchema={SignUpSchema}
      onSubmit={({ username, email, password }) => {
        registerRequest({ username, email, password })
      }}
    >
      <Form className='form' autoComplete='off'>
        <div className='inputbox'>
          <IonIcon icon='person' className='ion-icon'></IonIcon>
          <Field className='formControl' id='username' name='username' type='text' required />
          <label className='label' htmlFor='username'>
            Username
          </label>
          {/* <ErrorMessage name='username'>{(msg) => <div className='error'>{msg}</div>}</ErrorMessage>
          {status === 'failed' && errors?.username && <div className='error}'>{`Username ${errors.username}`}</div>} */}
        </div>
        {/*----------------------------------------------------------------------------------------- */}
        <div className='inputbox'>
          <IonIcon icon='mail' className='ion-icon'></IonIcon>
          <Field className='formControl' id='email' name='email' type='email' required />
          <label className='label' htmlFor='email'>
            Email
          </label>
          {/* {status === 'failed' && errors?.email && <div className='error'>{`Email ${errors.email}`}</div>}
          <ErrorMessage name='email'>{(msg) => <div className='error'>{msg}</div>}</ErrorMessage> */}
        </div>
        {/*----------------------------------------------------------------------------------------- */}
        <div className='inputbox'>
          <IonIcon className='ion-icon' name='lock-closed'></IonIcon>
          <Field className='formControl' id='password' name='password' type='password' required />
          <label className='label' htmlFor='password'>
            Password
          </label>
        </div>
        <ErrorMessage name='username'>{(msg) => <div className='error'>{msg}</div>}</ErrorMessage>
        <ErrorMessage name='email'>{(msg) => <div className='error'>{msg}</div>}</ErrorMessage>
        <ErrorMessage name='password'>{(msg) => <div className='error'>{msg}</div>}</ErrorMessage>

        {status === 'failed' && errors?.username && <div className='error'>{`Username ${errors.username}`}</div>}

        {status === 'failed' && errors?.email && <div className='error'>{`Email ${errors.email}`}</div>}
        {/*----------------------------------------------------------------------------------------- */}
        <button className='submit' disabled={status === 'loading'} type='submit'>
          Sign Up {status === 'loading' && <PiSpinnerBold className='spinner' />}
        </button>
      </Form>
    </Formik>
  )
}

export default connect(
  (state: RootState) => ({
    status: state.auth.status.register,
    errors: state.auth.errors.register
  }),
  { registerRequest }
)(SignUpForm)
