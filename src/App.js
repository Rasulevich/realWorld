import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import { useState } from 'react/cjs/react.development';
import Header from './components/header/header';
import ArticleList from './components/articleList/articleList';
import OpenArticle from './components/openArticle/openArticle';
import SignIn from './components/signIn/signIn';
import SignUp from './components/signUp/signUp';
import Profile from './components/profile/profile';
import CreateArticle from './components/createArticle/createArticle';
import EditArticle from './components/editArticle/editArticle';
import  './App.css';

const App = () => {
  const [updateHeader, setUsername] = useState(false);

  const updateUsername = () => {
    setUsername(!updateHeader)
  }

  return (
    <BrowserRouter>
      <div className='App'>
        <Header updateHeader={updateHeader} />
        <Route path="/articles"  exact render={() =><ArticleList/> } />
        <Route path="/article/:slug?" exact render={({match})=>{
          const {slug} = match.params
          return <OpenArticle slug={slug}/>
        } }/>
        <Route path="/article/:slug?/edit" render={({match})=>{
          const {slug} = match.params
          return <EditArticle slug={slug}/>
        } }/>
        <Route path="/sign-in" render={() =><SignIn updateUsername={updateUsername}/> }/>
        <Route path="/sign-up" component={SignUp}/>
        <Route path="/profile" render={() =><Profile updateUsername={updateUsername}/> }/>
        <Route path="/new-article" component={CreateArticle}/>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
