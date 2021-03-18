import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ArticleService from '../service/service';
import style from './modal.module.scss'

const Modal = ({deleteBtnClicked, slug}) => {

    const article = new ArticleService;

    const [closeModal, setCloseModal] = useState(false);
    
    const deleteArticle = () => {
        article.deleteArticle(slug)
    }

    const notDelete = () => { 
        setCloseModal(true)
    }
    
    if (!deleteBtnClicked ) {
        return null
    }

    if (closeModal) {
        return null
    }

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
    slug:PropTypes.string
}

Modal.defaultProps = {
    deleteBtnClicked:false,
    slug:''
}

export default Modal