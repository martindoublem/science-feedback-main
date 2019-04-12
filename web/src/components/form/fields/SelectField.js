/* eslint
  react/jsx-one-expression-per-line: 0 */
import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import { Field } from 'react-final-form'
import { composeValidators } from 'react-final-form-utils'

import { FieldError } from '../layout'
import { createValidateRequiredField } from '../validators'
import { config } from '../utils'

const validateRequiredField = createValidateRequiredField(config.DEFAULT_REQUIRED_ERROR)

export const SelectField = ({
  className,
  disabled,
  label,
  name,
  options,
  placeholder,
  readOnly,
  required,
  validate
}) => {

  const requiredValidate =
    required && typeof required === 'function'
      ? required
      : (required && validateRequiredField) || undefined

  return (
    <Field
      name={name}
      validate={composeValidators(validate, requiredValidate)}
      render={({ input, meta }) => (
        <div className={classnames(className || "field select-field", { readonly: readOnly })}>
          <label htmlFor={name} className={classnames("field-label", { empty: !label })}>
            {label && (
              <span>
                <span>{label}</span>
                {required && !readOnly && <span className="field-asterisk">*</span>}
              </span>
            )}
          </label>
          <div className="field-control">
            <div className="field-value flex-columns items-center">
              <div className="field-inner">
                <select
                  {...input}
                  className="field-select is-block"
                  disabled={disabled || readOnly}
                  id={name}
                  placeholder={placeholder}
                  readOnly={readOnly}
                  required={!!required} // cast to boolean
                >
                  {options.filter(o => o).map(option => (
                    <option
                      id={option.value}
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <FieldError meta={meta} />
        </div>
      )}
    />
  )
}

SelectField.defaultProps = {
  className: '',
  disabled: false,
  label: '',
  optionLabelKey: 'label',
  optionValueKey: 'id',
  options: null,
  placeholder: 'Please select a value',
  readOnly: false,
  required: false,
  validate: null,
  validating: false
}

SelectField.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  optionLabelKey: PropTypes.string,
  optionValueKey: PropTypes.string,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  validate: PropTypes.func,
  validating: PropTypes.bool,
}

export default SelectField
