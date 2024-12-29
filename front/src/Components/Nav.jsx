import React, { useState,useRef} from "react";
import "./../App.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun ,faBars,faXmark} from "@fortawesome/free-solid-svg-icons";


function Nav() {
  const [darkMode, setDarkMode] = useState(false);
  const [menu,setMenu]=useState(false);
const navBar=useRef();
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.className = darkMode ? "light-theme" : "dark-theme";
  };

const handleMenu = () => {
  navBar.current.classList.add("open");
};

const handleClose = () => {
  navBar.current.classList.remove("open");
};
  return (
    <div className="co">
      <div className="cont">
        {/* Logo Section */}
        <div className="logo">
          <h2>BLOG</h2>
        </div>

    <div className="div"><div className="menu">
        <FontAwesomeIcon
        icon={faBars}
        style={{
        color: darkMode ? "white" : "black", 
        cursor: "pointer",
        transform: "scale(1.2)" // Corrected syntax for scaling effect
            }}
            onClick={()=>handleMenu()}
            ></FontAwesomeIcon>
        </div>

        <div className="nav-bar" ref={navBar}>
      
          <nav>
         
            <ul>
            <FontAwesomeIcon icon={faXmark} onClick={()=>handleClose()}className="close"></FontAwesomeIcon>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/allpost">All Posts</Link></li>
              <li><Link to="/post">Post</Link></li>
              
              <li><Link to="/login">Login/Register</Link></li>
            </ul>
          </nav>
          
        </div>
        

        {/* Theme Toggle */}
        <div className="theme" onClick={toggleTheme}>
        <FontAwesomeIcon
            icon={darkMode ? faSun : faMoon}
            style={{ color: darkMode?"white":"black", cursor: "pointer" }}
        />
        </div>
        
        


    </div>
    
    </div>
    </div>
);
}


export default Nav;
