//Data
import { useState, useEffect } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom" //helps us access the URL id 

function ProfilePage(props) {


  const { authToken, setAuthToken } = props;
  const handleClick = () => {
      window.localStorage.removeItem("token")
      setAuthToken(false)
  };

//Effects
useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}<int:pk>/`)
  .then((results) => {return results.json();
  })
  .then((data) => {
    setUser(data);
  });
}, []);

  return (
    <>
    <div>
      <h2>{user.username}</h2>
    </div>
    </>
  );
}

export default ProfilePage;