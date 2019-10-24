import React, { useState } from "react";
import api from "../../services/api.js";

function Login({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await api.post("/admin/login", {
      matricula: username,
      password
    });

    const admin = response.data;

    sessionStorage.setItem("admin", JSON.stringify(admin));

    if (!admin.userexist)
      alert(
        "\nO usuário não foi encontrado ou não existe\n\nMatrícula ou senha podem estar incorretos"
      );

    history.push("/");
  }

  return (
    <div className="login-page">
      <h1>Login page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Matrícula: </label>
        <input
          id="username"
          type="number"
          placeholder="Matrícula"
          value={username}
          onChange={event => setUsername(event.target.value)}
          required
        />
        <span> (apenas números) </span>
        <br />
        <label htmlFor="password">Senha: </label>
        <input
          id="password"
          type="password"
          placeholder="Senha"
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
        />
        <br />
        <button className="btn" type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
