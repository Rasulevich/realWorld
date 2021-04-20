import {useState} from 'react';

const useFavorites = (favoritesCount, slug, articles, style) => {
    const[favoritesFromServer, setfavoritesFromServer] = useState(favoritesCount);
    const[styled, setStyled] = useState(style.likeImg);

    const likedFromStorage = localStorage.getItem(slug);
    let liked
    if (likedFromStorage === 'true') {liked = true}
    if (likedFromStorage === 'false' || likedFromStorage === null) {liked = false}
    const[favoritedHook, setFavorited] = useState(liked);
    const[likeImg, setLikeImg] = useState(liked);

    const likeButton = () => {

        setStyled(style.animation)

        if (!favoritedHook) {
            articles.postLike(slug).then((res)=> {
                const {article} = res
                setfavoritesFromServer(article.favoritesCount)
                setStyled(style.likeImg)
            })
            setFavorited(true) ;
            setLikeImg(true);
            localStorage.setItem(slug,true)
        }
        if(favoritedHook) {
            articles.deleteLike(slug).then((res)=> {
                const {article} = res
                setfavoritesFromServer(article.favoritesCount)
                setStyled(style.likeImg)
            } )
            setFavorited(false) 
            setLikeImg(false)
            localStorage.setItem(slug,false)
        }     
    }
    return {
        favoritesFromServer, likeImg, likeButton, styled
    } 

}    

export default useFavorites;

    