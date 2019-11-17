import React, { useState, useEffect } from "react";
import api from "../../services/api.js";

function GetSchoolClasses() {
  var admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await api.get("/class/" + admin_data.admin.ID);
      setClasses(response.data);
    }
    getData();
  }, [classes, admin_data]);

  async function handleClick(sclass) {
    admin_data.class = sclass;
    sessionStorage.setItem("admin", JSON.stringify(admin_data));
  }

  return (
    <>
      <h2>Escolher turma:</h2>
      {classes.map(c => (
        <button key={c.ID} value={c} onClick={event => handleClick(c)}>
          {c.classname} - {c.year}/{c.season}
        </button>
      ))}
    </>
  );
}

export default GetSchoolClasses;
