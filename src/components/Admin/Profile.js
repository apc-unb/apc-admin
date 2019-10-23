import React from 'react';
import EditProfile from './EditProfile'

function Profile() {
    const admin_data = JSON.parse(sessionStorage.getItem('admin'))

    return (
        <div className="profile-page">
            <h2>{ admin_data.admin.firstname } { admin_data.admin.lastname }</h2>
            <img src={ admin_data.admin.photourl } alt="Profile"/>
            <p>{ admin_data.admin.email }</p>
            <p>{ admin_data.admin.matricula }</p>
            <EditProfile />
        </div>
    )
    
}

export default Profile;