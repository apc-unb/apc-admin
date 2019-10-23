import React from 'react';
import GetNews from '../News/GetNews';
import CreateNews from '../News/CreateNews';
import Header from '../Header';
import GetStudents from '../SchoolClass/GetStudents'
import Profile from '../Admin/Profile'


function Home() {
    return (
      <div className="home-page">
        <Header />
        <Profile />
        <CreateNews />
        <GetNews />
        <GetStudents />
      </div>
    );
}

export default Home;

