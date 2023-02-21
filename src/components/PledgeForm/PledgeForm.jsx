import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PledgeForm() {
    //State
    const [pledgeDetails, setpledgeDetails] = useState({
        amount: "",
        comment:"",
        anonymous: "",
        project: "",
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

        setpledgeDetails((pledgeDetails) =>({
            ...pledgeDetails, ///... doesn't give nested objects
            [id]: value,
        }));
    };

    const postData = async () => { //we are using async as we are doing await first
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}pledges/`,
          {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(pledgeDetails),
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
          <label htmlFor="amount">Amount:</label>
          <input
            type="text"
            id="amount"
            onChange={handleChange}
            placeholder="Enter Amount"
          />
        </div>
        <div>
          <label htmlFor="comment">Comment:</label>
          <input
            type="text"
            id="comment"
            onChange={handleChange}
            placeholder="Add a Comment"
          />
        </div>
        <div>
          <label htmlFor="Anonymous">Would you like to stay Anonymous:</label>
          <input
            type="radio"
            id="anonymous"
            onChange={handleChange}
            value="Yes"
            name="anonymous"
          />
            <label for="yes">Yes</label>
         <input
            type="radio"
            id="anonymous"
            onChange={handleChange}
            value="No"
            name="anonymous"
          />
            <label for="No">No</label>
        </div>
        <div>
          <label htmlFor="Project">Choose the Project:</label>
          <input
            type="comment"
            id="comment"
            onChange={handleChange}
            placeholder="Add a Comment"
          />
        </div>
        <button type="submit">
          Submit Pledge
        </button>
      </form>
    );
  }
  
  export default PledgeForm;