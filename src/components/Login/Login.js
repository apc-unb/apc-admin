import React, { useState } from "react";
import api from "../../services/api-login";
import Cookies from "universal-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post("/admin/login", {
        matricula: username,
        password
      });
      const admin = response.data;
      const jwt = response.data.jwt;

      const cookies = new Cookies();

      cookies.set("jwt", jwt, { path: "/" });

      sessionStorage.setItem("admin", JSON.stringify(admin));

      window.location = "/";
    } catch (err) {
      alert(
        "\nO usuário não foi encontrado ou não existe\n\nMatrícula ou senha podem estar incorretos"
      );
    }
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
