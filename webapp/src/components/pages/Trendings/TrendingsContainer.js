import { connect } from 'react-redux'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import Trendings from './Trendings'
import selectTrendings from './selectors/selectTrendings'
import withRequiredLogin from '../../hocs/withRequiredLogin'
import withRoles from '../../hocs/withRoles'

const mapStateToProps = state =>  {
  return {
    trendings: selectTrendings(state)
  }
}

export default compose(
  withQueryRouter(),
  withRequiredLogin,
  withRoles({ accessRoleTypes: ['editor'] }),
  connect(mapStateToProps)
)(Trendings)
