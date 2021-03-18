import React, {useRef, useState} from 'react';
import {Link, Redirect} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import ArticleService from '../service/service';
import style from './signUp.module.scss';

const SignUp = () => {

    const users = new ArticleService;
    const [loginned, setLogin] = useState(false);

    const {register, handleSubmit, errors, watch} = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    const onSubmit = (data) => {
        users.registration(data.username, data.email, data.password) 
        .then(() => {
            setLogin(true)
        })   
    } 

    if (loginned) { return  <Redirect to='/sign-in'/> }

    return (
        <div className={style.signIn}>
            <p className={style.title}>Create new account</p>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="username" className={style.label}>Username</label>
                <input placeholder='Username' 
                       className={style.input}
                       name='username'
                       type='text'
                       ref={register({required:true, minLength:3, maxLength:20})}/>
                {errors.username && <p>Must contain from 3 to 20 symbols</p>}

                <label  htmlFor="email" className={style.label}>Email address</label>
                <input  placeholder='Email address' 
                        type='text' 
                        name='email'
                        ref={register({
                         required: "Invalid value",
                         pattern: {
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                           message: "invalid symbols"
                         }
                         })} 
                       className={style.input}/>
                {errors.email && errors.email.message}

                <label htmlFor="password" className={style.label}>Password</label>
                <input placeholder='Password' 
                       className={style.input}
                       type='password' 
                       name='password' 
                       ref={register({required:true, minLength:8})} 
                       />
                {errors.password && <p>Password too short</p>}
                      
                <label htmlFor="password" className={style.label}>Repeat Password</label>
                <input placeholder='Password' 
                       className={style.input}
                       type='password' 
                       name='password_repeat' 
                       ref={register({
                        validate: value =>
                          value === password.current || "The passwords do not match"
                      })} 
                       />
                {errors.password_repeat && <p>{errors.password_repeat.message}</p>}

                <input type='checkbox'/>

                <label htmlFor="checkbox" className={style.checkbox}>  I agree to the processing of my personal 
                        information</label>
                <button type='submit' className={style.loginButton}><span className={style.loginText}>Create</span></button>

            </form>
            <h6 className={style.text}>Already have an account?  <Link><span className={style.signUpButton}>Sign In</span></Link></h6>
        </div>
    )
}

export default SignUp