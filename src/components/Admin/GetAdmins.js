import React, { useState, useEffect } from "react";
import api from "../../services/api.js";

const defaultPicture =
  "https://cn.i.cdn.ti-platform.com/content/207/showpage/steven-universe/pt/stevenuniverse-200x200.png";

function GetAdmins() {
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [admins, setAdmins] = useState([]);

  async function handleDelete(ID) {
    if (window.confirm("Deseja mesmo deletar este aluno?")) {
      try {
        await api.delete("/admin", { data: { id: ID } });
      } catch (err) {
        console.error(err);
      }
    }
  }

  useEffect(() => {
    async function getData() {
      const response = await api.get("/admin/" + admin_data.class.ID);
      setAdmins(response.data);
    }
    getData();
  }, [admins, admin_data]);

  return (
    <>
      <h1>Monitores</h1>
      <ul>
        {admins.map(
          admin =>
            admin.professor === false && (
              <li key={admin.ID}>
                <img
                  src={admin.photourl === "" ? defaultPicture : admin.photourl}
                  alt="Profile"
                />
                <p>
                  {admin.firstname} {admin.lastname}
                </p>
                <p>{admin.email}</p>
                <button onClick={() => handleDelete(admin.ID)}>Deletar</button>
              </li>
            )
        )}
      </ul>
    </>
  );
}

export default GetAdmins;
