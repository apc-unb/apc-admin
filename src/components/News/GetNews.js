import React, { useState, useEffect } from "react";
import api from "../../services/api.js";
import Popup from "reactjs-popup";
import EditNews from "./EditNews";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Grid } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";

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
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
}));

function GetNews() {
  const classes = useStyles();
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [news, setNews] = useState(admin_data.news);

  function beautifulDate(date) {
    date = date.split(".");
    date = date[0].split("T");
    let day = date[0].split("-");
    day = day[2] + "/" + day[1] + "/" + day[0];
    return day + " às " + date[1];
  }

  async function handleDelete(ID) {
    if (window.confirm("Deseja mesmo deletar esta notícia?")) {
      try {
        await api.delete("/news", { data: [{ id: ID }] });
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    async function getData() {
      const response = await api.get("/news/" + admin_data.class.ID);
      setNews(response.data);
    }
    getData();
  }, [admin_data.class.ID]);

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center">
        Notícias
      </Typography>
      <ul className="GetNews">
        {news.map(n => (
          <Paper className={classes.paper} key={n.ID}>
            <Typography variant="h5" component="h3">
              {n.title}
            </Typography>
            {admin_data.class.ID === n.ClassID && (
              <Typography variant="overline" component="h3">
                Turma : {admin_data.class.classname} - {admin_data.class.year}/
                {admin_data.class.season}
              </Typography>
            )}
            <br />
            <Typography variant="body1">{n.description}</Typography>
            <br />
            {n.tags.map((tag, index) => (
              <Chip
                key={tag + index}
                label={tag}
                variant="outlined"
                color="primary"
                className={classes.chip}
              />
            ))}
            <br />
            <Typography variant="overline" component="h4">
              {beautifulDate(n.updatedat)}
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
                    <EditNews news={n} />
                  </>
                )}
              </Popup>
              <ButtonGroup>
                <Button
                  color="secondary"
                  variant="contained"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(n.ID)}
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

export default GetNews;
