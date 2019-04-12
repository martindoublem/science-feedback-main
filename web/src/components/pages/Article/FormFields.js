/* eslint-disable */
import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { compose } from 'redux'
import withQueryRouter from 'with-query-router'

import {
  CheckboxField,
  SelectField,
  TextareaField,
  TextField,
} from '../../form/fields'
import { createValidateScrapField } from '../../form/validators'

const validateScrapField = createValidateScrapField()
const SELECT_EVALUATIONS_NAME = 'evaluationId'
const SELECT_EVALUATIONS_PLACEHOLDER = 'Select an evaluation'

const FormFields = ({ query, validating }) => {
  const { isModifiedEntity, readOnly } = query.context()

  return (
    <div className="section">
      <div className="field-group">
        <TextField
          label="url"
          name="url"
          readOnly={readOnly || isModifiedEntity}
          renderValue={() => (
            <button
              className={classnames("button is-loading is-transparent", {
                "is-seethrough": !validating
              })}
              type="button"
            />
          )}
          required
          validate={validateScrapField}
        />
        <TextField
          label="title"
          name="title"
          readOnly={readOnly}
          required
        />
        <TextareaField
          label="summary"
          name="summary"
          readOnly={readOnly}
          required
          rows={readOnly ? 1 : 5}
        />

        <div className="optional-subtitle">
          Optional:
        </div>
        <CheckboxField
          label="Is this article reviewable ?"
          name="isReviewable"
          readOnly={readOnly}
          type="checkbox"
        />
        <div className="flex-columns flex-wrap">
          <TextField
            className='pr12'
            label="Total shares"
            name="totalShares"
            readOnly={readOnly}
            type="number"
          />
          <TextField
            className='pr12'
            label="Facebook shares"
            name="fbShares"
            readOnly={readOnly}
            type="number"
          />
          <TextField
            label="Twitter shares"
            name="twitterShares"
            readOnly={readOnly}
            type="number"
          />
        </div>
      </div>
    </div>
  )
}

FormFields.defaultProps = {
  isReadOnly: false,
  validating: false
}

FormFields.propTypes = {
  query: PropTypes.object.isRequired,
  validating: PropTypes.bool
}

export default compose(
  withQueryRouter(),
  connect()
)(FormFields)
