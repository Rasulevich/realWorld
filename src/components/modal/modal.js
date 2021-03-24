/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {Redirect} from 'react-router-dom';
import ArticleService from '../service/service';
import style from './modal.module.scss'

const Modal = ({deleteBtnClicked, slug, setDeleteBtnClicked}) => {

    const article = new ArticleService;
    const [deleted, setDeleted] = useState(false);

    const deleteArticle = () => {
        article.deleteArticle(slug).then(() => setDeleted(true));
    }

    const notDelete = () => { 
        setDeleteBtnClicked(false)
    }
    
    if (!deleteBtnClicked ) { return null }

    if (deleted) { return  <Redirect to='/articles'/> }
    
    return (
        <div className={style.modal}>
                        <p className={style.modal__text}>Are you sure to delete this article?</p>
                        <div className={style.button__box}>
                            <button type='button' className={style.modal__button} onClick={notDelete}>
                                <span className={style.button__text}>No</span></button>
                            <button type='button' className={style.modal__button__active} onClick={deleteArticle}>
                                <span className={style.button__text__active}>Yes</span></button>
                        </div>                    
        </div>
    )
}


Modal.propTypes = {
    deleteBtnClicked:PropTypes.bool,
    setDeleteBtnClicked:PropTypes.func,
    slug:PropTypes.string
}

Modal.defaultProps = {
    deleteBtnClicked:false,
    setDeleteBtnClicked:(()=>{}),
    slug:''
}

export default Modal