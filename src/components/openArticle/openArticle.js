import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import ArticleService from '../service/service';
import Modal from '../modal/modal';
import style from './openArticle.module.scss';

const OpenArticle = ({slug,history}) => {

    const article = new ArticleService;

    const [items, setItems] = useState([]);
    const [deleteBtnClicked, setDeleteBtnClicked] = useState(false);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        article.getArticle(slug)
            .then(res => {
                setItems(res.article)
                setTags(res.article.tagList)
            }) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[slug])

    const deleteArticleBtn = () => {
        setDeleteBtnClicked(true)
    }

    const editTag = () => {
        history.push(`/article/${slug}/edit`)
    }

    const info = {...items.author};
    const dateFull = new Date(items.createdAt);
    const date = dateFull.toUTCString().slice(4,16);
    
    return (
        <div className={style.openedArticle}>
           <div className={style.main}>
             <div className={style.article}>
                <div className={style.article__header}> {items.title}</div>
                <div className={style.tagList}>
                    {tags.map((tag) => <div className={style.article__tags}>{tag}</div>)}
                </div>  
                <div className={style.article__content}>{items.description} </div>
            </div>
             <div className={style.profile}>
                 <div className={style.profile__block}>
                    <div className={style.profile__info}>
                        <div className={style.profile__name}>{info.username}</div>
                        <div className={style.profile__date}> {date}</div>
                    </div>
                    <img className={style.image} src={info.image} alt='profile img'/>
                 </div>
                 
                 <div className={style.profile__button}>
                    <button type='button' className={style.deleteArticle} onClick={deleteArticleBtn}>Delete</button>
                     <Modal deleteBtnClicked={deleteBtnClicked} deleteArticleBtn={deleteArticleBtn} slug={slug}/>
                    <button type='button' className={style.editTag} onClick={editTag}>Edit</button>
                 </div>               
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
    history:PropTypes.string
}

OpenArticle.defaultProps = {
    slug:'',
    history:''
}

export default withRouter(OpenArticle) ;