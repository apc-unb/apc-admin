import React from "react";

function ShowStudent({ student }) {
  function handleShow(event) {
    event.preventDefault();
  }

  return (
    <>
      <button onClick={handleShow}>Show - {student.matricula}</button>
    </>
  );
}

export default ShowStudent;
