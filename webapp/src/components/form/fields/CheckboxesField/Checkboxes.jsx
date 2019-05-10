import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

class Checkboxes extends Component {
  constructor (props) {
    super(props)
    this.state = {
      values: props.value || props.defaultValue || []
    }
  }

  componentDidUpdate (prevProps) {
    const { value } = this.props
    const hasValueChanged = prevProps.value !== value
    if (hasValueChanged) {
      this.handleSetValue(value)
    }
  }

  handleSetValue = (value, callback) => {
    this.setState({ values: value }, callback)
  }

  onCheckboxClick = value => () => {
    const { onChange } = this.props
    const { values } = this.state

    let nextValues = values
    if (values.includes(value)) {
      nextValues = nextValues.filter(v => v !== value)
    } else {
      nextValues = nextValues.concat([value])
    }

    this.handleSetValue(nextValues, () => {
      if (onChange) {
        onChange(nextValues)
      }
    })
  }

  render () {
    const {
      className,
      disabled,
      options,
      readOnly
    } = this.props
    const { values } = this.state

    return (
      <div className={classnames('flex-columns flex-wrap', className)}>
        {options && options.map(({ label, title, value }) => {
          const checked = values.includes(value)
          return (
            <span className="" key={value}>
              <button
                className={classnames("button", {
                  checked,
                  "not-checked": !checked
                })}
                disabled={disabled || readOnly}
                onClick={this.onCheckboxClick(value)}
                readOnly={readOnly}
                title={title}
                type="button"
              >
                {label}
              </button>
            </span>
          )
        })}
      </div>
    )
  }
}

Checkboxes.defaultProps = {
  className: null,
  defaultValue: undefined,
  disabled: false,
  onChange: null,
  readOnly: false,
  value: []
}

Checkboxes.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.arrayOf(PropTypes.oneOf(PropTypes.string, PropTypes.number)),
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  readOnly: PropTypes.bool,
  value: PropTypes.oneOf(PropTypes.string, PropTypes.arrayOf(PropTypes.oneOf(PropTypes.string, PropTypes.number)))
}

export default Checkboxes
