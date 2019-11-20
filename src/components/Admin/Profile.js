import React from "react";
import EditProfile from "./EditProfile";
import Popup from "reactjs-popup";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles({
  bigAvatar: {
    margin: 50,
    width: 200,
    height: 200
  },
  card: {
    width: "100%"
  }
});

function Profile() {
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const classes = useStyles();

  return (
    <div className="profile-page">
      <Grid container justify="center" alignItems="center">
        <Avatar
          alt="Profile Picture"
          src={
            admin_data.admin.photourl === ""
              ? "monitor-default.webp"
              : admin_data.admin.photourl
          }
          className={classes.bigAvatar}
        />
      </Grid>
      <Grid spacing={0} container justify="center" alignItems="center">
        <Grid item sm={6}>
          <Card className={classes.card}>
            <CardHeader
              avatar={<AccountCircleIcon />}
              title={
                admin_data.admin.firstname + " " + admin_data.admin.lastname
              }
            />
            <CardHeader
              avatar={<AlternateEmailIcon />}
              title={admin_data.admin.email}
            />
            <CardHeader
              avatar={<FingerprintIcon />}
              title={admin_data.admin.matricula}
            />
            <CardContent>
              <Popup
                trigger={
                  <ButtonGroup fullWidth>
                    <Button
                      color="primary"
                      variant="contained"
                      startIcon={<EditIcon />}
                    >
                      Editar
                    </Button>
                  </ButtonGroup>
                }
                modal
                contentStyle={{
                  borderRadius: "25px",
                  borderWidth: "20px 20px 20px 20px",
                  borderColor: "white"
                }}
              >
                {close => (
                  <>
                    <span href="#" className="close-btn" onClick={close}>
                      &times;
                    </span>
                    <EditProfile />
                  </>
                )}
              </Popup>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Profile;
