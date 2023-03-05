import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../PledgeForm/PledgeForm.css";

function ProjectForm(props) {

const { project } = props;

    //State
    const [projectDetails, setprojectDetails] = useState({
        title: "",
        description:"",
        goal: "",
        image: "",
        date_created: null,
        is_open: true,
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

    const authToken = window.localStorage.getItem("token");

    const postData = async () => { //we are using async as we are doing await first
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}projects/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${authToken}`,
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
    <>
    <h2>Get help from the paw community <br/> by submitting a project below!</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            onChange={handleChange}
            placeholder="Enter title"
          />
        </div>
        <div className="form-item">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            onChange={handleChange}
            placeholder="Add a description here"
          />
        </div>
        <div className="form-item">
          <label htmlFor="goal">Enter the $ goal:</label>
          <input
            type="text"
            id="goal"
            onChange={handleChange}
            placeholder="Add your goal here"
          />
        </div>
        <div className="form-item">
          <label htmlFor="image">Link an image for your project:</label>
          <input
            type="text"
            id="image"
            onChange={handleChange}
            placeholder="Add your image URL here"
          />
        </div>
        <div className="form-item" id="activate-project">
              <label htmlFor="is_open">Activate Project:</label>
              <input type="checkbox" id="is_open" onChange={handleChange} />
          </div>
          <div className="form-item">
              <label htmlFor="date_created">Date Created:</label>
              <input type="date" id="date_created" onChange={handleChange} />
          </div>
        <button type="submit" className="blue-btn" id="project-btn">
          Submit your Project
        </button>
      </form>
    </>
    );
  };

  
  export default ProjectForm;