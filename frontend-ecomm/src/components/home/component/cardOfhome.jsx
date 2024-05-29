import React from "react";
import "./cardOfHome.css";
function CardOfHome (props){
    return<>
        <main id="cardOfHome" style={{position:"relative"}}>
            <div id="homeImage" style={{backgroundColor: "white", minHeight: "350px", minWidth:" 100%", borderRadius: "inherit", position:"absolute"}}>
                <img src= {props.Image} alt="book"/>
            </div>
            <div style={{position:"absolute", color:"#43ce81", padding:"5%"}} id="recomHomeHOver">
            <div id="homeImage">
                <p> {props.Name} </p>
            </div>
            <p>By</p>
            <div id="homeImage">
            <p> {props.Author} </p>
            </div>
            <div id="homeImage" >
            <p> Price : {props.Price} Rupess</p>
            </div>
            </div>
        </main>
    </>
}

export default CardOfHome;