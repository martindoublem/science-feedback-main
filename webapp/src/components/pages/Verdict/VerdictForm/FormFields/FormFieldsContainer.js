import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import { selectEntityByKeyAndId, selectEntitiesByKeyAndJoin } from 'redux-thunk-data'
import withFormidable from 'with-react-formidable'
import withQuery from 'with-react-query'

import selectEvaluationsByType from 'selectors/selectEvaluationsByType'
import selectTagsByScopes from 'selectors/selectTagsByScopes'

import FormFields from './FormFields'


const mapStateToProps = (state, ownProps) =>  {
  const {
    match: { params: { verdictId } },
    query: { params: { buzzsumoId } }
  } = ownProps
  const trending = selectEntitiesByKeyAndJoin(state, 'trendings', { key: 'buzzsumoId', value: buzzsumoId })[0]
  const verdict = selectEntityByKeyAndId(state, 'verdicts', verdictId)
  const { articleId } = verdict || {}
  const article = selectEntityByKeyAndId(state, 'articles', articleId)
  const reviews = selectEntitiesByKeyAndJoin(state, 'reviews', { key: 'articleId', value: articleId })

  console.log({reviews, articleId})

  return {
    article,
    evaluations: selectEvaluationsByType(state, 'article'),
    tags: selectTagsByScopes(state, ['verdict']),
    reviews,
    trending,
  }
}

export default compose(
  withRouter,
  withFormidable,
  withQuery(),
  connect(mapStateToProps)
)(FormFields)
