/* eslint
  react/jsx-one-expression-per-line: 0 */
import React from 'react'

import Icon from 'components/layout/Icon'

import TextField from './TextField'
import { createValidatePasswordField } from '../validators'


const DEFAULT_ERROR_MESSAGE =
  'Password should contain at least 12 characters, one number, one capital letter, one lower case and one from any of _-&?~#|^@=+.$,<>%*!:;'
const validatePasswordField = createValidatePasswordField(DEFAULT_ERROR_MESSAGE)

class PasswordField extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { hidden: true }
  }

  onToggleVivisbility = () => {
    this.setState(prev => ({ hidden: !prev.hidden }))
  }

  render() {
    const { hidden } = this.state
    const status = hidden ? '' : '-close'
    return (
      <TextField
        {...this.props}
        renderInner={
          () => (
            <button
              type="button"
              onClick={this.onToggleVivisbility}
              className="no-border no-outline no-background mx12 is-primary-text"
            >
              <Icon name={`ico-eye${status}.svg`} />
            </button>
          )
        }
        validate={validatePasswordField}
        type={hidden ? 'password' : 'text'}
      />
    )
  }
}

export default PasswordField
