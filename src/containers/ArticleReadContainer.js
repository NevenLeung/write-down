import { connect } from 'react-redux';

import ArticleRead from '../components/article-read/ArticleRead';

const mapState = (state, ownProps) => {
  const articleID = ownProps.match.params.articleID;
  // const isFrom = ownProps.location.state.isFrom;

  const selectedArticle = state.articles.data.find(article => article.id === articleID);

  const { title, author, excerpt, cover, markdown, postedAt, updatedAt } = selectedArticle;

  return {
    title,
    author,
    excerpt,
    cover,
    markdown,
    postedAt,
    updatedAt
  }
};

export default connect(
  mapState,
  null
)(ArticleRead);