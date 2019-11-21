import React, { useState, useEffect } from "react";
import api from "../../services/api.js";

import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    marginTop: theme.spacing(2),
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
    marginRight: theme.spacing(4)
  },
  card: {
    width: "100%",
    marginBottom: theme.spacing(2)
  }
}));

function GetAdmins() {
  const classes = useStyles();
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [admins, setAdmins] = useState([]);

  async function handleDelete(ID) {
    if (window.confirm("Deseja mesmo deletar este aluno?")) {
      try {
        await api.delete("/admin", { data: { id: ID } });
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    async function getData() {
      const response = await api.get("/admin/" + admin_data.class.ID);
      setAdmins(response.data);
    }
    getData();
  }, [admins, admin_data]);

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center">
        Monitores
      </Typography>
      <ul>
        {admins.map(
          admin =>
            admin.professor === false && (
              <Card className={classes.card} key={admin.ID}>
                <CardHeader
                  avatar={
                    <Avatar
                      alt="Profile Picture"
                      src={
                        admin.photourl === "" ? "default.webp" : admin.photourl
                      }
                      className={classes.avatar}
                    />
                  }
                  title={admin.firstname + " " + admin.lastname}
                />
                <CardHeader
                  avatar={<FingerprintIcon />}
                  title={admin.matricula}
                />
                <CardHeader
                  avatar={<AlternateEmailIcon />}
                  title={admin.email}
                />
                <CardContent>
                  <Grid container justify="center">
                    <ButtonGroup>
                      <Button
                        color="secondary"
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(admin.ID)}
                      >
                        Deletar
                      </Button>
                    </ButtonGroup>
                  </Grid>
                </CardContent>
              </Card>
            )
        )}
      </ul>
    </div>
  );
}

export default GetAdmins;
