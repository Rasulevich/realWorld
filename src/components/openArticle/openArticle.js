/* eslint-disable react/no-array-index-key */
import React, {  useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import {Spin } from 'antd';
import 'antd/dist/antd.css';
import PropTypes from 'prop-types';
import ArticleService from '../service/service';
import Modal from '../modal/modal';
import likeImage from '../../img/Vector.svg';
import likedImageColored from '../../img/path4.png';
import style from './openArticle.module.scss';
import useFavorites from '../hooks/useFavorites';
import useItems from '../hooks/useItems';

const OpenArticle = ({slug,history}) => {

    const articles = new ArticleService();

    const checkUsername = localStorage.getItem('username');
    const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);

    const {favoritesFromServer,likeImg, likeButton, styled} = useFavorites(0.5,slug, articles, style);
    const {items,tags,liked, loaded,showButtons} = useItems(articles,checkUsername, slug, favoritesFromServer);

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

    if (loaded) {return <div className={style.spinner}>  <Spin size='large'/> </div>}  

    return (
        <div className={style.openedArticle}>
           <div className={style.main}>
             <div className={style.article}>
                <div className={style.article__header}> {items.title}
                    <button type='submit' className={style.likeButton} onClick={likeButton}>
                        <img src={likeImg ? likedImageColored : likeImage} className={styled} alt='like'/> {liked} 
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
                        <div className={style.profile__name}>{info.username.slice(0,9)}</div>
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