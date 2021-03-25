/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import ArticleService from '../service/service';
import style from './editArticle.module.scss';

const EditArticle = ({slug}) => {

    const articles = new ArticleService();

    const[addTagInput, setAddTagInput] = useState(1);
    const[items, setItems] = useState([]);
    const[itemsLoaded, setItemsLoaded] = useState(false);
    const[edited, setEdited] = useState(false);
    
    useEffect(() => {
        articles.getArticle(slug).then((res)=> {
            setItems(res.article)
            setItemsLoaded(true)
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[slug]) 
    
    const addTagClick = () => {
        setAddTagInput(addTagInput + 1)
    }

    const deleteTag = () => {
        if (addTagInput !== 0 ) {setAddTagInput(addTagInput - 1)}
    }

    const {register, handleSubmit, errors} = useForm();
    
    const onSubmit = (data) => {
        let allTags = [...data.newTags]
        // eslint-disable-next-line no-unused-expressions
        data.tags ? allTags = [...data.newTags, ...data.tags] : false
        articles.editArticle(slug,data.title, data.description, data.body, allTags).then(() => setEdited(true))    
    } 

    const tags = items.tagList

    if (edited) { return  <Redirect to='/articles'/> }

    return (
        <div className={style.main}>

            <p className={style.main__title}>Edit article</p>
            <form >
                <div className={style.title}>
                    <label htmlFor='title' className={style.title__label}>Title</label>
                    <input placeholder='Title' 
                        name='title' 
                        type='text' 
                        className={style.input}
                        defaultValue={items.title} 
                        ref={register({required:true})}/>
                        {errors.title && <p>Required field</p>}
                </div>

                <div className={style.title}>
                    <label htmlFor='title' className={style.title__label}>Short description</label>
                    <input placeholder='Description' 
                        name='description' 
                        type='text' 
                        className={style.input} 
                        defaultValue={items.description} 
                        ref={register({required:true})}/>
                        {errors.description && <p>Required field</p>}                        
                </div>

                <div className={style.title}>
                    <label htmlFor='title' className={style.title__label}>Text</label>
                    <textarea placeholder='Text' 
                            name='body' 
                            type='text' 
                            className={style.textarea} 
                            defaultValue={items.body} 
                            ref={register({required:true})}/>
                            {errors.body && <p>Required field</p>}                       
                </div>
             
                <div className={style.tags}>

                    <label htmlFor='title' className={style.title__label}>Tags</label>

                    <div className={style.input__box}>
                        { itemsLoaded ? tags.map((el,index) => {
                            const name = `tags[${index}]`
                            return <input placeholder='Tags' name={name}  key={index} type='text' defaultValue={el}
                                            className={style.tags__input} ref={register()} />}) : false
                        }
                        {[...Array(addTagInput)].map((el,index) => {
                            const name = `newTags[${index}]`
                            return <input placeholder='Tags' name={name} type='text' 
                             className={style.tags__input} ref={register()} key={Date.now() * Math.random()}/>
                        })}
                    </div>

                    <div className={style.tags__box}>
                        <button type='button' className={style.deleteTag} onClick={deleteTag}>Delete</button>
                        <button type='button' className={style.addTag} onClick={addTagClick}>Add tag</button>
                    </div>
                </div>
            </form>
            <button type='button' className={style.sendButton} onClick={handleSubmit(onSubmit)}><span className={style.buttonText} >Send</span></button>

        </div>
    )
}


EditArticle.propTypes = {
    slug: PropTypes.string
}

EditArticle.defaultProps = {
    slug:''
}

export default EditArticle