import React, { useState } from 'react';
import api from '../../services/api.js';

function Login({ history }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    async function handleSubmit(event) {
      event.preventDefault()

      const response = await api.post('/admin/login', {
        matricula: username,
        password
      })

      const admin_data = response.data
      
      localStorage.setItem('admin_id', admin_data.admin.ID)
      localStorage.setItem('admin_exist', admin_data.userexist)
      
      if(!admin_data.userexist) 
        alert('\nO usuário não foi encontrado ou não existe\n\nUsuário ou senha podem estar incorretos')

      history.push('/')

    }

    return (
      <div className="login-page">
        <h1>Login page</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="username">Usuário: </label>
            <input
                id="username"
                type="text"
                placeholder="Matrícula"
                value={username}
                onChange={event => setUsername(event.target.value)}
            />
            <label htmlFor="password">Senha: </label>
            <input
                id="password"
                type="password"
                placeholder="Senha"
                value={password}
                onChange={event => setPassword(event.target.value)}
            />

            <button className="btn" type="submit">Entrar</button>
        </form>
      </div>
    );
}

export default Login;

