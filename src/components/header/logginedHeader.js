/* eslint-disable react/prop-types */
import React from 'react';
import {Link} from 'react-router-dom';
import style from './header.module.scss';

const LogginedHeader = ({avatar, name, isLogined}) => {
    const logout = () => {
        localStorage.clear()
        isLogined(false)
    }
    return (
        <div className={style.header}>
                 <Link to='/articles'>
                    <div className={style.header__title}> Realworld Blog</div>
                 </Link>

                 <Link to='/new-article' className={style.createArticle}>
                   <button type='button' className={style.buttonCreateArticle}>Create article</button>
                 </Link>

                 <Link to='/profile' className={style.profile}>
                    <div className={style.profileName}>{name}</div>
                    <img src={avatar} alt="OO" className={style.image}/>
                 </Link>

                 <Link to='/sign-in'  className={style.logOut}>
                            <button type='button' className={style.buttonLogOut} onClick={logout}>Log out</button>
                 </Link>
            </div>       
    )
}



export default LogginedHeader