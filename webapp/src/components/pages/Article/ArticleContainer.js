import { connect } from 'react-redux'
import { compose } from 'redux'
import { selectCurrentUser } from 'with-react-redux-login'

import Article from './Article'
import { withRequiredLogin, withRoles } from '../../hocs'
import withFormRouter from '../../hocs/withFormRouter/withFormRouter'
import selectArticleById from '../../../selectors/selectArticleById'
import selectCurrentUserReviewByArticleId from '../../../selectors/selectCurrentUserReviewByArticleId'
import selectRoleByUserIdAndType from '../../../selectors/selectRoleByUserIdAndType'
import selectReviewsByArticleIdAndVerdictId from '../../../selectors/selectReviewsByArticleIdAndVerdictId'
import selectVerdictsByArticleId from '../../../selectors/selectVerdictsByArticleId'

const mapStateToProps = (state, ownProps) => {
  const currentUser = selectCurrentUser(state)
  const { id: currentUserId } = (currentUser || {})
  const { match } = ownProps
  const { params: { articleId } } = match

  const editorRole = selectRoleByUserIdAndType(state, currentUserId, 'editor')
  const reviewerRole = selectRoleByUserIdAndType(state, currentUserId, 'reviewer')

  const canCreateArticle = typeof editorRole !== 'undefined'
  const canReview = typeof reviewerRole !== 'undefined'

  return {
    article: selectArticleById(state, articleId),
    canCreateArticle,
    canReview,
    currentUser,
    reviewerRole,
    userReview: selectCurrentUserReviewByArticleId(state, articleId),
    verdicts: selectVerdictsByArticleId(state, articleId),
    withoutVerdictReviews: selectReviewsByArticleIdAndVerdictId(
      state,
      articleId,
      null
    )
  }
}

export default compose(
  withRequiredLogin,
  withRoles({ creationRoleTypes: ['editor'], modificationRoleTypes: ['editor'] }),
  withFormRouter,
  connect(mapStateToProps)
)(Article)
