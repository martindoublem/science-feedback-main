import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { selectEntityByKeyAndId, selectEntitiesByKeyAndJoin } from 'redux-thunk-data'
import withForm from 'with-react-form'
import withQuery from 'with-react-query'

import withRequiredLogin from 'components/hocs/withRequiredLogin'
import withRoles from 'components/hocs/withRoles'
import selectArticleById from 'selectors/selectArticleById'

import Verdict from './Verdict'

const mapStateToProps = (state, ownProps) =>  {
  const { match: { params: { verdictId } }, query } = ownProps
  const { buzzsumoId } = query.getParams()
  const trending = selectEntitiesByKeyAndJoin(state, 'trendings', 'buzzsumoId', buzzsumoId)[0]
  const verdict = selectEntityByKeyAndId(state, 'verdicts', verdictId)
  const { articleId } = verdict || {}
  const article = selectEntityByKeyAndId(state, 'articles', articleId)
  const {
    externalThumbUrl: articleExternalThumUrl,
    summary: articleSummary,
    title: articleTitle,
    url: articleUrl,
  } = { ...trending, ...article}
  const currentUserVerdictPatch = {
      articleExternalThumUrl,
      articleSummary,
      articleTitle,
      articleUrl,
      ...verdict
  }
  return {
    trending,
    isPending: (state.requests['/verdicts'] || {}).isPending,
    currentUserVerdictPatch
  }
}

export default compose(
  withRouter,
  withQuery(),
  withRequiredLogin,
  withForm,
  withRoles({
    creationRoleTypes: ['editor'],
    modificationRoleTypes: ['editor']
  }),
  connect(mapStateToProps)
)(Verdict)
