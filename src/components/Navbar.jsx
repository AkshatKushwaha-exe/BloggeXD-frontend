import { Link } from "react-router-dom";
import "../styles/Navbar.css"; // <-- Import Navbar CSS

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">My MERN Blog</Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/create" className="nav-link">Create Post</Link>
      </div>
    </nav>
  );
};

export default Navbar;