import { useRef, useState, useEffect } from 'react'
import {
  faCheck,
  faTimes,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import Login from './login'

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/
const phone_REGEX = /^[0-9]{9,12}$/
const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const Register = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [username, setUsername] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [phone, setPhone] = useState('')
  const [validPhone, setValidPhone] = useState(false)
  const [PhoneFocus, setPhoneFocus] = useState(false)

  const [password, setPassword] = useState('')
  const [validpassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPhone(phone_REGEX.test(phone))
  }, [phone])

  useEffect(() => {
    setValidPassword(password_REGEX.test(password))
  }, [password])

  useEffect(() => {
    setErrMsg('')
  }, [username, phone, password])

  const handleSubmit = async e => {
    e.preventDefault()
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(username)
    const v2 = phone_REGEX.test(phone)
    const v3 = password_REGEX.test(password)
    if (!v1 || !v2 || !v3) {
      setErrMsg('Invalid Entry')
      return
    }
    try {
      // const response = () => {
      //   Axios.post('http://localhost:3001/users/', {
      //     username: username,
      //     telefone: phone,
      //     password: password
      //   }).then(response => {
      //     console.log(response)
      //   })
      // }
      const response = await Axios.post('http://localhost:3001/users/',
        JSON.stringify({ username: username, telefone: phone, password: password }),
        {
            headers: { 'Content-Type': 'application/json' },
        }
    );
      setSuccess(true)
      //clear state and controlled inputs
      //need value attrib on inputs for this
      setUsername('')
      setPassword('')
      setPhone('')
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken')
      } else {
        setErrMsg('Registration Failed')
      }
      errRef.current.focus()
    }
  }

  return (
    <>
      {success ? (
        <section>
        <h1>Success!</h1>
        <p>
          <Link to="/login">Sign In</Link>
        </p>
    </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Username:
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !username ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="text"
              id="username"
              ref={userRef}
              autoComplete="off"
              onChange={e => setUsername(e.target.value)}
              value={username}
              required
              aria-invalid={validName ? 'false' : 'true'}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
            <p
              id="uidnote"
              className={
                userFocus && username && !validName
                  ? 'instructions'
                  : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="phone">
              Phone:
              <FontAwesomeIcon
                icon={faCheck}
                className={validPhone ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPhone || !phone ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="phone"
              id="phone"
              onChange={e => setPhone(e.target.value)}
              value={phone}
              required
              aria-invalid={validPhone ? 'false' : 'true'}
              aria-describedby="confirmnote"
              onFocus={() => setPhoneFocus(true)}
              onBlur={() => setPhoneFocus(false)}
            />
            <p
              id="confirmnote"
              className={
                PhoneFocus && !validPhone ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Complete the phone number.
            </p>

            <label htmlFor="password">
              Password:
              <FontAwesomeIcon
                icon={faCheck}
                className={validpassword ? 'valid' : 'hide'}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validpassword || !password ? 'hide' : 'invalid'}
              />
            </label>
            <input
              type="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
              aria-invalid={validpassword ? 'false' : 'true'}
              aria-describedby="passwordnote"
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
            <p
              id="passwordnote"
              className={
                passwordFocus && !validpassword ? 'instructions' : 'offscreen'
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{' '}
              <span aria-label="exclamation mark">!</span>{' '}
              <span aria-label="at symbol">@</span>{' '}
              <span aria-label="hashtag">#</span>{' '}
              <span aria-label="dollar sign">$</span>{' '}
              <span aria-label="percent">%</span>
            </p>

            <button disabled={!validName || !validpassword ? true : false}>
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              <Link to="/login">Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </>
  )
}

export default Register