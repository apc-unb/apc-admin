import React, { useState } from "react";
import Popup from "reactjs-popup";
import PasswordConfirm from "../Login/PasswordConfirm";
import api from "../../services/api.js";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import LinkedCameraIcon from "@material-ui/icons/LinkedCamera";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import SendIcon from "@material-ui/icons/Send";
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
  },
  grid: {
    marginTop: theme.spacing(2)
  }
}));

function EditProfile() {
  const style = useStyles();
  var admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [firstname, setFirstname] = useState(admin_data.admin.firstname);
  const [lastname, setLastname] = useState(admin_data.admin.lastname);
  const [email, setEmail] = useState(admin_data.admin.email);
  const [photourl, setPhotourl] = useState(admin_data.admin.photourl);
  const [newpassword, setNewpassword] = useState("");

  async function handleSubmit(password) {
    try {
      if (newpassword === null) setNewpassword(password);
      const obj = {
        id: admin_data.admin.ID,
        classid: admin_data.class.ID,
        firstname,
        lastname,
        email,
        password,
        newpassword,
        photourl
      };

      admin_data.admin.email = email;
      admin_data.admin.firstname = firstname;
      admin_data.admin.lastname = lastname;
      admin_data.admin.photourl = photourl;

      sessionStorage.setItem("admin", JSON.stringify(admin_data));
      await api.put("/admin", obj);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form className={style.container} id="edit-profile" onSubmit={handleSubmit}>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item>
          <AccountCircle />
        </Grid>
        <Grid item sm={5}>
          <TextField
            label="Primeiro nome"
            id="firstname"
            type="text"
            value={firstname}
            fullWidth
            onChange={event => setFirstname(event.target.value)}
            required
          />
        </Grid>
        <Grid item sm={5}>
          <TextField
            label="Último nome"
            id="lastname"
            type="text"
            value={lastname}
            fullWidth
            onChange={event => setLastname(event.target.value)}
            required
          />
        </Grid>
        <Grid container spacing={2} alignItems="center" justify="center"></Grid>
        <Grid item>
          <AlternateEmailIcon />
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            label="e-mail"
            id="email"
            fullWidth
            type="text"
            value={email}
            onChange={event => setEmail(event.target.value)}
            required
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item>
          <LinkedCameraIcon />
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            label="Foto de perfil"
            helperText="um link para a foto"
            id="photourl"
            type="text"
            fullWidth
            value={photourl}
            onChange={event => setPhotourl(event.target.value)}
            required
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item>
          <VpnKeyIcon />
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            label="Nova senha"
            id="newpassword"
            type="password"
            value={newpassword}
            fullWidth
            onChange={event => setNewpassword(event.target.value)}
          />
        </Grid>
      </Grid>
      <Grid
        className={style.grid}
        container
        alignItems="center"
        justify="center"
      >
        <Popup
          trigger={
            <Grid item xs={12} sm={10}>
              <ButtonGroup fullWidth>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<SendIcon />}
                >
                  Enviar
                </Button>
              </ButtonGroup>
            </Grid>
          }
          modal
          contentStyle={{
            borderRadius: "25px",
            borderWidth: "20px 20px 20px 20px",
            borderColor: "white"
          }}
        >
          <PasswordConfirm handleFunc={handleSubmit} />
        </Popup>
      </Grid>
    </form>
  );
}

export default EditProfile;
