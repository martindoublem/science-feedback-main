import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { selectCurrentUser } from 'with-react-redux-login'

import ArticleItem from './ArticleItem'
import selectCurrentUserReviewByArticleId from 'selectors/selectCurrentUserReviewByArticleId'
import selectCurrentUserVerdictByArticleId from 'selectors/selectCurrentUserVerdictByArticleId'
import selectRoleByUserIdAndType from 'selectors/selectRoleByUserIdAndType'
import selectReviewsByArticleId from 'selectors/selectReviewsByArticleId'

const mapStateToProps = (state, ownProps) =>  {
  const { article } = ownProps
  const { id: articleId } = article || {}
  const currentUser = selectCurrentUser(state)
  const { id: currentUserId } = currentUser || {}

  const editorRole = selectRoleByUserIdAndType(state, currentUserId, 'editor')
  const reviewerRole = selectRoleByUserIdAndType(state, currentUserId, 'reviewer')

  const canDelete = typeof editorRole !== 'undefined'
  const canReview = typeof reviewerRole !== 'undefined'
  const canVerdict = typeof editorRole !== 'undefined'

  const currentUserReview = selectCurrentUserReviewByArticleId(state, articleId)

  const reviews = selectReviewsByArticleId(state, articleId)
  const hasReviews = reviews && reviews.length > 0
  const showSeeAllReviews = typeof editorRole !== 'undefined' && hasReviews

  const currentUserVerdict = selectCurrentUserVerdictByArticleId(state, articleId)

  return {
    canDelete,
    canReview,
    canVerdict,
    currentUserReview,
    currentUserVerdict,
    hasReviews,
    showSeeAllReviews
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps)
)(ArticleItem)
