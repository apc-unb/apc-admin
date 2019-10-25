import React from "react";
import Popup from "reactjs-popup";
import EditStudent from "./EditStudent";

function ShowStudent({ student }) {
  return (
    <div className="student">
      <h3>
        Nome: {student.firstname} {student.lastname}
      </h3>
      <img src={student.photourl} alt="profile" />
      <p>Matrícula {student.matricula}</p>
      <p>Codeforces: {student.handles.codeforces}</p>
      <p>Email: {student.email}</p>
      <p>Notas provas: {student.grades.exams}</p>
      <p>Notas listas: {student.grades.lists}</p>
      <Popup trigger={<button className="button">Editar aluno </button>} modal>
        {close => (
          <>
            <span href="#" className="close" onClick={close}>
              &times;
            </span>
            <EditStudent student={student} />
          </>
        )}
      </Popup>
    </div>
  );
}

export default ShowStudent;
