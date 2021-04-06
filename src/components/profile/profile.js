import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import ArticleService from '../service/service';
import style from './profile.module.scss'

const Profile = ({updateUsername}) => {
    
    const profile = new ArticleService();

    const {register, handleSubmit, errors} = useForm();
    const [loginned, setLogin] = useState(false);
    const[buttonDisable, setButtonDisable] = useState(false);

    const onSubmit = (data) => {
        setButtonDisable(true)
        profile.editProfile(data.username, data.email, data.password, data.image).then(()=>{
            localStorage.setItem('username', data.username)
            updateUsername()
            setLogin(true)
        })   
    } 

    if (loginned) { return  <Redirect to='/articles'/> }

    return (
        <div className={style.signIn}>
            <p className={style.title}>Edit Profile</p>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label htmlFor="username" className={style.label}>Username</label>
                <input placeholder='Username' 
                       className={style.input}
                       name='username'
                       type='text'
                       ref={register({required:true, minLength:2})}
                       />
                {errors.username && <p className={style.errors}>Must contain from 2 to 20 symbols</p>}

                <label htmlFor="email" className={style.label}>Email address</label>
                <input placeholder='Email address' 
                       className={style.input}
                       type='text' 
                        name='email'
                        ref={register({
                         required: true,
                         pattern: {
                           value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                           message: "invalid symbols"
                         }
                         })} 
                       />
                {errors.email && <p className={style.errors}>Invalid symbols</p>}
                
                <label htmlFor="New password" className={style.label}>New password</label>
                <input placeholder='Password' 
                       className={style.input}
                       type='password' 
                       name='password' 
                       ref={register({required:true, minLength:8})} 
                       />
                {errors.password && <p className={style.errors}>Password too short</p>}
               
                <label htmlFor="Avatar image" className={style.label}>Avatar image (url)</label>
                <input placeholder='Avatar image' 
                       className={style.input}
                       type='text'
                       name='image'
                       ref={register}
                       />            
                <button type='submit' disabled={buttonDisable} className={style.loginButton}><span className={style.loginText}>Save</span></button>

            </form>
        </div>
    )
}


Profile.propTypes = {
    updateUsername:PropTypes.func
}

Profile.defaultProps = {
    updateUsername:(() =>{})
}

export default Profile