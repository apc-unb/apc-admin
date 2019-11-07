import React from "react";

const defaultPicture =
  "https://cn.i.cdn.ti-platform.com/content/207/showpage/steven-universe/pt/stevenuniverse-200x200.png";

function Profile() {
  const admin_data = JSON.parse(sessionStorage.getItem("admin"));

  return (
    <div className="profile-page">
      <h2>
        {admin_data.admin.firstname} {admin_data.admin.lastname}
      </h2>
      <img
        src={
          admin_data.admin.photourl === ""
            ? defaultPicture
            : admin_data.admin.photourl
        }
        alt="Profile"
      />
      <p>{admin_data.admin.email}</p>
      <p>{admin_data.admin.matricula}</p>
    </div>
  );
}

export default Profile;
