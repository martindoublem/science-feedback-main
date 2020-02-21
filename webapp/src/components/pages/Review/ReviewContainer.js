import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { selectEntityByKeyAndId } from 'redux-thunk-data'
import { selectCurrentUser } from 'with-react-redux-login'
import withFormidable from 'with-react-formidable'
import withQuery from 'with-react-query'

import withRequiredLogin from 'components/hocs/withRequiredLogin'
import withRoles from 'components/hocs/withRoles'
import selectArticleIdByMatchAndQuery from 'selectors/selectArticleIdByMatchAndQuery'

import Review from './Review'
import selectFormInitialValuesByArticleId from './selectors/selectFormInitialValuesByArticleId'
import selectVerdictsByArticleIdAndByUserId from './selectors/selectVerdictsByArticleIdAndByUserId'


const mapStateToProps = (state, ownProps) =>  {
  const articleId = selectArticleIdByMatchAndQuery(
    state,
    ownProps.match,
    ownProps.query
  )

  const formInitialValues = selectFormInitialValuesByArticleId(state, articleId)
  const currentUser = selectCurrentUser(state)
  const { id: userId } = (currentUser || {})

  const { isPending } = state.requests['/reviews'] || {}

  return {
    article: selectEntityByKeyAndId(state, 'articles', articleId),
    formInitialValues,
    isPending,
    verdicts: selectVerdictsByArticleIdAndByUserId(state, articleId, userId)
  }
}


export default compose(
  withRouter,
  withQuery(),
  withRequiredLogin,
  withFormidable,
  withRoles({ creationRoleTypes: ['reviewer'], modificationRoleTypes: ['reviewer'] }),
  connect(mapStateToProps)
)(Review)
