//Data
import { useState, useEffect } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom" //helps us access the URL id 
import PledgeForm from "../components/PledgeForm/PledgeForm";
import ProjectEditForm from "../components/ProjectForm/ProjectEditForm";

function ProjectPage(props) {
//state
  const [project, setProject] = useState({pledges: []});

//hooks
  const { id } = useParams();

  const [authToken, setAuthToken] = useOutletContext();

// //context
// const [authToken] = useState(window.localStorage.getItem("token"))

// const authToken = (window.localStorage.getItem("token"))
// console.log(authToken)

    // const { authToken, setAuthToken } = props;

  // const handleClick = () => {
  //     window.localStorage.removeItem("token")
  //     setAuthToken(false)
  // };

  //Effects
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
    .then((results) => {return results.json();
    })
    .then((data) => {
      setProject(data);
    });
  }, []);

  useEffect(() => {
    console.log(authToken);
  },[authToken]);

  //ISO string format from JSON data
  const date = new Date(project.date_created); // new Date() is a funciton in javascript ({object notation}) / (just that one value)

  return (
    <>
    <div>
      <h2>{project.title}</h2>
      <h3>Created on: {date.toLocaleDateString()}</h3>
      {/* <h3>{`Status: ${project.is_open}`}</h3> */}
      <h3 className={`${project.is_open ? "is_open" : "is_closed"}`}>  
        {`status: ${project.is_open ? "We are taking pledges!" : "This project is closed"}`}
        </h3>
      <h3>Pledges:</h3>
      <ul>
        {project.pledges.map((pledgeData, key) => {
          return (
            <li key={key}>
              {pledgeData.amount} from {pledgeData.supporter.username}
            </li>
          );
        })}
      </ul>
    </div>
    

    {!authToken && <Link to="/login">Login to Submit a pledge</Link>}
{/* //get mentor to fix this tomorrow */}

    </>
  );
}

export default ProjectPage;