import React, { useState } from "react";
import api from "../../services/api-login";
import Cookies from "universal-cookie";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button, Typography } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
    width: "100%",
    flexDirection: "column"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}));

function Login() {
  const style = useStyles();
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
    <form onSubmit={handleSubmit} className={style.container}>
      <Typography
        component="h1"
        variant="h5"
        color="primary"
        className={style.textField}
      >
        Login:
      </Typography>
      <div>
        <TextField
          id="username"
          value={username}
          onChange={event => setUsername(event.target.value)}
          className={style.textField}
          label="Matrícula"
          margin="normal"
          type="number"
          helperText="Apenas números"
          autoComplete="email"
          autoFocus
          fullWidth
          required
        />
        <br />
        <TextField
          id="password"
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          className={style.textField}
          label="Senha"
          margin="normal"
          fullWidth
          autoComplete="current-password"
          required
        />
        <br />
        <br />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Entrar
        </Button>
      </div>
    </form>
  );
}

export default Login;
