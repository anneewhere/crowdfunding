//Data
import { useState, useEffect } from "react";
import { useParams, Link, useOutletContext } from "react-router-dom" //helps us access the URL id 
import PledgeForm from "../components/PledgeForm/PledgeForm";
import ProjectEditForm from "../components/ProjectForm/ProjectEditForm";


import "./ProjectPage.css";

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
    <h2 id="project-title">{project.title}</h2>
      <div className="container">
        <div className="item-left">
          <img id="project-image" src={project.image} />
        </div>
        <div className="item-right">
        <p className={`${project.is_open ? "is_open" : "is_closed"}`}>  
       {` \u{1F7E2} ${project.is_open ? "We are taking pledges!" : "\u{1F534} This project is closed"}`}
          </p>
        <p>Created on: {date.toLocaleDateString()}</p>
        <p>{project.description}</p>
        </div>
      </div>
      <h3 className="pledge-title"> {`\u{1F970}`} Thank you to all the supports below! {`\u{1F970}`}</h3>
      <ul className="pledge-list">
        {project.pledges.map((pledgeData, key) => {
          return (
            <li id="pledge-items" key={key}>
              ${pledgeData.amount} from {pledgeData.supporter}
            </li>
          );
        })}
      </ul>
    <h3 className="pledge-title"> {`\u{1F447}`} Help by submitting a pledge below! {`\u{1F447}`} </h3>
    {!authToken && <Link to="/login">Login to Submit a pledge</Link>}
    {authToken && <PledgeForm project={project}/>}
    </div>

    </>
  );
}

export default ProjectPage;