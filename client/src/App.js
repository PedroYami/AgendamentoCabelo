import React, { useState, useEffect } from 'react'
import './App.css'
import Axios from 'axios'

function App() {

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')

  const submit = () => {
    Axios.post('http://localhost:3001/users/', {
      username: name,
      telefone: phone,
      password: password
    }).then((response) => {
      console.log(response)
    })
  }

  return (
    <div className="App">
      <h1>Cadastramento</h1>

      <div className='form'>
        <label>Nome</label>
        <input type="text" placeholder="Nome" onChange={
          (e) => setName(e.target.value)
        } />
        <label>Telefone</label>
        <input type="text" placeholder="Telefone" onChange={
          (e) => setPhone(e.target.value)
        }/>
        <label>Senha</label>
        <input type="text" placeholder="Senha" onChange={
          (e) => setPassword(e.target.value)
        }/>
        <button onClick={submit}>Concluir</button>
      </div>
    </div>
  )
}

export default App
