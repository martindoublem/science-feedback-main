import { connect } from 'react-redux'
import { compose } from 'redux'

import Articles from './Articles'
import mapStateToProps from './mapStateToProps'
import { withRequiredLogin } from '../../hocs'

export default compose(
  withRequiredLogin,
  connect(mapStateToProps)
)(Articles)
