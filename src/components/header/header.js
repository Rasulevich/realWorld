/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import ArticleService from '../service/service';
import NotLogginedHeader from './notLogginedHeader';
import style from './header.module.scss';

const Header = ({updateHeader}) => {

    const user = new ArticleService;

    const image = "https://static.productionready.io/images/smiley-cyrus.jpg";

    const[name, setName] = useState('');
    const[avatar, setAvatar] = useState(image);
    const[loginned, setLoginned] = useState(false);
    // const[isMounted, setIsMounted] = useState(true)
  
    const logout = () => {
        localStorage.clear()
        setLoginned(false)
        setName('')
        }

    useEffect(() => {
            user.getCurrentUser().then((res) => {
                console.log(res)
                if(res.user.username) {
                    setLoginned(true)
                }
               
                setName(res.user.username)
    
                if (res.user.image !== null && res.user.image.length > 5) {
                    setAvatar(res.user.image)
                }
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[updateHeader])

    if (loginned) {
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
                    <img src={avatar} alt="profile img" className={style.image}/>
                 </Link>

                 <Link to='/sign-in'  className={style.logOut}>
                            <button type='button' className={style.buttonLogOut} onClick={logout}>Log out</button>
                 </Link>
            </div>      
        )
    }
    if (!loginned) {
        return <NotLogginedHeader name={name} avatar={avatar} />
    }
    return false
}

export default Header