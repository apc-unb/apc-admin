import React, { useState, useEffect } from "react";
import api from "../../services/api.js";
import ShowStudent from "./ShowStudent";
import EditStudent from "./EditStudent";
import Popup from "reactjs-popup";

function GetStudents() {
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [students, setStudents] = useState([]);

  async function handleDelete(ID) {
    if (window.confirm("Deseja mesmo deletar este aluno?")) {
      try {
        await api.delete("/admin/student", { data: [{ id: ID }] });
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
  }, [students, admin_data]);

  return (
    <>
      <h2>
        Turma: {admin_data.class.classname} - {admin_data.class.year}/
        {admin_data.class.season}
      </h2>
      <h3>
        Professor(a): {admin_data.class.professorfirstname}{" "}
        {admin_data.class.professorlastname}
      </h3>
      <ul className="GetStudents">
        {students.map(s => (
          <li key={s.ID}>
            <img src={s.photourl} alt="Profile" />
            <p>
              {s.firstname} {s.lastname}
            </p>
            <Popup
              trigger={<button className="button">Mostrar aluno </button>}
              modal
            >
              {close => (
                <>
                  <span href="#" className="close" onClick={close}>
                    &times;
                  </span>
                  <ShowStudent student={s} />
                </>
              )}
            </Popup>
            <Popup
              trigger={<button className="button">Editar aluno </button>}
              modal
            >
              {close => (
                <>
                  <span href="#" className="close" onClick={close}>
                    &times;
                  </span>
                  <EditStudent student={s} />
                </>
              )}
            </Popup>

            <button onClick={() => handleDelete(s.ID)}>Deletar</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default GetStudents;
