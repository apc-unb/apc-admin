import React, { useState } from "react";
import PasswordConfirm from "../Login/PasswordConfirm";
import api from "../../services/api";
import { makeStyles } from "@material-ui/core/styles";
import TitleIcon from "@material-ui/icons/Title";
import DescriptionIcon from "@material-ui/icons/Description";
import TodayIcon from "@material-ui/icons/Today";
import SendIcon from "@material-ui/icons/Send";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import MoneyIcon from "@material-ui/icons/Money";
import Button from "@material-ui/core/Button";
import ScheduleIcon from "@material-ui/icons/Schedule";
import Calendar from "react-calendar";
import Popup from "reactjs-popup";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  grid: {
    marginTop: theme.spacing(2)
  }
}));

function EditProjectType({ project }) {
  const classes = useStyles();
  const classid = JSON.parse(sessionStorage.getItem("admin")).class.ID;
  const [name, setName] = useState(project.name);
  const [description, setDescription] = useState(project.description);
  const [date, setDate] = useState([
    new Date(project.start),
    new Date(project.end)
  ]);
  const [hour, setHour] = useState(date[1].toString().substr(16, 5));
  const [score, setScore] = useState(project.score);

  async function handleSubmit() {
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
    try {
      const obj = {
        id: project.ID,
        classid,
        name,
        description,
        score: parseFloat(score),
        start,
        end
      };

      await api.put("/project/type", obj);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
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
        <Popup
          trigger={
            <Grid item xs={12} sm={10} md={6} lg={3}>
              <Button
                color="primary"
                variant="contained"
                startIcon={<SendIcon />}
              >
                Enviar
              </Button>
            </Grid>
          }
          modal
          contentStyle={{
            borderRadius: "25px",
            borderWidth: "20px 20px 20px 20px",
            borderColor: "white",
            maxWidth: "300px"
          }}
        >
          <PasswordConfirm handleFunc={handleSubmit} />
        </Popup>
      </Grid>
    </form>
  );
}

export default EditProjectType;
