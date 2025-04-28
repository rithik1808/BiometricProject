import React from "react";

const Profile = (props) => {
  console.log(props);
  return (
    <div className="min-w-60 h-[calc(100vh-170px)] mt-12 border-r-2 border-base-300">
      <div className="flex flex-col items-center justify-center">
        <div>
          <h1 className="text-2xl font-bold mb-6">Profile</h1>
        </div>
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
            {props.user.profilePic ? (
              <img src={props.user.profilePic} alt="" />
            ) : (
              <img
                src="https://st5.depositphotos.com/81334134/76950/v/450/depositphotos_769508200-stock-illustration-man-profile-vector-professional-male.jpg"
                alt=""
              />
            )}
          </div>
        </div>
        <div className="mt-5 font-bold">{props.user.fullname}</div>
        <div>{props.user.position}</div>
      </div>
    </div>
  );
};

export default Profile;
