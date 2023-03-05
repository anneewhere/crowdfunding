import { Link } from "react-router-dom";
import "./nav.css";

// function Nav() {
//     return (
//     <nav>
//         <Link to="/">Home</Link>
//         <Link to="/project">Project</Link>
//         <Link to="/pledges">Pledges</Link>
//         <Link to="/projects/">Submit a</Link>
//     </nav>
//     );
// }

// export default Nav;

function Nav(props) {
    const { authToken, setAuthToken } = props;

    const handleClick = () => {
        window.localStorage.removeItem("token")
        setAuthToken(false)
    }
    return (
        <ul className="nav-list">
            <div className="nav-left">
            <li className="nav-item"><Link to="/" >Home</Link></li>
            </div>
            <div className="nav-right">
            <li className="nav-item" id="red-btn">{!authToken && <Link to="/login">Login In</Link>}</li>
            <li className="nav-item" id="sign-btn">{!authToken && <Link to="/signup">Sign Up Here</Link>}</li>
            <li className="nav-item" id="green-btn">{authToken && <Link to="/submit-project">Create a Project</Link>}</li>
            <li className="nav-item" >{authToken && <button onClick={handleClick}>Sign Out</button>}</li>
            </div>
        </ul>
    );
}
export default Nav;