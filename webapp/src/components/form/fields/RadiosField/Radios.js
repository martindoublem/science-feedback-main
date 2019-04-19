import PropTypes from 'prop-types'
import React, { Component } from 'react'

class Radios extends Component {
  constructor () {
    super()
    this.state = {
      value: null
    }
  }

  componentDidUpdate (prevProps) {
    const { defaultValue } = this.props
    if (!prevProps.defaultValue && defaultValue) {
      this.resetState()
    }
  }

  onRadioClick = event => {
    const { onChange } = this.props
    const { target: { value } } = event

    this.setState(
      { value },
      () => {
        if (onChange) {
          onChange(value)
        }
      }
    )
  }

  resetState = () => {
    const { defaultValue } = this.props
    this.setState({ value: defaultValue })
  }

  render () {
    const {
      className,
      disabled,
      options,
      readOnly
    } = this.props
    const { value: stateValue } = this.state

    return (
      <div className={className}>
        {options && options.map(({ label, title, value }) => (
          <div
            className={`radio radio-${label.replace(/\s/g,"-")} flex-columns items-center`}
            key={value}
            title={title}
          >
            <input
              checked={stateValue === value}
              className="mr8"
              disabled={disabled || readOnly}
              onChange={this.onRadioClick}
              readOnly={readOnly}
              type="radio"
              value={value}
            />
            <span>
              {label}
            </span>
          </div>
        ))}
      </div>
    )
  }
}

Radios.defaultProps = {
  className: null,
  defaultValue: null,
  disabled: false,
  onChange: null,
  readOnly: false,
}

Radios.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOf(PropTypes.string, PropTypes.number),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  readOnly: PropTypes.bool,
}

export default Radios
