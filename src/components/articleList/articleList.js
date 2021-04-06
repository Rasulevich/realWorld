import React, { useState, useEffect} from 'react';
import { Pagination, Spin, Alert } from 'antd';
import 'antd/dist/antd.css';
import ArticleService from '../service/service';
import Article from '../article/article';
import style from './articleList.module.scss'

 const ArticleList = () => {

    const articles = new ArticleService()

    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);
    const [loader, setLoader] = useState(true);
    const [error, setError] = useState(false);

    const pageChange = (event) => {
        setPage((event-1) * 20)
        setLoader(true)
    }

    const onError = () => {
        setError(true)
    }

    useEffect (() => {
            articles.getArticleList(page)
            .then((res) => {
                setItems(res.articles)
                setLoader(false)
                setError(false)
            })
            .catch(onError)               
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page])

     const elements = items.map(item => (
                <div key={item.slug}>
                    <Article
                        title = {item.title}
                        name = {item.author.username}
                        image={item.author.image}    
                        description={item.description}
                        date={item.createdAt} 
                        tagList={item.tagList}
                        slug={item.slug} 
                        favoritesCount={item.favoritesCount}
                        favorited={item.favorited}
                        />
                </div>
                )
            )
            
    if (loader) {return <div className={style.spinner}>  <Spin size='large'/> </div>}  
    
    if (error) {return <div className={style.spinner}> <Alert message="Something go wrong" type="success"/> </div>} 

    return (
        <div>
            <div>{elements}</div>
            <div ><Pagination defaultCurrent={(page / 20) + 1} total={50} onChange={pageChange} className={style.pagination} /></div> 
        </div>
    )
}

export default ArticleList;




    