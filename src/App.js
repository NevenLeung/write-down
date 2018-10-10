import React, { Component } from 'react';
import './App.css';

import ArticleEdit from './components/ArticleEdit';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">Let's start to write down.</header>
        <ArticleEdit/>
      </div>
    );
  }
}

export default App;
