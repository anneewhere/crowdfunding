import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./PledgeForm.css";

function PledgeForm(props) {

  const { project } = props;

    //State
    const [pledgeDetails, setpledgeDetails] = useState({
    // default values 
        amount: "",
        comment:"",
        anonymous: false,
        project: null,
    });

    //Hooks
    const navigate = useNavigate(); //using the function use Navigate from react-router-dom.
    const { id } = useParams();
    //Actions
    //everytime input changes, it calls this function called handleChange. 
    //whenever we call this function, an event is passed through it. The target is the input (username,password input)
    // id=username, value=kimghwjd
    const handleChange = (event) => {
        const {id, value} = event.target;
        // we are taking the id and value out of the input. 

        setpledgeDetails((pledgeDetails) =>({
            ...pledgeDetails, ///... doesn't give nested objects
            [id]: value,
            project: project.id,

        }));
    };

    // const postData = async () => { //we are using async as we are doing await first
    //     const response = await fetch(
    //       `${import.meta.env.VITE_API_URL}pledges/`,
    //       {
    //         method: "post",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(pledgeDetails),
    //       }
    //     );
    //     return response.json();
    //   };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const authToken = window.localStorage.getItem("token");

        if (authToken) {
          try {
            const response = await fetch(
            `${import.meta.env.VITE_API_URL}pledges/`,
            {
            method: "post",
            headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${authToken}`,
            },
            body: JSON.stringify(pledgeDetails),
            }
        );
        navigate("/");
      } catch (err) {
        console.error(err);
        }
      } else {
        navigate(`/login`); 
        
    };
  };
  
  //if creating new pledge then return:

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            onChange={handleChange}
            placeholder="Enter Amount"
          />
        </div>
        <div className="form-item">
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            id="comment"
            onChange={handleChange}
            placeholder="Add a Comment"
          />
        </div>
        <div className="form-item" id="anon-field">
          <label htmlFor="Anonymous">Would you like to stay Anonymous:</label>
          <input
            type="radio"
            id="anonymous"
            onChange={handleChange}
            value="True"
            name="anonymous"
          />
            <label for="yes">Yes</label>
         <input
            type="radio"
            id="anonymous"
            onChange={handleChange}
            value="False"
            name="anonymous"
          />
            <label for="No">No</label>
        </div>
        {/* <div>
          <label htmlFor="Project">Choose the Project:</label>
          <input
            type="Number"
            id="project"
            onChange={handleChange}
            placeholder="Add a Comment"
          />
        </div> */}
        <button className="blue-btn" id="pledge-btn" type="submit">
          Submit Pledge
        </button>
      </form>
    );
  }

  //if editing a form, then return below:
  
  export default PledgeForm;