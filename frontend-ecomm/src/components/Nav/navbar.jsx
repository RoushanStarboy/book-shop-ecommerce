import React, {useState} from "react";
import "./navbar.css";
import icon from "./icon/icon.png";
import { NavLink } from "react-router-dom";

function Navbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    return(
        <>
            <div className="nav">
                <div className="navPart1">
                    <img className="navlogo" src={icon} alt="Logo"/>
                </div>
                <div className="navPart2">
                    <div className="navlinks">
                        <NavLink to="/" className={(e)=>{return e.isActive? "active": ""}}>Home</NavLink>
                        <NavLink to="/about-us" className={(e)=>{return e.isActive? "active": ""}}>About Us</NavLink>
                        <NavLink to="/allbooks" className={(e)=>{return e.isActive? "active": ""}}>All Books</NavLink>
                        <NavLink to="/login" className={(e)=>{return e.isActive? "active": ""}}>Login</NavLink>
                    </div>
                    <div className="navicons">
                        <i class="ri-menu-3-line" onClick={()=>setIsMenuOpen(!isMenuOpen)}></i>
                            <div className="newNavlinks" style={{display:isMenuOpen? 'block': 'none'}}>
                                <NavLink to="/" className={(e)=>{return e.isActive? "newActive": ""}}>Home</NavLink>
                                <NavLink to="/Category" className={(e)=>{return e.isActive? "newActive": ""}}>Category</NavLink>
                                <NavLink to="/About" className={(e)=>{return e.isActive? "newActive": ""}}>About Us</NavLink>
                                <NavLink to="/login" className={(e)=>{return e.isActive? "newActive": ""}}>Login</NavLink>
                            </div>
                            <NavLink to="/cart" className={(e)=>{return e.isActive? "active": ""}}><i class="ri-shopping-cart-2-line"></i></NavLink>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Navbar;


