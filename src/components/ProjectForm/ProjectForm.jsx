import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProjectForm() {
    //State
    const [projectDetails, setprojectDetails] = useState({
        title: "",
        description:"",
        goal: "",
        image: "",
    });

    //Hooks
    const navigate = useNavigate();

    //Actions
    const handleChange = (event) => {
        const {id, value} = event.target;
        // we are taking the id and value out of the input. 

        setprojectDetails((projectDetails) =>({
            ...projectDetails, ///... doesn't give nested objects
            [id]: value,
        }));
    };

    const postData = async () => { //we are using async as we are doing await first
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}projects/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(projectDetails),
          }
        );
        return response.json();
      };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (window.localStorage.getItem("token")) {
            console.log("token exists");
            await postData();
            navigate("/");
        }
        
      };

    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            onChange={handleChange}
            placeholder="Enter title"
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            onChange={handleChange}
            placeholder="Add a description here"
          />
        </div>
        <div>
          <label htmlFor="goal">Enter the $ goal:</label>
          <input
            type="text"
            id="goal"
            onChange={handleChange}
            placeholder="Add your goal here"
          />
        </div>
        <button type="submit">
          Submit your Project
        </button>
      </form>
    );
  }
  
  export default ProjectForm;