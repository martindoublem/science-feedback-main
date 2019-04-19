import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'

const renderRedirecting = () => (
  <span className="is-block">
    {'Redirecting...'}
  </span>
)

const renderTimer = timing => (
  <span className="is-block">
    {`Vous allez être automatiquement redirigé dans ${timing} secondes`}
  </span>
)

class NoMatch extends React.PureComponent {
  constructor(props) {
    super(props)
    this.timer = null
    this.state = { timing: props.delay }
  }

  componentDidMount() {
    const timeout = 1000
    this.timer = setInterval(() => {
      this.setState(({ timing }) => ({ timing: timing - 1 }))
    }, timeout)
  }

  componentWillUnmount() {
    if (this.timer) clearInterval(this.timer)
    this.timer = null
  }

  redirectTo = () => {
    const { redirect } = this.props
    return <Redirect to={redirect} />
  }

  render() {
    const { timing } = this.state
    const { location } = this.props
    if (timing < 0) return this.redirectTo()
    return (
      <div id="page-redirect">
        <h3 className="title">
          {`404 Not found ${location.pathname}`}
        </h3>
        <p className="content">
          {timing > 0 && renderTimer(timing)}
          {timing === 0 && renderRedirecting()}
        </p>
      </div>
    )
  }
}

NoMatch.defaultProps = {
  delay: 5, // delay en seconds
  redirect: '/',
}

NoMatch.propTypes = {
  delay: PropTypes.number,
  location: PropTypes.object.isRequired,
  redirect: PropTypes.string,
}

export default NoMatch
