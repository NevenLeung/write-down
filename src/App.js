import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import 'normalize.css/normalize.css';

import 'antd/dist/antd.css';

import './App.css';

import { GeneralHeader as Header } from './components/Header';

import ArticleEdit from './components/ArticleEdit';
import ArticlesPage from './components/ArticleList';

class App extends Component {
  render() {
    return (
      <Router>
        <AppRouter/>
      </Router>
    );
  }
}

const AppRouter = () => (
  <div className="App">
    <Route exact path={'/'} component={ArticleEdit}/>
    <Route path={'/draft'} component={DraftPage}/>
    <Route path={'/articles'} component={ArticlesPage}/>
    <Route path={'/article/:id/edit/'} component={ArticleEdit}/>
    <Route path={'/user'} component={UserPage}/>
  </div>
);

const DraftPage = () => (
  <div>
    <Header/>
    <h1>Draft Page</h1>
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
