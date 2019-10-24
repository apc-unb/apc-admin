import React from "react";
import Login from "../../components/Login/Login";

function LoginPage({ history }) {
  return (
    <div className="login-page">
      <Login history={history} />
    </div>
  );
}

export default LoginPage;
