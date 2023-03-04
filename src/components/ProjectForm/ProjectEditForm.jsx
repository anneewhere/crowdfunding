import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ProjectEditForm(props) {

    const { project } = props;

    //State
    const [projectDetails, setProjectDetails] = useState({
    // default values 
        amount: "",
        comment:"",
        anonymous: false,
        project: null,
    });

    //hooks
    const { id } = useParams();

    //Effects
    useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
    .then((results) => {return results.json();
    })
    .then((data) => {
        setProjectDetails(data);
    });
    }, []);

    // On Change
    const handleChange = (event) => {
        const {id, value} = event.target;

        setProjectDetails((projectDetails) =>({
            ...projectDetails,
            [id]: value,
            project: project.id,

        }));

        const authToken = window.localStorage.getItem("token");

        const postData = async () => { //we are using async as we are doing await first
            const response = await fetch(
            `${import.meta.env.VITE_API_URL}projects/`,
            {
                method: "put",
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
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="title">Title:</label>
            <input
                type="text"
                id="title"
                onChange={handleChange}
                value={project.title}
            />
            </div>
            <div>
            <label htmlFor="description">Description:</label>
            <input
                type="text"
                id="description"
                onChange={handleChange}
                value={project.description}
            />
            </div>
            <div>
            <label htmlFor="goal">Enter the $ goal:</label>
            <input
                type="text"
                id="goal"
                onChange={handleChange}
                value={project.goal}
            />
            </div>
            <div>
            <label htmlFor="image">Link an image for your project:</label>
            <input
                type="text"
                id="image"
                onChange={handleChange}
                value={project.image}
            />
            </div>
            <div>
                <label htmlFor="is_open">Activate Project:</label>
                <input type="checkbox" id="is_open" onChange={handleChange} />
                </div>
                <div>
                <label htmlFor="date_created">Date Created:</label>
                <input type="date" id="date_created" onChange={handleChange} />
                </div>
            <button type="submit">
            Update your Project
            </button>
        </form>
        );
    };

    };
  export default ProjectEditForm;