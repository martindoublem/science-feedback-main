import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

import {
  CheckboxField,
  TextareaField,
  TextField,
} from '../../../layout/form/fields'
import createValidateScrapField from './validators/createValidateScrapField'
import getFormParams from '../../../../utils/getFormParams'

const validateScrapField = createValidateScrapField()

class FormFields extends Component {
  getArticleFormParams = () => getFormParams('article', this.props)

  render () {
    const { validating } = this.props
    const { isModifiedEntity, readOnly } = this.getArticleFormParams()

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
}

FormFields.defaultProps = {
  validating: false
}

FormFields.propTypes = {
  validating: PropTypes.bool
}

export default FormFields
