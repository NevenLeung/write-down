import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'normalize.css/normalize.css';

import 'antd/dist/antd.css';

import './App.css';

// import { GeneralHeader as Header } from './components/header/TheHeader';

import ArticleListPage from './containers/ArticleListContainer';
import ArticleDraftListPage from './containers/ArticleDraftListContainer';
import ArticleEditPage from './containers/ArticleEditContainer';
import ArticleReadPage from './containers/ArticleReadContainer';

// For app init.
import { fetchArticles } from "./ducks/articles";
import { fetchLoginData } from "./ducks/user";

import configureStore from './ducks/store';

const store = configureStore();

class App extends React.Component {
  componentDidMount() {
    // App init.
    store.dispatch(fetchArticles());
    store.dispatch(fetchLoginData());
  }

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
    <Route path={'/articles'} component={ArticleListPage}/>
    <Route path={'/article/:articleID/read/'} component={ArticleReadPage}/>
    <Route path={'/article/new/'} component={ArticleEditPage}/>
    <Route path={'/article/:articleID/edit/'} component={ArticleEditPage}/>
    <Route path={'/drafts'} component={ArticleDraftListPage}/>
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
