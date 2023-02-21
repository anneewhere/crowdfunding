import { useState, useEffect } from "react";

// Components
import ProjectCard from "../components/ProjectCard/ProjectCard";

// Data
import {allProjects} from "../data";

function HomePage() {
    //state
    //when we are using state the first variable, is the actual state itself, the second: the function to update the state
    const [projectList, setProjectList] = useState([]);

    
    // //useEffect code that runs whenever something changes. this renders teh UI AFTER the first render of the page. 
    // useEffect(() => {
    //     setProjectList(allProjects);
    // }, []); //if this array is empty, it will only run once. if there is value, everytime the value changes, it will run the useEffect again

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}projects`)
        .then((results) => {
          return results.json();
        }).then((data) => {
          setProjectList(data);
        });
    }, []);
        
    return (
        // <> //when we are returning in react, we can only return 1 child. therefore, we want to wrap all divs in a fragment <></>
       <>
       <div>
            <h1> Welcome to Paws2Paws</h1>
            <p>Did you break something unintentionally and you have to get it replaced or else you may be rehomed by your FUR-ious owner? Fear not! Our furry community can lend a helping paw! </p>
        </div>
        <div id="project-list">
            {projectList.map((project, key) => {
            return <ProjectCard key={key} projectData={project} />;
            })}
        </div>
        </>
    );
}

export default HomePage;