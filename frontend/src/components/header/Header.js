import React, { useState, useEffect } from "react"; //useState to manage state. useEffect to side effects that effects something outside of component e.g fetch data from API hence the JWT
import { Link, useNavigate } from "react-router-dom"; // routing in react apps, nav between diff pages and components without reloading whole page. // useNavigate allows redirecting/linking to something else via code without physically clicking link (e.g., after login redirect to homepage)
import { useAuth } from "../../context/AuthContext";
import "./Header.css";

//setting up state this auth is set to false initially unless conditions below met
//custom hook to use auth context
const Header = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); //menu closed initially

  useEffect(() => {
    // Check if user is authenticated by looking for a JWT token in local storage
    //if token found, isAuth state set true
    //useState for tracking changes in components over time
    //useEffect for things outside of component e.g fetch data from API (side effects that affect things outside of component)
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated]); //empty dependency array- effect only runs once after initial render
  //dependency array tells react when to run effect function

  const handleLogout = () => {
    // Remove the token from local storage and update the authentication state
    //then isAuth state set to false

    localStorage.removeItem("token");
    setIsAuthenticated(false);
    //REDIRECT TO THE SIMPLE HOMEPAGE after logout
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  }; //toggles/flips state of menuOpen from true(open) to false (closed)

  //conditional rendering of Log Out button, if a user is authenticated, then we want to see the log out button
  //We want to see Login and Register links in the header (unless you've logged in- then see sign out button)
  return (
    <header className="header-container">
      <div className="header-content">
        <h1 className="logo">
          <Link className="nav-link" to="/">
            {" "}
            Home{" "}
          </Link>
        </h1>
        <nav className="desktop-nav">
          {isAuthenticated ? (
            <>
              <button className="btn-logout" onClick={handleLogout}>
                Log Out
              </button>
              <Link className="nav-link" to="/landing">
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link className="nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-link" to="/register">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
      <div
        id="burger-menu"
        className={menuOpen ? "close" : ""}
        onClick={toggleMenu} //user click event handler calls togglemenu when ☰ clicked
      >
        ☰
      </div>

      <div id="menu" className={menuOpen ? "overlay" : ""}>
        <button className="close-menu" onClick={toggleMenu}>
          X
        </button>
        <nav>
          <ul>
            {isAuthenticated ? (
              <>
                <li>
                  <button className="btn-logout" onClick={handleLogout}>
                    Log Out
                  </button>
                </li>
                <li>
                  <Link className="nav-link" to="/landing" onClick={toggleMenu}>
                    Profile
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="nav-link" to="/login" onClick={toggleMenu}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/register" onClick={toggleMenu}>
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
