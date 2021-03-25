/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArticleService from '../service/service';
import Modal from '../modal/modal';
import likeImage from '../../img/Vector.svg';
import style from './openArticle.module.scss';

const OpenArticle = ({slug,history}) => {

    const article = new ArticleService;
    const checkUsername = localStorage.getItem('username');


    const [items, setItems] = useState([]);
    const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);
    const [tags, setTags] = useState([]);
    const [showButtons, setShowbuttons] = useState(false);
    const [liked, setLiked] = useState(false)
    useEffect(() => {
        article.getArticle(slug)
            .then(res => {
                if (res.article.author.username === checkUsername) {setShowbuttons(true)} 
                setItems(res.article)
                setTags(res.article.tagList)
            }) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[slug,liked ])

    const deleteArticleBtn = () => {
        setDeleteBtnClicked(true)
    }

    const editTag = () => {
        history.push(`/article/${slug}/edit`)
    }

    const info = {...items.author};
    const dateFull = new Date(items.createdAt);
    const date = dateFull.toUTCString().slice(4,16);
    const image = () => {
        if (info.image) {
            return info.image
        }
        return "https://static.productionready.io/images/smiley-cyrus.jpg";
    } 

    const addLike = () => {
            article.postLike(slug).then(() =>setLiked(true))
    }
    return (
        <div className={style.openedArticle}>
           <div className={style.main}>
             <div className={style.article}>
                <div className={style.article__header}> {items.title}
                    <button type='submit' className={style.likeButton} onClick={addLike}>
                        <img src={likeImage} alt='like'/> {items.favoritesCount} 
                    </button>
                </div>
                <div className={style.tagList}>
                    {tags.map((tag,id) => <div className={style.article__tags} key={id}>{tag}</div>)}
                </div>  
                <div className={style.article__content}>{items.description} </div>
            </div>
             <div className={style.profile}>
                 <div className={style.profile__block}>
                    <div className={style.profile__info}>
                        <div className={style.profile__name}>{info.username}</div>
                        <div className={style.profile__date}> {date}</div>
                    </div>
                    <img className={style.image} src={image()} alt='profile img'/>
                 </div>

                 {showButtons && 
                 <div className={style.profile__button}>
                    <button type='button' className={style.deleteArticle} onClick={deleteArticleBtn}>Delete</button>
                     <Modal deleteBtnClicked={deleteBtnClicked} deleteArticleBtn={deleteArticleBtn} setDeleteBtnClicked={setDeleteBtnClicked} slug={slug}/>
                    <button type='button' className={style.editTag} onClick={editTag}>Edit</button>
                 </div>}
                             
             </div>
            </div>         
            <div className={style.content}>
                <ReactMarkdown source={items.body} />
            </div>
        </div>        
        )  
}

OpenArticle.propTypes = {
    slug:PropTypes.string,
    history:PropTypes.objectOf(PropTypes.any)
}

OpenArticle.defaultProps = {
    slug:'',
    history:''
}

export default withRouter(OpenArticle) ;