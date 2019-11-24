import React, { useState, useEffect } from "react";
import api from "../../services/api.js";
import EditStudent from "./EditStudent";

import Popup from "reactjs-popup";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Avatar from "@material-ui/core/Avatar";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import NotesIcon from "@material-ui/icons/Notes";
import CodeIcon from "@material-ui/icons/Code";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import { Card, CardHeader, CardContent, Grid } from "@material-ui/core";

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
    marginRight: theme.spacing(4)
  },
  card: {
    width: "100%"
  },
  button: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  }
}));

function GetStudents() {
  const classes = useStyles();
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  async function handleDelete(ID) {
    if (window.confirm("Deseja mesmo deletar este aluno?")) {
      try {
        await api.delete("/student", { data: [{ id: ID }] });
        window.location.reload();
      } catch (err) {
        console.error(err);
      }
    }
  }
  useEffect(() => {
    async function getData() {
      const response = await api.get("/student/" + admin_data.class.ID);
      setStudents(response.data);
    }
    getData();
  }, [admin_data.class.ID]);

  useEffect(() => {
    const results = students.filter(student =>
      student.firstname
        .concat(" ", student.lastname.toString().toLowerCase())
        .toString()
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, students]);

  function handleExams(student) {
    var string = "";
    var gradesExams = [0];
    if (student.grades.exams !== null) gradesExams = student.grades.exams;
    gradesExams.map(e => (string += e + " / "));
    return string;
  }

  function handleLists(student) {
    var string = "";
    var gradesLists = [0];
    if (student.grades.lists !== null) gradesLists = student.grades.lists;
    gradesLists.map(l => (string += l + " / "));
    return string;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h4" align="center">
        Turma: {admin_data.class.classname} - {admin_data.class.year}/
        {admin_data.class.season}
      </Typography>
      <Typography variant="h5" align="center">
        Professor(a): {admin_data.class.professorfirstname}{" "}
        {admin_data.class.professorlastname}
      </Typography>
      <br />
      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item sm={1}>
          <SearchIcon />
        </Grid>
        <Grid item sm={9}>
          <TextField
            label="Buscar"
            type="text"
            value={searchTerm}
            fullWidth
            variant="outlined"
            onChange={event => setSearchTerm(event.target.value)}
          />
        </Grid>
      </Grid>
      <ul className="GetStudents">
        {searchResults.map(s => (
          <ExpansionPanel key={s.ID}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Card className={classes.card}>
                <CardHeader
                  avatar={
                    <Avatar
                      alt="Profile Picture"
                      src={s.photourl === "" ? "default.webp" : s.photourl}
                      className={classes.avatar}
                    />
                  }
                  title={s.firstname + " " + s.lastname}
                />
              </Card>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Card className={classes.card}>
                <CardHeader avatar={<FingerprintIcon />} title={s.matricula} />
                <CardHeader
                  avatar={<CodeIcon />}
                  title={s.handles.codeforces}
                />
                <CardHeader avatar={<AlternateEmailIcon />} title={s.email} />
                <CardHeader
                  avatar={<NotesIcon />}
                  title={"Notas das provas: " + handleExams(s)}
                />
                <CardHeader
                  avatar={<NotesIcon />}
                  title={"Notas das listas: " + handleLists(s)}
                />
                <CardContent>
                  <Grid container justify="center">
                    <Popup
                      trigger={
                        <ButtonGroup>
                          <Button
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
                          <EditStudent student={s} />
                        </>
                      )}
                    </Popup>
                    {admin_data.admin.professor === true && (
                      <ButtonGroup>
                        <Button
                          color="secondary"
                          variant="contained"
                          startIcon={<DeleteIcon />}
                          onClick={() => handleDelete(s.ID)}
                        >
                          Deletar
                        </Button>
                      </ButtonGroup>
                    )}
                  </Grid>
                </CardContent>
              </Card>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        ))}
      </ul>
    </div>
  );
}

export default GetStudents;
