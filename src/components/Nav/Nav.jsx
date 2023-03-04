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
        <ul>
            <li><Link to="/" >Home</Link></li>
            <li class="nav-right">{!authToken && <Link to="/login" className="btn">Login In</Link>}</li>
            <li class="nav-right">{!authToken && <Link to="/signup" className="btn">Sign Up Here</Link>}</li>
            <li>{authToken && <Link to="/submit-project" className="btn">Create a Project</Link>}</li>
            <li>{authToken && <button onClick={handleClick}>Sign Out</button>}</li>
        </ul>
    );
}
export default Nav;