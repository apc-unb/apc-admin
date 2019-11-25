import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Popup from "reactjs-popup";
import EditProjectType from "./EditProjectType";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Grid } from "@material-ui/core";

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

function GetProjectType() {
  const classes = useStyles();
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [projecttype, setProjectType] = useState([]);

  function beautifulDate(date) {
    date = date.split(".");
    date = date[0].split("T");
    let day = date[0].split("-");
    day = day[2] + "/" + day[1] + "/" + day[0];
    let hour = date[1].split("Z");
    return day + " às " + hour[0];
  }

  async function handleDelete(ID) {
    if (window.confirm("Deseja mesmo deletar esta notícia?")) {
      try {
        await api.delete("/project/type", { data: { id: ID } });
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    async function getData() {
      const response = await api.get("/project/type");
      const pt = response.data;
      var correctpt = [];
      pt.forEach(item => {
        if (item.ClassID === admin_data.class.ID) {
          correctpt.push(item);
        }
      });
      setProjectType(correctpt);
    }

    getData();
  }, [admin_data.class.ID]);

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center">
        Projetos
      </Typography>
      <ul className="GetProjectType">
        {projecttype.map(p => (
          <Paper className={classes.paper} key={p.ID}>
            <Typography variant="h5" component="h3">
              {p.name}
            </Typography>
            <br />
            <Typography variant="body1">{p.description}</Typography>
            <Typography variant="button" component="h4">
              Peso: {p.score}
            </Typography>
            <br />
            <Typography variant="overline" component="h4">
              Começa: {beautifulDate(p.start)}
            </Typography>
            <Typography variant="overline" component="h4">
              Termina: {beautifulDate(p.end)}
            </Typography>
            <Grid container justify="center">
              <Popup
                trigger={
                  <ButtonGroup>
                    <Button
                      align="center"
                      color="primary"
                      variant="contained"
                      className={classes.button}
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
                  borderColor: "white",
                  maxWidth: "600px"
                }}
              >
                {close => (
                  <>
                    <span href="#" className="close-btn" onClick={close}>
                      &times;
                    </span>
                    <EditProjectType project={p} />
                  </>
                )}
              </Popup>
              <ButtonGroup>
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(p.ID)}
                >
                  Deletar
                </Button>
              </ButtonGroup>
            </Grid>
          </Paper>
        ))}
      </ul>
    </div>
  );
}

export default GetProjectType;
