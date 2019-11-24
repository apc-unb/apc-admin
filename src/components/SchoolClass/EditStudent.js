import React, { useState } from "react";
import api from "../../services/api";
import Popup from "reactjs-popup";
import PasswordConfirm from "../Login/PasswordConfirm";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import SendIcon from "@material-ui/icons/Send";

function EditStudent({ student }) {
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
    <div className="EditStudent">
      <h2>Editar Aluno </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">Primeiro nome: </label>
        <input
          type="text"
          value={firstname}
          onChange={event => setFirstname(event.target.value)}
          required
        />
        <br />
        <label htmlFor="lastname">Último nome: </label>
        <input
          type="text"
          value={lastname}
          onChange={event => setLastname(event.target.value)}
          required
        />
        <br />
        <label htmlFor="email">E-mail: </label>
        <input
          type="text"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
        />
        <br />
        <label htmlFor="matricula">Matrícula: </label>
        <input
          type="text"
          value={matricula}
          onChange={event => setMatricula(event.target.value)}
          required
        />
        <br />
        <label htmlFor="codeforces">Handle Codeforces: </label>
        <input
          type="text"
          value={codeforces}
          onChange={event => setCodeforces(event.target.value)}
          required
        />
        <br />
        <label htmlFor="exams">Notas das provas: </label>
        <input
          autoComplete="new-password"
          type="number"
          step="0.01"
          name="exam"
          onKeyUp={event => addExams(event)}
          placeholder="Precione enter para adicionar uma nota de prova"
        />
        <button hidden onClick={addExams}>
          +
        </button>
        <ul>
          {exams.map((e, index) => (
            <li key={index}>
              <span>{e} </span>
              <button onClick={event => removeExams(event, index, e)}>X</button>
            </li>
          ))}
        </ul>
        <br />
        <label htmlFor="lists">Notas das listas: </label>
        <input
          autoComplete="new-password"
          type="number"
          step="0.01"
          name="list"
          onKeyUp={event => addLists(event)}
          placeholder="Precione enter para adicionar uma nota de prova"
        />
        <button hidden onClick={addLists}>
          +
        </button>
        <ul>
          {lists.map((l, index) => (
            <li key={index}>
              <span>{l} </span>
              <button onClick={event => removeLists(event, index, l)}>X</button>
            </li>
          ))}
        </ul>
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
            borderColor: "white",
            maxWidth: "300px"
          }}
        >
          <PasswordConfirm handleFunc={handleSubmit} />
        </Popup>
      </form>
    </div>
  );
}

export default EditStudent;
