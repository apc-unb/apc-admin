import React from 'react';
import News from '../News'

function Home() {
    const admin_data = JSON.parse(sessionStorage.getItem('admin'))

    return (
      <div className="home-page">
        <h1>Hello {admin_data.admin.firstname + " " + admin_data.admin.lastname}</h1>
        <News />

      </div>
    );
}

export default Home;

