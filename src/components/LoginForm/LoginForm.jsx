import { useState } from "react";
import { useNavigate,  useOutletContext } from "react-router-dom";

function LoginForm() {
    
    //State
    const [, setLoggedIn] = useOutletContext();

    const [credentials, setCredentials] = useState({
        username:"",
        password:"",
    });

    //Hooks
    const navigate = useNavigate(); //using the function useNavigate from react-router-dom.

    //Actions
    //everytime input changes, it calls this function called handleChange. 
    //whenever we call this function, an event is passed through it. The target is the input (username,password input)
    // id=username, value=kimghwjd
    const handleChange = (event) => {
        const {id, value} = event.target;
        // we are taking the id and value out of the input. 

        setCredentials((prevCredentials) =>({
            ...prevCredentials, ///... doesn't give nested objects
            [id]: value,
        }));
    };

    const postData = async () => { //we are using async as we are doing await first
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}api-token-auth/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        return response.json();
      };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (credentials.username && credentials.password) { //is this input area is not empty,
            const { token } = await postData(); //calls the function above and returns JSON data
            window.localStorage.setItem("token", token); //when we set an item in local, we have to set a key and value
            window.localStorage.setItem("user.id", user.id);
            setLoggedIn(true); //if credentials correct, logged in status = true
        navigate("/"); //navigates to base url
        }
      };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            onChange={handleChange}
            placeholder="Enter username"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            onChange={handleChange}
            placeholder="Password"
          />
        </div>
        <button type="submit">
          Login
        </button>
      </form>
    );
  }
  
  export default LoginForm;