/* eslint-disable react/no-array-index-key */
import React from 'react';
import { withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import ArticleService from '../service/service';
import likeImage from '../../img/Vector.svg';
import likedImageColored from '../../img/path4.png';
import style from './article.module.scss';
import useFavorites from '../hooks/useFavorites';

const Article = ({title, date, description, name, image, history, slug, tagList, favoritesCount}) => {
    
    const articles = new ArticleService();

    const {favoritesFromServer, likeImg, likeButton, styled} = useFavorites(favoritesCount, slug, articles, style)
    
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

    return (
        <div className={style.main}>
             <div className={style.article}>
                 <div className={style.article__box}>
                    <div className={style.article__header} onClick={onClick} onKeyDown={onClick} aria-hidden="true"> {title}  </div>
                    <button type='button' className={style.likeButton} onClick={likeButton}>
                            <img src={likeImg ? likedImageColored : likeImage} className={styled} alt='like'/> {favoritesFromServer }
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
    favoritesCount: PropTypes.number,
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
    favoritesCount:'',
}

export default withRouter(Article);