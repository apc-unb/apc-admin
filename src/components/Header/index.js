import React from 'react';

function Header() {
    function logout() {
        sessionStorage.clear();
        window.location.href = '/';
    }
    return (
      <div className="header">
        <h2>Páginas dos Administradores da Matéria de APC</h2>
        <button onClick={() => logout()}>Sair</button>
      </div>
    );
}

export default Header;
