import { useRef, useState, useEffect } from 'react'
import {
  faCheck,
  faTimes,
  faInfoCircle
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon }
from '@fortawesome/react-fontawesome'
import Axios from 'axios'
import { Link } from 'react-router-dom'
import Home from '../pages/home'

const USER_REGEX = /^[A-z ][ A-z ]{3,23}$/
const password_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const Login = () => {
  const userRef = useRef()
  const errRef = useRef()

  const [username, setUsername] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [password, setPassword] = useState('')
  const [validpassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [userId, setUserId] = useState('')

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    setValidName(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(password_REGEX.test(password))
  }, [password])

  useEffect(() => {
    setErrMsg('')
  }, [username, password])

  const handleSubmit = async e => {
    e.preventDefault()
    const v1 = USER_REGEX.test(username)
    const v2 = password_REGEX.test(password)
    if (!v1 || !v2) {
      setErrMsg('Invalid Entry')
      return
    }
    try {
      const response = await Axios.get(`http://localhost:3001/users/ByUsername/${username}`)

      setUserId(response.data.id)

      if (!response.data) {
        setErrMsg('Invalid user')
        return
      } else if (response.data.password !== password) {
        setErrMsg('Invalid password')
        return
      }
      setSuccess(true)
      
      setUsername('')
      setPassword('')
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus()
    }
  }

  return (
    <>
      {success ? (
        <Home userId={userId}/>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? 'errmsg' : 'offscreen'}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Login</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              Nome:
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

            <label htmlFor="password">
              Senha:
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
              8 a 24 caracteres.
              <br />
              Precisa incluir ao menos uma letra maiúscula, uma letra minúscula, 
              um número e um caractere especial.
              <br />
              Caracteres Especiais Perimitidos:{' '}
              <span aria-label="exclamation mark">!</span>{' '}
              <span aria-label="at symbol">@</span>{' '}
              <span aria-label="hashtag">#</span>{' '}
              <span aria-label="dollar sign">$</span>{' '}
              <span aria-label="percent">%</span>
            </p>

            <button disabled={!validName || !validpassword ? true : false}>
              Login
            </button>
          </form>
          <p>
            Ainda não tem cadastro?
            <br />
            <span className="line">
              <Link to="/">Sign Up</Link>
            </span>
          </p>
        </section>
      )}
    </>
  )
}

export default Login
