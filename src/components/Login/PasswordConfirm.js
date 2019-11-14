import React, { useState } from "react";
import api from "../../services/api.js";

function PasswordConfirm({ handleFunc }) {
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));
  const [password, setPassword] = useState("");

  async function handleConfirm(event) {
    event.preventDefault();
    try {
      const response = await api.post("/admin/login", {
        matricula: admin_data.admin.matricula,
        password
      });

      const status = response.status;
      if (status === 200) handleFunc(password);
    } catch (err) {
      alert(
        "\nO usuário não foi encontrado ou não existe\n\nMatrícula ou senha podem estar incorretos"
      );
    }
  }

  return (
    <div className="passwordconfirm-page">
      <h3>Confirmar com senha</h3>
      {/* <label htmlFor="matriucla">Matrícula: </label> */}
      <input
        id="username"
        type="text"
        placeholder="Matrícula"
        value={admin_data.admin.matricula}
        readOnly
        hidden
      />
      <label htmlFor="password">Senha: </label>
      <input
        autoComplete="new-password"
        id="password"
        type="password"
        placeholder="Senha"
        value={password}
        onChange={event => setPassword(event.target.value)}
        required
      />
      <br />
      <button onClick={handleConfirm} className="btn" type="submit">
        Confirmar
      </button>
    </div>
  );
}

export default PasswordConfirm;
