//copied from ProjectForms - need go change everything. just copied for now. 

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../LoginForm/LoginForm.css";

function SignUpForm() {
    //State
    const [user, setUser] = useState({
        username: "",
        first_name:"",
        last_name: "",
        email: "",
    });

    //Hooks
    const navigate = useNavigate();

    //Actions
    const handleChange = (event) => {
        const {id, value} = event.target;

        setUser((user) =>({
            ...user,
            [id]: value,
        }));
    };

    const postData = async () => {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}users/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );
        return response.json();
      };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // if (window.localStorage.getItem("token")) {
          console.log("token exists");
          await postData();
          navigate("/");
      };
      
    return (
    <>
    <h3>Create an account down below! {`\u{1F447}`}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            onChange={handleChange}
            placeholder="Enter username"
          />
        </div>
        <div className="form-item">
          <label htmlFor="first_name">First name:</label>
          <input
            type="text"
            id="first_name"
            onChange={handleChange}
            placeholder="Enter your first name"
          />
        </div>
        <div className="form-item">
          <label htmlFor="last_name">Last name:</label>
          <input
            type="text"
            id="last_name"
            onChange={handleChange}
            placeholder="Enter your last name"
          />
        </div>
        <div className="form-item" id="email-item">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            onChange={handleChange}
            placeholder="Enter your email here"
          />
        </div>
        <div className="form-item">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <button className="blue-btn" type="submit">
          Submit your Project
        </button>
      </form>
    </>
    );
  };
  
  export default SignUpForm;