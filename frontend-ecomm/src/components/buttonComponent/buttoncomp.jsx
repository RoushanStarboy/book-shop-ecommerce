// components/CustomBox.js
import React from "react";
import "./buttoncomp.css";
import { NavLink } from "react-router-dom";
const CustomFeature = ({ onClick }) => {
  return (
    <div id="fixed-button" onClick={onClick}>
      <div id="peak">
        p<br />
        e<br />
        a<br />
        k<br />
      </div>
      <div id="unfoald">
        <span> Your Cart </span>
        <div style={{whiteSpace:"nowrap"}}>
          <span>Book Name</span> : 1  <button style={{maxHeight:"10%", maxwidth:"20%", minWidth:"20px", borderRadius:"50%",backgroundColor:"white",color:"#262682", border:"0", fontWeight:"800"}}>-</button>  <button style={{maxHeight:"10%", maxwidth:"20%", minWidth:"20px", borderRadius:"50%",backgroundColor:"white",color:"#262682", border:"0", fontWeight:"800"}}>+ </button><br/>
          <span>Book Name</span> : 1  <button style={{maxHeight:"10%", maxwidth:"20%", minWidth:"20px", borderRadius:"50%",backgroundColor:"white",color:"#262682", border:"0", fontWeight:"800"}}>-</button>  <button style={{maxHeight:"10%", maxwidth:"20%", minWidth:"20px", borderRadius:"50%",backgroundColor:"white",color:"#262682", border:"0", fontWeight:"800"}}>+ </button><br/>
          <span>Book Name</span> : 1  <button style={{maxHeight:"10%", maxwidth:"20%", minWidth:"20px", borderRadius:"50%",backgroundColor:"white",color:"#262682", border:"0", fontWeight:"800"}}>-</button>  <button style={{maxHeight:"10%", maxwidth:"20%", minWidth:"20px", borderRadius:"50%",backgroundColor:"white",color:"#262682", border:"0", fontWeight:"800"}}>+ </button><br/>
          <span>Book Name</span> : 1  <button style={{maxHeight:"10%", maxwidth:"20%", minWidth:"20px", borderRadius:"50%",backgroundColor:"white",color:"#262682", border:"0", fontWeight:"800"}}>-</button>  <button style={{maxHeight:"10%", maxwidth:"20%", minWidth:"20px", borderRadius:"50%",backgroundColor:"white",color:"#262682", border:"0", fontWeight:"800"}}>+ </button><br/>
          <span>Book Name</span> : 1  <button style={{maxHeight:"10%", maxwidth:"20%", minWidth:"20px", borderRadius:"50%",backgroundColor:"white",color:"#262682", border:"0", fontWeight:"800"}}>-</button>  <button style={{maxHeight:"10%", maxwidth:"20%", minWidth:"20px", borderRadius:"50%",backgroundColor:"white",color:"#262682", border:"0", fontWeight:"800"}}>+ </button><br/>
          <NavLink> Detais </NavLink>
        </div>
      </div>
    </div>
  );
};

export default CustomFeature;
