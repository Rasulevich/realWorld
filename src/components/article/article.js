/* eslint-disable react/prop-types */
/* eslint-disable react/no-array-index-key */
import React, {useState} from 'react';
import { withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import ArticleService from '../service/service';
import likeImage from '../../img/Vector.svg';
import style from './article.module.scss';

const Article = ({title, date, description, name, image, history, slug, tagList, favoritesCount, favorited}) => {
    
    const articles = new ArticleService();
    const[favoritesFromServer, setfavoritesFromServer] = useState(favoritesCount);
    const[favoritedHook, setFavorited] = useState(favorited);
    const[styled, setStyled] = useState(style.likeImg)

    const onClick = () => {
        history.push(`/article/${slug}`)
    }

    const dateFull = new Date(date);
    const newDate = dateFull.toUTCString().slice(4,16);
    
    const imageCheck = () => {
        if (image) {
            return image
        }
        return "https://static.productionready.io/images/smiley-cyrus.jpg";
    } 
    

    const likeButton = () => {

        setStyled(style.animation)

        if (!favoritedHook) {

            articles.postLike(slug).then((res)=> {
                const {article} = res
                setfavoritesFromServer(article.favoritesCount)
                setStyled(style.likeImg)

            } )
            setFavorited(true) 
        }
        if(favoritedHook) {
            articles.deleteLike(slug).then((res)=> {
                const {article} = res
                setfavoritesFromServer(article.favoritesCount)
                setStyled(style.likeImg)

            } )
            setFavorited(false) 
        }     
    }

    return (
        <div className={style.main}>
             <div className={style.article}>
                 <div className={style.article__box}>
                    <div className={style.article__header} onClick={onClick} onKeyDown={onClick} aria-hidden="true"> {title}  </div>
                    <button type='button' className={style.likeButton} onClick={likeButton}>
                            <img src={likeImage} className={styled} alt='like'/> {favoritesFromServer }
                    </button> 
                </div>
                <div className={style.tagList}>
                    {tagList.map((tag,index) => <div className={style.article__tags} key={index}>{tag}</div>)}
                </div>                    
                <div className={style.article__content}>{description} </div>
            </div>
             <div className={style.profile}>
                 <div className={style.profile__info}>
                     <div className={style.profile__name}>{name.slice(0,9)}</div>
                     <div className={style.profile__date}> {newDate}</div>
                 </div>
                 <img className={style.image} src={imageCheck()} alt='profile img'/>
             </div>
        </div>           
        )  
}

Article.propTypes = {
    title: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    history: PropTypes.objectOf(PropTypes.any),
    slug: PropTypes.string,
    tagList: PropTypes.arrayOf(PropTypes.any),
    favoritesCount: PropTypes.number
}

Article.defaultProps = {
    title:'',
    date:'',
    description:'',
    name:'',
    image:'',
    history:'',
    slug:'',
    tagList:[],
    favoritesCount:''
}

export default withRouter(Article);