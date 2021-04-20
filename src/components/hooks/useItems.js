import {useState, useEffect} from 'react';

const useItems = (articles, checkUsername,slug,favoritesFromServer) => {
    const [items, setItems] = useState([]);
    const [tags, setTags] = useState([]);
    const [liked, setLiked] = useState(items.favoritesCount);
    const [loaded, setLoaded] = useState(true);
    const [showButtons, setShowbuttons] = useState(false);


    useEffect(() => {
        articles.getArticle(slug)
            .then(res => {
                if (res.article.author.username === checkUsername) {setShowbuttons(true)} 
                setItems(res.article)
                setTags(res.article.tagList)
                setLoaded(false)
                setLiked(res.article.favoritesCount)
            }) 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[favoritesFromServer,slug])

    return {
        items,tags,liked,loaded,showButtons
    }
}

export default useItems