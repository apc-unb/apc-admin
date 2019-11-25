import React, { useState } from "react";
import api from "../../services/api";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TitleIcon from "@material-ui/icons/Title";
import DescriptionIcon from "@material-ui/icons/Description";
import MoneyIcon from "@material-ui/icons/Money";
import SendIcon from "@material-ui/icons/Send";
import TodayIcon from "@material-ui/icons/Today";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Calendar from "react-calendar";

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

function CreateProjectType() {
  const classes = useStyles();
  const classid = JSON.parse(sessionStorage.getItem("admin")).class.ID;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState("");
  const [score, setScore] = useState("");

  function beautifulDate(date) {
    date = date.split(".");
    date = date[0].split("T");
    let day = date[0].split("-");
    day = day[2] + "/" + day[1] + "/" + day[0].substr(1);
    return day + " às " + date[1];
  }

  async function handleSubmit(event) {
    event.preventDefault();
    var start, end;
    if (date[0]) {
      start = date[0];
      end = new Date(
        (end = date[1].toString().replace("23:59:59", hour + ":00"))
      );
      console.log(end);
    } else {
      start = end = date;
    }
    if (
      window.confirm(
        "Deseja mesmo criar este projeto?\n\n" +
          "Nome: \n" +
          name +
          " \n\n" +
          "Descrição: \n" +
          description +
          " \n\n" +
          "Peso: \n" +
          score +
          " \n\n" +
          "Começo: \n" +
          beautifulDate(JSON.stringify(start)) +
          " \n\n" +
          "Término: \n" +
          beautifulDate(JSON.stringify(end))
      )
    ) {
      try {
        const obj = {
          classid,
          name,
          description,
          score: parseFloat(score),
          start,
          end
        };

        await api.post("/project/type", obj);
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  }

  return (
    <div className={classes.root}>
      <Typography variant="h5" align="center">
        Criar projetos
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item sm={1}>
            <TitleIcon />
          </Grid>
          <Grid item sm={9}>
            <TextField
              label="Título"
              type="text"
              value={name}
              fullWidth
              onChange={event => setName(event.target.value)}
              required
            />
          </Grid>
        </Grid>
        <br />
        <Grid container alignItems="center" justify="center">
          <Grid item sm={1}>
            <DescriptionIcon />
          </Grid>
          <Grid item sm={9}>
            <TextField
              label="Descrição"
              type="text"
              value={description}
              fullWidth
              multiline
              rows="6"
              variant="outlined"
              onChange={event => setDescription(event.target.value)}
              required
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item sm={1}>
            <MoneyIcon />
          </Grid>
          <Grid item sm={9}>
            <TextField
              label="Peso"
              type="number"
              value={score}
              fullWidth
              onChange={event => setScore(event.target.value)}
              required
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item sm={1}>
            <ScheduleIcon />
          </Grid>
          <Grid item sm={9}>
            <TextField
              label="Hora e minuto"
              type="time"
              value={hour}
              fullWidth
              onChange={event => setHour(event.target.value)}
              required
            />
          </Grid>
        </Grid>
        <br />
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item sm={1}>
            <TodayIcon />
          </Grid>
          <Grid item sm={9}>
            <Calendar
              selectRange={true}
              onChange={value => setDate(value)}
              value={date}
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

export default CreateProjectType;
