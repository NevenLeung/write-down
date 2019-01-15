import { connect } from 'react-redux';

import ArticleRead from '../components/article-read/ArticleRead';

const mapState = (state, ownProps) => {
  const articleID = ownProps.props.match.params.articleID;

  const selectedArticle = state.articles.find(article => article.id === articleID);

  const { title, author, excerpt, cover } = selectedArticle;

  return {
    title,
    author,
    excerpt,
    cover
  }
};


export default connect(
  mapState,
  null
)(ArticleRead);