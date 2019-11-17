import React from "react";
import Login from "../../components/Login/Login";
import { Grid, Typography, Link } from "@material-ui/core";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        DraGon T
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function LoginPage() {
  return (
    <div className="login-page">
      <Grid
        container
        spacing={0}
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <Grid item xs={6} lg={3} md={3} sm={3}>
          <Login />
        </Grid>
      </Grid>
      <Copyright />
    </div>
  );
}

export default LoginPage;
