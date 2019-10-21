import React from 'react';

function Home() {
    const admin_data = JSON.parse(localStorage.getItem('admin'))

    return (
      <div className="home-page">
        <h1>Hello {admin_data.admin.firstname + " " + admin_data.admin.lastname}</h1>
      </div>
    );
}

export default Home;

