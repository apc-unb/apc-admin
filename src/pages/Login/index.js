import React from "react";
import Login from "../../components/Login/Login";
import { Grid } from "@material-ui/core";

function LoginPage() {
  return (
    <div className="login-page">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item xs={3}>
          <Login />
        </Grid>
      </Grid>
    </div>
  );
}

export default LoginPage;
