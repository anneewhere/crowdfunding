//Data
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom" //helps us access the URL id 
import PledgeForm from "../components/PledgeForm/PledgeForm";

//dummy data
import { oneProject } from "../data";

function ProjectPage() {
//state
  const [project, setProject] = useState({pledges: []});

//hooks
  const { id } = useParams();

//Effects
useEffect(() => {
  fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
  .then((results) => {return results.json();
  })
  .then((data) => {
    setProject(data);
  });
}, []);

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
    <div id="pledge-form">
       < PledgeForm project={project} />
    </div>
    </>
  );
}

export default ProjectPage;