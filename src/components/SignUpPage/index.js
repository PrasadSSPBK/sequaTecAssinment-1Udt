import {Component} from 'react'
import {Container, Row, Col, Button, Form} from 'react-bootstrap'
import 'react-datepicker/dist/react-datepicker.css'
import DatePicker from 'react-datepicker'

import 'bootstrap/dist/css/bootstrap.min.css'

import './index.css'

let firstNameErrorMsg
let lastNameErrorMsg
let phoneNumErrorMsg
let passwordErrorMsg
let conformPasswordErrorMsg
let dobErrorMsg
let emailErrorMsg

const letters = /^[A-Za-z]+$/
const numbers = /^[0-9]+$/
// const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/

class SignUpPage extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNum: '',
    dob: '',
    password: '',
    confirmPassword: '',
    blurFirstName: false,
    blurLastName: false,
    blurPhoneNum: false,
    blurPassword: false,
    blurConformPassword: false,
    blurDob: false,
    blurEmail: false,
  }

  onSubmitSignUpForm = event => {
    event.preventDefault()
    const {onChangeSignUpRequired} = this.props
    const {email, password} = this.state
    localStorage.setItem(`${email}`, email)
    localStorage.setItem(`xyz${password}`, password)

    this.setState({
      firstName: '',
      lastName: '',
      email: '',
      phoneNum: '',
      dob: '',
      password: '',
      confirmPassword: '',
    })
    onChangeSignUpRequired()
  }

  onBlurEmail = () => {
    const {email} = this.state
    if (email === '') {
      this.setState({blurEmail: true})
      emailErrorMsg = 'Email should not be empty'
      // } else if (email.match(email) === false) {
      //   emailErrorMsg = 'Please enter Valid Email Address'
      // } else {
      this.setState({blurEmail: false})
    }
  }

  onBlurFirstName = () => {
    const {firstName} = this.state
    if (firstName === '') {
      this.setState({blurFirstName: true})
      firstNameErrorMsg = 'First Name should not be empty'
    } else if (firstName.length < 4) {
      this.setState({blurFirstName: true})
      firstNameErrorMsg = 'First Name should consist of minimum 4 letters'
    } else if (letters.test(firstName) === false) {
      this.setState({blurFirstName: true})
      firstNameErrorMsg = 'First Name should consist of alphabets only'
    } else {
      this.setState({blurFirstName: false})
    }
  }

  onBlurLastName = () => {
    const {lastName} = this.state
    if (lastName === '') {
      this.setState({blurLastName: true})
      lastNameErrorMsg = 'last Name should not be empty'
    } else if (lastName.length < 4) {
      this.setState({blurLastName: true})
      lastNameErrorMsg = 'Last Name should consist of minimum 4 letters'
    } else if (letters.test(lastName) === false) {
      this.setState({blurLastName: true})
      firstNameErrorMsg = 'Last Name should consist of alphabets only'
    } else {
      this.setState({blurLastName: false})
    }
  }

  onBlurPhoneNum = () => {
    const {phoneNum} = this.state
    if (phoneNum === '') {
      this.setState({blurPhoneNum: true})
      phoneNumErrorMsg = 'phone number should not be empty'
    } else if (phoneNum.length < 10 || phoneNum.length > 10) {
      this.setState({blurPhoneNum: true})
      phoneNumErrorMsg = 'phone number should consist of 10 digits '
    } else if (numbers.test(phoneNum) === false) {
      this.setState({blurPhoneNum: true})
      phoneNumErrorMsg = 'Last Name should consist of digits  only'
    } else {
      this.setState({blurPhoneNum: false})
    }
  }

  onBlurDOB = () => {
    const {dob} = this.state
    if (dob === '') {
      this.setState({blurDob: true})
      dobErrorMsg = 'Date of Birth should not be empty'
    } else {
      this.setState({blurDob: false})
    }
  }

  onBlurPassword = () => {
    const {password} = this.state
    if (password === '') {
      this.setState({blurPassword: true})
      passwordErrorMsg = 'Password should not be empty'
    } else if (password.length < 4) {
      this.setState({blurPassword: true})
      passwordErrorMsg = 'Password should consist of 10 digits '
    } else {
      this.setState({blurPassword: false})
    }
  }

  onBlurConformPassword = () => {
    const {password, confirmPassword} = this.state
    if (confirmPassword === '') {
      this.setState({blurConformPassword: true})
      conformPasswordErrorMsg = 'Conform Password should not be empty'
    } else if (confirmPassword.length < 4) {
      this.setState({blurConformPassword: true})
      conformPasswordErrorMsg = 'Conform Password should consist of 10 digits '
    } else if (password !== confirmPassword) {
      this.setState({blurConformPassword: true})
      conformPasswordErrorMsg = 'Password & Conform Password must be same '
    } else {
      this.setState({blurConformPassword: false})
    }
  }

  onChangeFirstName = event => {
    this.setState({firstName: event.target.value})
  }

  onChangeLastName = event => {
    this.setState({lastName: event.target.value})
  }

  onChangeEmail = event => {
    this.setState({email: event.target.value})
  }

  onChangePhoneNum = event => {
    this.setState({phoneNum: event.target.value})
  }

  onChangeDOB = date => {
    this.setState({dob: date})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeConfirmPassword = event => {
    this.setState({confirmPassword: event.target.value})
  }

  render() {
    const {
      firstName,
      lastName,
      email,
      phoneNum,
      dob,
      password,
      confirmPassword,
      blurFirstName,
      blurLastName,
      blurPhoneNum,
      blurPassword,
      blurConformPassword,
      blurDob,
      blurEmail,
    } = this.state

    return (
      <Container fluid>
        <Row>
          <Col className="colContainer">
            <Form className="signUpForm" onSubmit={this.onSubmitSignUpForm}>
              <h1 className="heading">Sign Up </h1>
              <Form.Group className="emailContainer" controlId="firstName">
                <Form.Label className="label">First Name</Form.Label>

                <Form.Control
                  type="text"
                  //   id="firstName"
                  className="input"
                  value={firstName}
                  onChange={this.onChangeFirstName}
                  placeholder="First Name"
                  onBlur={this.onBlurFirstName}
                />
                {blurFirstName ? (
                  <p className="error">* {firstNameErrorMsg}</p>
                ) : null}
              </Form.Group>
              <Form.Group controlId="lastName" className="emailContainer">
                <Form.Label className="label">Last Name</Form.Label>

                <Form.Control
                  type="text"
                  //   id="lastName"
                  className="input"
                  value={lastName}
                  placeholder="Last Name"
                  onChange={this.onChangeLastName}
                  onBlur={this.onBlurLastName}
                />
                {blurLastName ? (
                  <p className="error">* {lastNameErrorMsg}</p>
                ) : null}
              </Form.Group>
              <Form.Group controlId="emailSu" className="emailContainer">
                <Form.Label className="label">Email Address</Form.Label>

                <Form.Control
                  type="email"
                  className="input"
                  //   id="emailSu"
                  value={email}
                  placeholder="Email Address"
                  onChange={this.onChangeEmail}
                  onBlur={this.onBlurEmail}
                />
                {blurEmail ? <p className="error">* {emailErrorMsg}</p> : null}
              </Form.Group>
              <Form.Group controlId="ph" className="emailContainer">
                <Form.Label className="label">Phone Number</Form.Label>

                <Form.Control
                  type="tel"
                  //   id="ph"
                  className="input"
                  value={phoneNum}
                  onChange={this.onChangePhoneNum}
                  placeholder="0123456789"
                  onBlur={this.onBlurPhoneNum}
                />
                {blurPhoneNum ? (
                  <p className="error">* {phoneNumErrorMsg}</p>
                ) : null}
              </Form.Group>
              <Form.Group controlId="DOB" className="emailContainer">
                <Form.Label className="label">Date of Birth</Form.Label>
                <DatePicker
                  selected={dob}
                  className="dobInput w-100"
                  onChange={this.onChangeDOB}
                  onBlur={this.onBlurDOB}
                  id="DOB"
                  dateFormat="dd-MM-yyyy"
                  maxDate={new Date()}
                  showYearDropdown
                  scrollableMonthYearDropdown
                  isClearable
                  placeholderText="dd-mm-yyyy"
                />

                {blurDob ? <p className="error">* {dobErrorMsg}</p> : null}
              </Form.Group>
              <Form.Group controlId="pwdSu" className="emailContainer">
                <Form.Label className="label">Password</Form.Label>

                <Form.Control
                  type="password"
                  //   id="pwdSu"
                  className="input"
                  value={password}
                  onChange={this.onChangePassword}
                  placeholder="Password"
                  onBlur={this.onBlurPassword}
                />
                {blurPassword ? (
                  <p className="error">* {passwordErrorMsg}</p>
                ) : null}
              </Form.Group>
              <Form.Group controlId="cPwd" className="emailContainer">
                <Form.Label className="label">Confirm Password</Form.Label>

                <Form.Control
                  type="password"
                  className="input"
                  id="cPwd"
                  value={confirmPassword}
                  onChange={this.onChangeConfirmPassword}
                  placeholder="Confirm Password"
                  onBlur={this.onBlurConformPassword}
                />
                {blurConformPassword ? (
                  <p className="error">* {conformPasswordErrorMsg}</p>
                ) : null}
              </Form.Group>

              <Button variant="primary" type="submit">
                SIGNUP
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    )
  }
}
export default SignUpPage
