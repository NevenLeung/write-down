import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'normalize.css/normalize.css';

import 'antd/dist/antd.css';

import './App.css';

import { GeneralHeader as Header } from './components/header/TheHeader';

import ArticleListPage from './containers/ArticleListContainer';
import ArticleDraftListPage from './containers/ArticleDraftListContainer';
import ArticleEditPage from './containers/ArticleEditContainer';
import ArticleReadPage from './containers/ArticleReadContainer';


import configureStore from './ducks/configureStore';

import fakeData from './components/data';

const preloadedState = {
  articles: fakeData,
};

const store = configureStore(preloadedState);

// console.log(store.getState());

const App = () => (
  <Provider store={store}>
    <Router>
      <AppRouter/>
    </Router>
  </Provider>
);

const AppRouter = () => (
  <div className="App">
    {/*<Route exact path={'/'} component={ArticleEditPage}/>*/}
    <Route exact path={'/'} component={ArticleListPage}/>
    <Route exact path={'/articles'} component={ArticleListPage}/>
    <Route path={'/article/:articleID/read/'} component={ArticleReadPage}/>
    <Route path={'/article/new/'} component={ArticleEditPage}/>
    <Route path={'/article/:articleID/edit/'} component={ArticleEditPage}/>
    <Route exact path={'/drafts'} component={ArticleDraftListPage}/>
    <Route path={'/draft/:articleID/edit/'} component={ArticleEditPage}/>
    {/*<Route path={'/user'} component={UserPage}/>*/}
  </div>
);

// const UserPage = () => (
//   <div>
//     <Header/>
//     <h1>User Page</h1>
//   </div>
// );

export default App;
