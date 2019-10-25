import React from "react";
import Popup from "reactjs-popup";
import Header from "../../components/Header";
import GetNews from "../../components/News/GetNews";
import Profile from "../../components/Admin/Profile";
import CreateNews from "../../components/News/CreateNews";
import EditProfile from "../../components/Admin/EditProfile";
import GetStudents from "../../components/SchoolClass/GetStudents";
import "./style.css";

function Home() {
  return (
    <div className="home-page">
      <Header />
      <Profile />
      <Popup trigger={<button className="button">Editar Perfil </button>} modal>
        {close => (
          <>
            <span href="#" className="close" onClick={close}>
              &times;
            </span>
            <EditProfile />
          </>
        )}
      </Popup>
      <CreateNews />
      <GetNews />
      <GetStudents />
    </div>
  );
}

export default Home;
