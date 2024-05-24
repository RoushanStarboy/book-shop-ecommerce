import React, {useState} from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Logo from "../logo/logo";

function Navbar(){
    const [isMenuOpen, setIsMenuOpen] = useState(false);



    useGSAP(()=>{
        const tl = gsap.timeline()
        tl.from(".navPart1 span",{
            duration:0.8,
            y:-100,
            opacity:0,
        })
        const all = document.querySelectorAll(".navlinks a");
        tl.from(all,{
            duration:0.5,
            y:-50,
            opacity:0
        })
        document.querySelectorAll("a").forEach(element => {
            element.addEventListener("click", (e) => {
              e.target.style.transition = "all 0.5s ease-in-out";
            });
        });
    });

    
    return(
        <>
            <div className="nav">
                <div className="navPart1">
                <div className="mainlogoNav Navlogo" id="something1">
                    <span><Logo/></span>
                </div>
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


