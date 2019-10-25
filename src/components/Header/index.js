import React from "react";
import Cookies from "universal-cookie";

function Header() {
  function logout() {
    const cookies = new Cookies();

    cookies.remove("jwt", { path: "/" });
    sessionStorage.clear();

    window.location.href = "/";
  }
  return (
    <div className="header">
      <h2>Páginas dos Administradores da Matéria de APC</h2>
      <button onClick={() => logout()}>Sair</button>
    </div>
  );
}

export default Header;
