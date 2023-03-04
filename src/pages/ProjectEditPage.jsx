// Components
import ProjectEditForm from "../components/ProjectForm/ProjectEditForm";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom" //helps us access the URL id 

function ProjectEditPage() {

    const [project, setProject] = useState({pledges: []});
    //hooks
  const { id } = useParams();

    return <ProjectEditForm project={project}/>;
}

export default ProjectEditPage;