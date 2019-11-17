import React from "react";
import Popup from "reactjs-popup";
import Header from "../../components/Header";
import GetNews from "../../components/News/GetNews";
import Profile from "../../components/Admin/Profile";
import CreateNews from "../../components/News/CreateNews";
import EditProfile from "../../components/Admin/EditProfile";
import GetStudents from "../../components/SchoolClass/GetStudents";
import CreateProjectType from "../../components/ProjectType/CreateProjectType";
import GetProjectType from "../../components/ProjectType/GetProjectType";
import CreateStudent from "../../components/SchoolClass/CreateStudent";
import CreateAdmin from "../../components/Admin/CreateAdmin";
import GetSchoolClasses from "../../components/SchoolClass/GetSchoolClasses";
import GetAdmins from "../../components/Admin/GetAdmins";
import { Typography, Link } from "@material-ui/core";
import "./style.css";

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

function Home() {
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));

  return (
    <div className="home-page">
      <Header />
      <Profile />
      <Popup trigger={<button className="button">Editar Perfil </button>} modal>
        {close => (
          <>
            <span href="#" className="close-btn" onClick={close}>
              &times;
            </span>
            <EditProfile />
          </>
        )}
      </Popup>
      {admin_data.admin.professor === true && (
        <>
          <CreateAdmin />
          <GetAdmins />
        </>
      )}
      <CreateNews />
      <GetNews />
      {admin_data.admin.professor === true && (
        <>
          <CreateProjectType />
          <GetProjectType />
          <GetSchoolClasses />
        </>
      )}
      <GetStudents />
      <CreateStudent />
      <Copyright />
    </div>
  );
}

export default Home;
