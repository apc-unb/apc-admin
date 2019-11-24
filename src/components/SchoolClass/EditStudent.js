import React, { useState } from "react";
import api from "../../services/api";
import Popup from "reactjs-popup";
import PasswordConfirm from "../Login/PasswordConfirm";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import SendIcon from "@material-ui/icons/Send";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import CodeIcon from "@material-ui/icons/Code";
import NotesIcon from "@material-ui/icons/Notes";

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
  },
  chip: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2)
  }
}));

function EditStudent({ student }) {
  const classes = useStyles();
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [firstname, setFirstname] = useState(student.firstname);
  const [lastname, setLastname] = useState(student.lastname);
  const [matricula, setMatricula] = useState(student.matricula);
  const [email, setEmail] = useState(student.email);
  const [codeforces, setCodeforces] = useState(student.handles.codeforces);
  var gradesExams = [0];
  var gradesLists = [0];
  if (student.grades.exams !== null) gradesExams = student.grades.exams;
  if (student.grades.lists !== null) gradesLists = student.grades.lists;
  const [exams, setExams] = useState(gradesExams);
  const [lists, setLists] = useState(gradesLists);

  async function handleSubmit(password) {
    try {
      const obj = {
        adminid: admin_data.admin.ID,
        classid: admin_data.class.ID,
        studentid: student.ID,
        adminpassword: password,
        firstname,
        lastname,
        matricula,
        email,
        handles: {
          codeforces
        },
        grades: {
          exams,
          lists
        }
      };
      await api.put("/admin/student", obj);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  function addExams(event) {
    event.preventDefault();
    if (event.key === "Enter" && event.target.value !== "") {
      setExams([...exams, parseFloat(event.target.value)]);
      event.target.value = "";
    }
  }
  function removeExams(event, index, value) {
    event.preventDefault();
    setExams([
      ...exams.filter((exam, idx) => {
        if (exam === value && idx === index) return false;
        return true;
      })
    ]);
  }

  function addLists(event) {
    event.preventDefault();
    if (event.key === "Enter" && event.target.value !== "") {
      setLists([...lists, parseFloat(event.target.value)]);
      event.target.value = "";
    }
  }
  function removeLists(event, index, value) {
    event.preventDefault();
    setLists([
      ...lists.filter((list, idx) => {
        if (list === value && idx === index) return false;
        return true;
      })
    ]);
  }

  return (
    <form onSubmit={handleSubmit} className={classes.root}>
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
          <FingerprintIcon />
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            label="Matrícula"
            helperText="apenas números"
            fullWidth
            type="text"
            value={matricula}
            onChange={event => setMatricula(event.target.value)}
            required
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item>
          <CodeIcon />
        </Grid>
        <Grid item xs={12} sm={10}>
          <TextField
            label="Handle Codeforces"
            fullWidth
            type="text"
            value={codeforces}
            onChange={event => setCodeforces(event.target.value)}
            required
          />
        </Grid>
      </Grid>
      <br />
      <Grid container alignItems="center" justify="center">
        <Grid item sm={1}>
          <NotesIcon />
        </Grid>
        <Grid item sm={9}>
          <TextField
            label="Nota das provas"
            type="number"
            step="0.01"
            fullWidth
            variant="filled"
            onKeyUp={event => addExams(event)}
            placeholder="Precione enter para adicionar"
          />
        </Grid>
        <button hidden onClick={addExams}>
          +
        </button>
      </Grid>
      <br />
      {exams.map((e, index) => (
        <Chip
          key={index}
          label={e}
          variant="outlined"
          className={classes.chip}
          onDelete={event => removeExams(event, index, e)}
        />
      ))}
      <br />
      <Grid container alignItems="center" justify="center">
        <Grid item sm={1}>
          <NotesIcon />
        </Grid>
        <Grid item sm={9}>
          <TextField
            label="Nota das listas"
            type="number"
            step="0.01"
            fullWidth
            variant="filled"
            onKeyUp={event => addLists(event)}
            placeholder="Precione enter para adicionar"
          />
        </Grid>
        <button hidden onClick={addLists}>
          +
        </button>
      </Grid>
      <br />
      {lists.map((l, index) => (
        <Chip
          key={index}
          label={l}
          variant="outlined"
          className={classes.chip}
          onDelete={event => removeLists(event, index, l)}
        />
      ))}
      <Grid container justify="center">
        <Popup
          trigger={
            <Grid item xs={12} sm={10} md={6} lg={3}>
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

export default EditStudent;
