import { LOGO_URL } from "../utils/constants";
import { useEffect, useState} from "react";
import {Link} from "react-router-dom"
const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  //If dependency array is defined, then useEffect is called whenenvever it is updated
  //If nothing is passed then useEffect will be called every time the componennt is renderred
  //If an empty array is passed then useEffect will be called only one time on itial render
  useEffect(() => {
    console.log("Hello");
  },[btnNameReact]);//state 
  return (
    <div className="header">
      <div className="logo-container">
        <img className="logo" src={LOGO_URL}></img>
      </div>
      <div className="nav-items">
        <ul>
          <li><Link to = '/'>Home</Link></li>
          <li><Link to = '/about'>About Us</Link></li>
          <li><Link to = '/contact'>Contact Us</Link></li>
          <li><Link to = '/cart'>Cart</Link></li>
          <button
            onClick={() => {
              const status = btnNameReact == "Login" ? "Logout" : "Login";
              setBtnNameReact(status);
            }}
            className="btn-login"
          >
            {btnNameReact}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
