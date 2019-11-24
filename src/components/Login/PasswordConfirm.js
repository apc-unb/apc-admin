import React, { useState } from "react";
import api from "../../services/api.js";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import { TextField, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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

function PasswordConfirm({ handleFunc }) {
  const style = useStyles();
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [password, setPassword] = useState("");

  async function handleConfirm(event) {
    event.preventDefault();
    try {
      const response = await api.post("/admin/login", {
        matricula: admin_data.admin.matricula,
        password
      });

      const status = response.status;
      if (status === 200) handleFunc(password);
    } catch (err) {
      alert(
        "\nO usuário não foi encontrado ou não existe\n\nMatrícula ou senha podem estar incorretos"
      );
    }
  }

  return (
    <div className={style.container}>
      <Typography
        component="h1"
        variant="h5"
        color="primary"
        className={style.textField}
      >
        Confirmar senha:
      </Typography>
      <TextField
        id="password"
        type="password"
        value={password}
        onChange={event => setPassword(event.target.value)}
        className={style.textField}
        label="Senha"
        margin="normal"
        fullWidth
        autoFocus
        autoComplete="current-password"
        required
      />
      <br />
      <Button
        color="primary"
        variant="contained"
        startIcon={<VerifiedUserIcon />}
        onClick={handleConfirm}
      >
        Confirmar
      </Button>
    </div>
  );
}

export default PasswordConfirm;
