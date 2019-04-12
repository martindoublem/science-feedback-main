import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { Form } from 'react-final-form'
import LoadingInfiniteScroll from 'react-loading-infinite-scroller'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { assignData, requestData } from 'redux-saga-data'
import withQueryRouter from 'with-query-router'
import { selectCurrentUser } from 'with-react-login'

import UserItem from './UserItem'
import { TextField } from '../../form/fields'
import {
  selectEligibleVerdictUsersByVerdictId
} from '../../../selectors'
import { userNormalizer } from '../../../utils/normalizers'

function getScrollParent () {
  return document.querySelector('.modal-dialog')
}

class UsersExploration extends Component {
  constructor (props) {
    super(props)
    const { currentUser, dispatch } = props

    this.state = {
      hasMore: false,
      isLoading: false
    }

    dispatch(assignData({ users: currentUser ? [currentUser] : [] }))
  }

  componentDidMount() {
    const { query } = this.props
    const queryParams = query.parse()
    if (!queryParams.page) {
      this.handleRequestData()
    }
  }

  componentDidUpdate(prevProps) {
    const { location } = this.props
    if (location.search !== prevProps.location.search) {
      this.handleRequestData()
    }
  }

  handleRequestData = () => {
    const { dispatch, location } = this.props
    const { search } = location

    const apiPath = `/users${search}`

    this.setState({ isLoading: true }, () => {
      dispatch(
        requestData({
          apiPath,
          handleFail: () => {
            this.setState({
              hasMore: false,
              isLoading: false
            })
          },
          handleSuccess: (state, action) => {
            const { payload: { data } } = action
            this.setState({
              hasMore: data && data.length > 0,
              isLoading: false
            })
          },
          isMergingArray: true,
          isMergingDatum: true,
          normalizer: userNormalizer,
        })
      )
    })
  }

  onKeywordsSubmit = values => {
    const { currentUser, dispatch, query } = this.props
    const { keywords } = values

    const isEmptyKeywords =
      typeof keywords === 'undefined' ||
      keywords === ''

    if (!isEmptyKeywords) {
      dispatch(assignData({ users: currentUser ? [currentUser] : [] }))
    }

    query.change(
      {
        keywords: isEmptyKeywords ? null : keywords,
        page: null,
      }
    )
  }

  render() {
    const {
      isModal,
      users,
      query,
      withAddButton
    } = this.props
    const queryParams = query.parse()
    const { hasMore, isLoading } = this.state

    return (
      <Fragment>
        <Form
          initialValues={queryParams}
          onSubmit={this.onKeywordsSubmit}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <TextField
                name="keywords"
                placeholder="Type your search"
                renderValue={
                  () => (
                    <button
                      className="button is-primary is-outlined search-ok"
                      type="submit"
                    >
                      OK
                    </button>
                  )
                }
              />
            </form>
          )}
        />

        <br />

        <LoadingInfiniteScroll
          getScrollParent={isModal && getScrollParent}
          hasMore={hasMore}
          isLoading={isLoading}
          useWindow={!isModal}
        >
          {
            users.map(user => (
              <div className="mb16" key={user.id}>
                <UserItem
                  user={user}
                  withAddButton={withAddButton}
                />
              </div>
            ))
          }
        </LoadingInfiniteScroll>
      </Fragment>
    )
  }
}

UsersExploration.defaultProps = {
  currentUser: null,
  isModal: false,
  users: null,
  withAddButton: false
}

UsersExploration.propTypes = {
  currentUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  isModal: PropTypes.bool,
  location: PropTypes.object.isRequired,
  query: PropTypes.object.isRequired,
  users: PropTypes.array,
  withAddButton: PropTypes.bool,
}

function mapStateToProps(state, ownProps) {
  const { match: { params: { verdictId } } } = ownProps
  return {
    currentUser: selectCurrentUser(state),
    users: selectEligibleVerdictUsersByVerdictId(state, verdictId),
  }
}

export default compose(
  withQueryRouter(),
  connect(mapStateToProps)
)(UsersExploration)
