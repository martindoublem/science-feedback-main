/* eslint
  react/jsx-one-expression-per-line: 0 */
import classnames from 'classnames'
import { convertToRaw } from 'draft-js'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { Field } from 'react-final-form'
import { composeValidators } from 'react-final-form-utils'

import Texteditor from './Texteditor'
import FieldError from '../../FieldError'
import getRequiredValidate from '../../utils/getRequiredValidate'

export class TexteditorField extends PureComponent {
  constructor () {
    super()
    this.state = {
      valueLength: 0
    }
  }

  onChange = input => nextEditorState => {
    const { valueLength } = this.state

    const nextContentState = nextEditorState.getCurrentContent()
    const nextPlainText = nextContentState.getPlainText('')
    const nextValueLength = nextPlainText.length

    if (valueLength === 0 && nextValueLength === 0) {
      return
    }
    const newState = { valueLength: nextValueLength }

    // check for split-block event to not automatically scroll down
    const lastChangeType = nextEditorState.getLastChangeType()
    if (lastChangeType === 'split-block' && this.divEditorElement) {
      newState.editorScrollTop = this.divEditorElement.scrollTop
    }
    this.lastChangeType = lastChangeType

    // classic editor state update
    this.setState(newState, () => {
      const raw = convertToRaw(nextContentState)
      const stringifiedRaw = JSON.stringify(raw)
      if (input && input.onChange) {
        input.onChange(stringifiedRaw)
      }
    })
  }

  render () {
    const {
      label,
      maxLength,
      name,
      placeholder,
      readOnly,
      required,
      validate,
    } = this.props
    const { valueLength } = this.state

    return (
      <Field
        name={name}
        validate={composeValidators(validate, getRequiredValidate(required))}
        render={({ input, meta }) => (
          <div className={classnames("texteditor-field", { readonly: readOnly })}>
            <label htmlFor={name} className={classnames("field-label", { "empty": !label })}>
              {label && (
                <span>
                  <span>{label}</span>
                  {required && !readOnly && <span className="field-asterisk">*</span>}
                  {!readOnly && (
                    <span>
                      {' '}
                      ({valueLength} / {maxLength}){' '}
                    </span>
                  )}
                </span>
              )}
            </label>
            <div className="field-control">
              <div
                className="field-value"
                ref={element => { this.divEditorElement = element }}
              >
                <span className="field-inner">
                  <div
                    className="clickable"
                    role="button"
                    tabIndex="0"
                  >
                    <Texteditor
                      maxLength={maxLength}
                      onChange={this.onChange(input)}
                      placeholder={readOnly ? '' : placeholder}
                      readOnly={readOnly}
                      value={input.value}
                    />
                  </div>
                </span>
              </div>
            </div>
            <FieldError meta={meta} />
          </div>
        )}
      />
    )
  }
}

TexteditorField.defaultProps = {
  className: '',
  label: '',
  maxLength: 1000,
  placeholder: 'Please enter a value',
  readOnly: true,
  required: false,
  validate: null
}

TexteditorField.propTypes = {
  label: PropTypes.string,
  maxLength: PropTypes.number,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  required: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  validate: PropTypes.func
}

export default TexteditorField
