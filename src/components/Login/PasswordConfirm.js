import React, { useState } from "react";
import api from "../../services/api.js";

function PasswordConfirm({ handleFunc }) {
  const [password, setPassword] = useState("");
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));

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
      <label htmlFor="password">Senha: </label>
      <input
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
