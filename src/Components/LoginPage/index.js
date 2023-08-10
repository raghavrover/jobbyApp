import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginPage extends Component {
  state = {
    username: 'rahul',
    password: 'rahul@2021',
    isLoginSuccessful: true,
    errorMsg: '',
    showPassword: false,
  }

  onFormSubmit = event => {
    event.preventDefault()
    this.authenticateUser()
  }

  authenticateUser = async () => {
    const {history} = this.props
    const {username, password} = this.state
    this.setState({isLoginSuccessful: true})

    const url = 'https://apis.ccbp.in/login'
    const bodyDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(bodyDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, 2)
      history.push('/')
    } else {
      this.setState({isLoginSuccessful: false, errorMsg: data.error_msg})
    }
  }

  getUsername = event => {
    this.setState({username: event.target.value})
  }

  getPassword = event => {
    this.setState({password: event.target.value})
  }

  onCheckboxChange = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }))
  }

  renderUsernameField = () => {
    const {username} = this.state

    return (
      <div className="password-field-container">
        <label className="password-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="password-field"
          placeholder="Username"
          value={username}
          onChange={this.getUsername}
        />
      </div>
    )
  }

  renderPasswordField = () => {
    const {password, showPassword} = this.state
    const inputPwdType = showPassword ? 'text' : 'password'

    return (
      <div className="password-field-container">
        <label className="password-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type={inputPwdType}
          id="password"
          className="password-field"
          placeholder="Password"
          value={password}
          onChange={this.getPassword}
        />
        <div className="show-hide-password-container">
          <input
            type="checkbox"
            className="pwd-checkbox"
            id="showHidePwd"
            onChange={this.onCheckboxChange}
          />
          <label htmlFor="showHidePwd" className="pwd-label-text">
            Show Password
          </label>
        </div>
      </div>
    )
  }

  renderLoginForm = () => {
    const {isLoginSuccessful, errorMsg} = this.state

    return (
      <form className="login-form" onSubmit={this.onFormSubmit}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
          className="website-logo"
          alt="website logo"
        />
        {this.renderUsernameField()}
        {this.renderPasswordField()}
        <button type="submit" className="login-btn">
          Login
        </button>
        <p className="password-label">
          Login and explore with the pre-filled credentials
        </p>
        {!isLoginSuccessful ? (
          <p className="error-msg">{`*${errorMsg}`}</p>
        ) : null}
      </form>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return <div className="login-page-container">{this.renderLoginForm()}</div>
  }
}

export default LoginPage
