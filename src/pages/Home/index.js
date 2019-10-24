import React from "react";
import GetNews from "../../components/News/GetNews";
import CreateNews from "../../components/News/CreateNews";
import Header from "../../components/Header";
import GetStudents from "../../components/SchoolClass/GetStudents";
import Profile from "../../components/Admin/Profile";
import EditProfile from "../../components/Admin/EditProfile";

function Home() {
  return (
    <div className="home-page">
      <Header />
      <Profile />
      <EditProfile />
      <CreateNews />
      <GetNews />
      <GetStudents />
    </div>
  );
}

export default Home;
