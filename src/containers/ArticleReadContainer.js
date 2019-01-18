import { connect } from 'react-redux';

import ArticleRead from '../components/article-read/ArticleRead';

const mapState = (state, ownProps) => {
  const articleID = ownProps.match.params.articleID;
  const isFrom = ownProps.location.state.isFrom;

  const src = isFrom === 'articles'? state.articles: state.drafts;

  const selectedArticle = src.find(article => article.id.toString() === articleID);

  const { title, author, excerpt, cover, markdown, publishedAt, updatedAt } = selectedArticle;

  return {
    title,
    author,
    excerpt,
    cover,
    markdown,
    publishedAt,
    updatedAt
  }
};

export default connect(
  mapState,
  null
)(ArticleRead);