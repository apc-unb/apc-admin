import React, { useState } from "react";
import Popup from "reactjs-popup";
import PasswordConfirm from "../Login/PasswordConfirm";
import api from "../../services/api.js";

function EditProfile() {
  var admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [firstname, setFirstname] = useState(admin_data.admin.firstname);
  const [lastname, setLastname] = useState(admin_data.admin.lastname);
  const [email, setEmail] = useState(admin_data.admin.email);
  const [photourl, setPhotourl] = useState(admin_data.admin.photourl);
  const [newpassword, setNewpassword] = useState("");

  async function handleSubmit(password) {
    try {
      if (newpassword === null) setNewpassword(password);
      const obj = {
        id: admin_data.admin.ID,
        classid: admin_data.class.ID,
        firstname,
        lastname,
        email,
        password,
        newpassword,
        photourl
      };

      admin_data.admin.email = email;
      admin_data.admin.firstname = firstname;
      admin_data.admin.lastname = lastname;
      admin_data.admin.photourl = photourl;

      sessionStorage.setItem("admin", JSON.stringify(admin_data));
      await api.put("/admin", obj);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="editprofile-page">
      <h2>Editar Perfil</h2>
      <form id="edit-profile" onSubmit={handleSubmit}>
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
        <label htmlFor="photourl">Link foto de perfil: </label>
        <input
          id="photourl"
          type="text"
          value={photourl}
          onChange={event => setPhotourl(event.target.value)}
          required
        />
        <br />
        <label htmlFor="newpassword">Nova senha: </label>
        <input
          id="newpassword"
          type="password"
          value={newpassword}
          onChange={event => setNewpassword(event.target.value)}
        />
        <br />
        <Popup trigger={<button type="button"> Enviar </button>}>
          <PasswordConfirm handleFunc={handleSubmit} />
        </Popup>
      </form>
    </div>
  );
}

export default EditProfile;
