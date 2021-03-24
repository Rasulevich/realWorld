/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { Alert } from 'antd';
import 'antd/dist/antd.css';
import {Link, Redirect} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import PropTypes from 'prop-types';
import ArticleService from '../service/service';
import style from './signIn.module.scss'

const SignIn = ({ updateUsername}) => {

    const users = new ArticleService;

    const[loginned, setLogin] = useState(false);
    const[error, setError] = useState(false)

    const {register, handleSubmit, errors} = useForm();
    
    const onError = () => {
        setError(true)
    }
    const onSubmit = (data) => {
        users.authentication(data.email, data.password)
             .then((res) => {
                if(Object.prototype.hasOwnProperty.call(res, 'errors') || res === null) {
                    return
                }
                localStorage.setItem('token', res.user.token)
                localStorage.setItem('username', res.user.username)
                setLogin(true) 
                updateUsername()
             })
             .catch(onError())
    };

    if (loginned) { return  <Redirect to='/articles'/> }
    return (
        <div className={style.signIn}>
            <p className={style.title}>Sign In</p>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="email"  className={style.label}>Email address</label>
                <input placeholder='Email address' 
                       type='text' 
                       name='email'
                       ref={register({
                        required: "Invalid value",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "invalid email address"
                        }
                        })}
                        className={style.input}/>
                {errors.email && <p>invalid email address</p>}
                <label htmlFor="password" className={style.label}>Password</label>
                <input placeholder='Password' 
                       type='password' 
                       name='password' 
                       ref={register({required:true, minLength:8})} 
                       className={style.input}/>
                {errors.password && <p>Password too short</p>}
                {error ? <p>email or password is invalid</p> : false}

                <button type='submit' className={style.loginButton}><span className={style.loginText}>Login</span></button>
                
            </form>
            <h6 className={style.text}>Dont have an account? <Link><span className={style.signUpButton}>Sign Up</span></Link></h6>
        </div>
    )
}

SignIn.propTypes = {
    updateUsername:PropTypes.func
}

SignIn.defaultProps = {
    updateUsername:(() =>{})
}

export default SignIn