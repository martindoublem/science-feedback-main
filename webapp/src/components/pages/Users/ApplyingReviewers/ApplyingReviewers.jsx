import PropTypes from 'prop-types'
import React, { useCallback, useEffect } from 'react'

import Items from 'components/layout/Items'
import userType from 'components/types/userType'

import UserItemContainer from 'components/layout//UserItem/UserItemContainer'

const ApplyingReviewers = ({
  applyingReviewers,
  requestGetApplyingReviewers
}) => {
  const renderItem = useCallback(item => <UserItemContainer user={item} />)
  useEffect(() => { requestGetApplyingReviewers() }, [requestGetApplyingReviewers])
  return (
    <Items
      cols={3}
      hasMore={false}
      isLoading={false}
      items={applyingReviewers}
      renderItem={renderItem}
    />
  )
}

ApplyingReviewers.propTypes = {
  applyingReviewers: PropTypes.arrayOf(userType),
  requestGetApplyingReviewers: PropTypes.func.isRequired
}

export default ApplyingReviewers
