import React, { Component } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'normalize.css/normalize.css';

import 'antd/dist/antd.css';

import './App.css';

import { GeneralHeader as Header } from './components/header/Header';

// import ArticleEdit from './components/ArticleEdit';
// import ArticlesPage from './components/ArticleList';
import ArticleListPage from './containers/ArticleListContainer';
import ArticleDraftListPage from './containers/ArticleDraftListContainer';
import { ArticleEditContainer as ArticleEditPage } from './containers/ArticleEditContainer';


import configureStore from './ducks/configureStore';
// import CounterContainer from './containers/test';

import fakeData from './components/data';

const preloadedState = {
  articles: fakeData,
  drafts: []
};

const store = configureStore(preloadedState);

// console.log(store.getState());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppRouter/>
        </Router>
      </Provider>

    );
  }
}

const AppRouter = () => (
  <div className="App">
    {/*<Route exact path={'/'} component={ArticleEditPage}/>*/}
    <Route exact path={'/'} component={ArticleListPage}/>
    <Route exact path={'/articles'} component={ArticleListPage}/>
    <Route path={'/article/new/'} component={ArticleEditPage}/>
    <Route path={'/article/:id/edit/'} component={ArticleEditPage}/>
    <Route exact path={'/drafts'} component={ArticleDraftListPage}/>
    <Route path={'/draft/:id/edit/'} component={ArticleEditPage}/>
    <Route path={'/user'} component={UserPage}/>
  </div>
);

const NewArticlePage = () => (
  <div>
    <Header/>
    <h1>New Article Page</h1>
  </div>
);

// const ArticlePage = () => (
//   <div>
//     <Header/>
//     <ArticleList/>
//   </div>
// );

const UserPage = () => (
  <div>
    <Header/>
    <h1>User Page</h1>
  </div>
);

export default App;
