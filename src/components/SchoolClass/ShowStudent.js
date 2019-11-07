import React, { useState } from "react";
import Popup from "reactjs-popup";
import EditStudent from "./EditStudent";

const defaultPicture =
  "https://cn.i.cdn.ti-platform.com/content/207/showpage/steven-universe/pt/stevenuniverse-200x200.png";

function ShowStudent({ student }) {
  const [exams] = useState(student.grades.exams);
  const [lists] = useState(student.grades.lists);

  return (
    <div className="student">
      <h3>
        {student.ID}Nome: {student.firstname} {student.lastname}
      </h3>
      <img
        src={student.photourl === "" ? defaultPicture : student.photourl}
        alt="profile"
      />
      <p>Matrícula {student.matricula}</p>
      <p>Codeforces: {student.handles.codeforces}</p>
      <p>Email: {student.email}</p>
      <p>Notas provas: {exams.map(e => e + " / ")}</p>
      <p>Notas listas: {lists.map(l => l + " / ")}</p>
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
