import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import {Redirect} from 'react-router-dom';
import ArticleService from '../service/service';
import style from './createArticle.module.scss';

const CreateArticle = () => {

    const articles = new ArticleService();

    const[addTagInput, setAddTagInput] = useState(1);
    const [created, setCreated] = useState(false);

    const {register, handleSubmit, errors} = useForm();

    const addTagClick = () => {
        setAddTagInput(addTagInput + 1)
    }

    const deleteTag = () => {
        if (addTagInput !== 1 ) {setAddTagInput(addTagInput - 1)}
    }

    const onSubmit = (data) => {
        articles.postArticle(data.title, data.description, data.body, data.tags).then(() => setCreated(true) )    
    } 

    if (created) { return  <Redirect to='/articles'/> }

    return (
        <div className={style.main}>

            <p className={style.main__title}>Create new article</p>
            <form >
                <div className={style.title}>
                    <label htmlFor='title' className={style.title__label}>Title</label>
                    <input placeholder='Title' 
                        name='title' 
                        type='text' 
                        className={style.input} 
                        ref={register({required:true})}/>
                        {errors.title && <p>Required field</p>}
                </div>

                <div className={style.title}>
                    <label htmlFor='title' className={style.title__label}>Short description</label>
                    <input placeholder='Title' 
                        name='description' 
                        type='text' 
                        className={style.input} 
                        ref={register({required:true})}/>
                        {errors.description && <p>Required field</p>}                        
                </div>

                <div className={style.title}>
                    <label htmlFor='title' className={style.title__label}>Text</label>
                    <textarea placeholder='Text' 
                            name='body' 
                            type='text' 
                            className={style.textarea} 
                            ref={register({required:true})}/>
                            {errors.body && <p>Required field</p>}                       
                </div>
           
        
                <div className={style.tags}>

                    <label htmlFor='title' className={style.title__label}>Tags</label>
                    <div className={style.input__box}>
                        {[...Array(addTagInput)].map((el,index) => {
                                const name = `tags[${index}]`
                                return  <input placeholder='Tags' name={name} type='text' 
                                           className={style.tags__input} ref={register()} key={Date.now() * Math.random()}/>
                            } )}
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

export default CreateArticle