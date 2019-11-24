import React, { useState } from "react";
import api from "../../services/api";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import SendIcon from "@material-ui/icons/Send";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(3)
  },
  button: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

function CreateAdmin() {
  const classes = useStyles();
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [matricula, setMatricula] = useState("");

  async function handleSubmit() {
    try {
      const arr = [
        {
          classid: admin_data.class.ID,
          firstname,
          lastname,
          matricula
        }
      ];
      await api.post("/admin", arr);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className={classes.root}>
      <Typography variant="h5" align="center">
        Cadastrar monitor
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item sm={1}>
            <AccountCircle />
          </Grid>
          <Grid item sm={9}>
            <TextField
              label="Primeiro nome"
              type="text"
              value={firstname}
              fullWidth
              onChange={event => setFirstname(event.target.value)}
              required
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item sm={1}>
            <AccountCircle />
          </Grid>
          <Grid item sm={9}>
            <TextField
              label="Último nome"
              type="text"
              value={lastname}
              fullWidth
              onChange={event => setLastname(event.target.value)}
              required
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item sm={1}>
            <FingerprintIcon />
          </Grid>
          <Grid item sm={9}>
            <TextField
              label="Matrícula"
              type="number"
              value={matricula}
              helperText="Apenas números"
              fullWidth
              onChange={event => setMatricula(event.target.value)}
              required
            />
          </Grid>
        </Grid>
        <br />
        <Grid container justify="center">
          <Button
            color="primary"
            variant="contained"
            startIcon={<SendIcon />}
            type="submit"
          >
            Enviar
          </Button>
        </Grid>
      </form>
    </div>
  );
}

export default CreateAdmin;
