import React, { useState } from "react";
import api from "../../services/api";

function CreateStudent() {
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [matricula, setMatricula] = useState("");

  async function handleSubmit() {
    try {
      const arr = [
        {
          classid: admin_data.class.ID,
          firstname,
          lastname,
          matricula
        }
      ];
      await api.post("/student", arr);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="CreateStudet">
      <h2>Cadastrar Aluno</h2>
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
        <label htmlFor="matricula">Matrícula: </label>
        <input
          type="text"
          value={matricula}
          onChange={event => setMatricula(event.target.value)}
          required
        />
        <br />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CreateStudent;
