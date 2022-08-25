import {Component} from 'react'

import {Container, Row, Col, Button, Form} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import SignUpPage from '../SignUpPage'
import Home from '../Home'

import './index.css'

let loginEmailErrorMsg
let loginPasswordErrorMsg

class LoginPage extends Component {
  state = {
    loginEmail: '',
    loginPassword: '',
    isChecked: false,
    signUpRequired: true,
    loginSuccess: false,
    blurLoginEmail: false,
    blurLoginPassword: false,
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {loginEmail, loginPassword} = this.state
    const storedEmail = localStorage.getItem(`${loginEmail}`)
    const storedPassword = localStorage.getItem(`xyz${loginPassword}`)
    console.log(`storedPwd   ::${storedPassword}`)
    console.log(`storedEmail  :: ${storedEmail}`)
    console.log(`loginPassword :: ${loginPassword}`)

    if (loginEmail === storedEmail && loginPassword === storedPassword) {
      this.setState({loginSuccess: true})
    }

    // this.setState({loginEmail: '', password: '', isChecked: false})
  }

  onBlurLoginEmail = () => {
    const {loginEmail} = this.state
    if (loginEmail === '') {
      this.setState({blurLoginEmail: true})
      loginEmailErrorMsg = 'Email should not be empty'
    } else {
      this.setState({blurLoginEmail: false})
    }
  }

  onBlurLoginPassword = () => {
    const {loginPassword} = this.state
    const storedPassword = localStorage.getItem(`xyz${loginPassword}`)
    if (loginPassword === '') {
      this.setState({blurLoginPassword: true})
      loginPasswordErrorMsg = 'Password should not be empty'
    } else if (loginPassword !== storedPassword) {
      this.setState({blurLoginPassword: true})
      loginPasswordErrorMsg = 'Password is not matching'
    } else if (loginPassword.length < 4) {
      this.setState({blurLoginPassword: true})
      loginPasswordErrorMsg = 'Password should be more than 3 letters '
    } else {
      this.setState({blurLoginPassword: false})
    }
  }

  onChangeEmail = event => {
    this.setState({loginEmail: event.target.value})
  }

  onChangePassword = event => {
    this.setState({loginPassword: event.target.value})
  }

  onChangeCheck = event => {
    this.setState({isChecked: event.target.checked})
    // this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  signUpPage = () => {
    this.setState({signUpRequired: false})
  }

  onChangeSignUpRequired = () => {
    this.setState({signUpRequired: true})
  }

  renderLoginPage = () => {
    const {
      loginEmail,
      loginPassword,
      isChecked,
      blurLoginEmail,
      blurLoginPassword,
    } = this.state
    return (
      <Container fluid>
        <Row>
          <Col className="colContainer">
            <Form className="form" onSubmit={this.onSubmitForm}>
              <h1 className="heading">Login</h1>
              <Form.Group controlId="email" className="emailContainer">
                <Form.Label className="label ">
                  Enter Your Valid Email Address
                </Form.Label>

                <Form.Control
                  type="email"
                  className="input"
                  value={loginEmail}
                  onChange={this.onChangeEmail}
                  placeholder="Email Address"
                  onBlur={this.onBlurLoginEmail}
                />
                {blurLoginEmail ? (
                  <p className="error">* {loginEmailErrorMsg}</p>
                ) : null}
              </Form.Group>
              <Form.Group controlid="pwd" className="emailContainer">
                <Form.Label className="label ">Password</Form.Label>

                <Form.Control
                  type="password"
                  className="input"
                  value={loginPassword}
                  onChange={this.onChangePassword}
                  placeholder="Password"
                  onBlur={this.onBlurLoginPassword}
                />
                {blurLoginPassword ? (
                  <p className="error">* {loginPasswordErrorMsg}</p>
                ) : null}
              </Form.Group>
              <Form.Group controlId="check" className="checkContainer">
                <input
                  type="checkbox"
                  className="inputCheck"
                  value={isChecked}
                  checked={isChecked}
                  onChange={this.onChangeCheck}
                />
                <Form.Label className="labelCheck">Remember Me</Form.Label>
              </Form.Group>
              <Button variant="primary" type="submit">
                Login
              </Button>
              <Form.Group className="link">
                <a
                  href="https://www.w3schools.com"
                  target="_blank"
                  rel="noreferrer"
                  className="linkHead"
                >
                  Forgot Password
                </a>
                <button
                  type="button"
                  onClick={this.signUpPage}
                  className="linkHead"
                >
                  SIGNUP
                </button>
              </Form.Group>
            </Form>
            
          </Col>
        </Row>
      </Container>
    )
  }

  renderLoginOrSignUpPage = () => {
    const {signUpRequired} = this.state

    return !signUpRequired ? (
      <SignUpPage onChangeSignUpRequired={this.onChangeSignUpRequired} />
    ) : (
      this.renderLoginPage()
    )
  }

  render() {
    const {loginSuccess, loginEmail} = this.state
    // console.log(signUpRequired)

    return loginSuccess ? (
      <Home loginEmail={loginEmail} />
    ) : (
      this.renderLoginOrSignUpPage()
    )
  }
}
export default LoginPage
