import PropTypes from 'prop-types'
import React, { Component, Fragment } from 'react'
import { requestData } from 'redux-saga-data'

import RolesManagerContainer from './RolesManager/RolesManagerContainer'
import Header from '../../layout/Header'
import Main from '../../layout/Main'
import UserItemContainer from '../Users/UsersExploration/UserItem/UserItemContainer'
import { userNormalizer } from '../../../utils/normalizers'

class User extends Component {
  componentDidMount() {
    this.handleRequestData()
  }

  handleRequestData = () => {
    const { dispatch, match: { params: { userId } } } = this.props
    dispatch(
      requestData({
        apiPath: `/users/${userId}`,
        normalizer: userNormalizer
      })
    )
  }

  render () {
    const { user } = this.props
    return (
      <Fragment>
        <Header />
        <Main name="review">
          <section className="section hero">
            <h1 className="title">
              Profile
            </h1>
          </section>
          <section>
            <UserItemContainer user={user} />
          </section>
          <section>
            <RolesManagerContainer />
          </section>
        </Main>
      </Fragment>
    )
  }
}

User.defaultProps = {
  user: null
}

User.propTypes = {
  dispatch: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  user: PropTypes.object
}

export default User
