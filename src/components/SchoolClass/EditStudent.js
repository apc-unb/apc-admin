import React, { useState } from "react";
import api from "../../services/api";
import Popup from "reactjs-popup";
import PasswordConfirm from "../Login/PasswordConfirm";

function EditStudent({ student }) {
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [firstname, setFirstname] = useState(student.firstname);
  const [lastname, setLastname] = useState(student.lastname);
  const [matricula, setMatricula] = useState(student.matricula);
  const [email, setEmail] = useState(student.email);
  const [codeforces, setCodeforces] = useState(student.handles.codeforces);
  const [exams, setExams] = useState(student.grades.exams);
  const [lists, setLists] = useState(student.grades.lists);

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

      await api.put("admin/student", obj);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  function addExams(event) {
    event.preventDefault();
    if (event.key === "Enter" && event.target.value !== "") {
      setExams([...exams, event.target.value]);
      console.log("aqui");
      event.target.value = "";
    }
  }
  function removeExams(index) {
    setExams([...exams.filter(exam => exams.indexOf(exam) !== index)]);
  }

  function addLists(event) {
    event.preventDefault();
    if (event.key === "Enter" && event.target.value !== "") {
      setLists([...lists, event.target.value]);
      event.target.value = "";
    }
  }
  function removeLists(index) {
    setLists([...lists.filter(list => lists.indexOf(list) !== index)]);
  }

  return (
    <div className="EditStudent">
      <h2>Editar Aluno </h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstname">Primeiro nome: </label>
        <input
          id="firstname"
          type="text"
          value={firstname}
          onChange={event => setFirstname(event.target.value)}
          required
        />
        <br />
        <label htmlFor="lastname">Último nome: </label>
        <input
          id="lastname"
          type="text"
          value={lastname}
          onChange={event => setLastname(event.target.value)}
          required
        />
        <br />
        <label htmlFor="email">E-mail: </label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
        />
        <br />
        <label htmlFor="matricula">Matrícula: </label>
        <input
          id="matricula"
          type="text"
          value={matricula}
          onChange={event => setMatricula(event.target.value)}
          required
        />
        <br />
        <label htmlFor="codeforces">Handle Codeforces: </label>
        <input
          id="codeforces"
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
              <button onClick={() => removeExams(index)}>X</button>
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
              <button onClick={() => removeLists(index)}>X</button>
            </li>
          ))}
        </ul>
        <Popup trigger={<button type="button"> Enviar </button>}>
          <PasswordConfirm handleFunc={handleSubmit} />
        </Popup>
      </form>
    </div>
  );
}

export default EditStudent;