import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './header.module.scss';

const NotLogginedHeader = ({name, avatar}) => (
        <div className={style.header}>

                        <Link to='/articles'>
                            <div className={style.header__title}> Realworld Blog</div>
                        </Link>

                        <Link to='/sign-in' className={style.signIn}>
                            <button type='button' className={style.buttonSignIn}>Sign In</button>
                        </Link>

                        <Link to='/profile' className={style.profile}>
                            <div className={style.profileName}>{name}</div>
                            <img src={avatar} alt="profile img" className={style.image}/>
                        </Link>

                        <Link to='/sign-up'  className={style.signUp}>
                            <button type='button' className={style.buttonSignUp}>Sign Up</button>
                        </Link>

                    </div>
    )

NotLogginedHeader.propTypes = {
    name:PropTypes.string,
    avatar:PropTypes.string
}

NotLogginedHeader.defaultProps = {
    name:'',
    avatar:''
}

export default NotLogginedHeader