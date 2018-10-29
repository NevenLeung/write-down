import React, { Component } from 'react';
import 'normalize.css/normalize.css';

import 'antd/dist/antd.css';
import './App.css';

// import Layout from './layout/Layout';
import Header from './components/Header';
import ArticleEdit from './components/ArticleEdit';
// import TestToggle from './components/TestToggle';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<header className="App-header">Let's start to write down.</header>*/}
        <Header/>
        <ArticleEdit/>
        {/*<TestToggle/>*/}
        {/*<Layout/>*/}
      </div>
    );
  }
}

export default App;
