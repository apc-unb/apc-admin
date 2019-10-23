import React from 'react';
import GetNews from '../News/GetNews';
import CreateNews from '../News/CreateNews';
import Header from '../Header';
import GetStudents from '../SchoolClass/GetStudents'


function Home() {
    const admin_data = JSON.parse(sessionStorage.getItem('admin'))

    return (
      <div className="home-page">
        <Header />
        <h1>Olá {admin_data.admin.firstname + " " + admin_data.admin.lastname}</h1>
        <CreateNews />
        <GetNews />
        <GetStudents />

      </div>
    );
}

export default Home;

