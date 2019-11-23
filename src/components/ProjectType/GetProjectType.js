import React, { useState, useEffect } from "react";
import api from "../../services/api";
import Popup from "reactjs-popup";
import EditProjectType from "./EditProjectType";

function GetProjectType() {
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [projecttype, setProjectType] = useState([]);

  function beautifulDate(date) {
    date = date.split(".");
    date = date[0].split("T");
    let day = date[0].split("-");
    day = day[2] + "/" + day[1] + "/" + day[0];
    return day + " às " + date[1];
  }

  async function handleDelete(ID) {
    if (window.confirm("Deseja mesmo deletar esta notícia?")) {
      try {
        await api.delete("/project/type", { data: [{ id: ID }] });
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    async function getData() {
      const response = await api.get("/project/type");
      const pt = response.data;
      var correctpt = [];
      pt.forEach(item => {
        if (item.ClassID === admin_data.class.ID) {
          correctpt.push(item);
        }
      });
      setProjectType(correctpt);
    }

    getData();
  }, [admin_data.class.ID]);

  return (
    <>
      <h1>Projetos</h1>
      <ul className="GetProjectType">
        {projecttype.map(p => (
          <li key={p.ID}>
            <h2>{p.name}</h2>
            <p>{p.description}</p>
            <small>Começa: {beautifulDate(p.start)}</small>
            <br />
            <small>Termina: {beautifulDate(p.end)}</small>
            <br />
            <small>Peso: {p.score}</small>
            <Popup
              trigger={<button className="button">Editar Projeto </button>}
              modal
            >
              {close => (
                <>
                  <span href="#" className="close-btn" onClick={close}>
                    &times;
                  </span>
                  <EditProjectType pt={p} />
                </>
              )}
            </Popup>
            <button onClick={() => handleDelete(p.ID)}>Deletar</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default GetProjectType;
