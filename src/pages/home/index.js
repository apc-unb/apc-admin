import React from 'react';

function Home() {
    return (
      <div className="home-page">
        <h1>Hello {localStorage.getItem('admin_id')}</h1>
      </div>
    );
}

export default Home;

