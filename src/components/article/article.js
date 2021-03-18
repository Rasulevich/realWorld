import React from 'react';
import { withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import style from './article.module.scss';

const Article = ({title, date, description, name, image, history, slug, tagList}) => {
    
    const onClick = () => {
        history.push(`/article/${slug}`)
    }

    const dateFull = new Date(date);
    const newDate = dateFull.toUTCString().slice(4,16);

    return (
        <div className={style.main}>
             <div className={style.article}>
                <div className={style.article__header} onClick={onClick} onKeyDown={onClick} aria-hidden="true"> {title}</div>
                <div className={style.tagList}>
                    {tagList.map((tag) => <div className={style.article__tags}>{tag}</div>)}
                </div>                    
                <div className={style.article__content}>{description} </div>
            </div>
             <div className={style.profile}>
                 <div className={style.profile__info}>
                     <div className={style.profile__name}>{name}</div>
                     <div className={style.profile__date}> {newDate}</div>
                 </div>
                 <img className={style.image} src={image} alt='profile img'/>
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
    history: PropTypes.string,
    slug: PropTypes.string,
    tagList: PropTypes.arrayOf,
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
}

export default withRouter(Article);