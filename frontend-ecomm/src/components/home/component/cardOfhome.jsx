import React from "react";
import "./cardOfHome.css";
function CardOfHome (props){
    return<>
        <main id="cardOfHome">
            <div id="homeImage" style={{backgroundColor: "white", minHeight: "350px", minWidth:" 100%", borderRadius: "inherit"}}>
                <img src= {props.Image} alt="book"/>
            </div>
            <div id="homeImage" style={{display:"none"}}>
                <p> {props.Name} </p>
            </div>
            <div id="homeImage" style={{display:"none"}}>
            <p> {props.Author} </p>
            </div>
            <div id="homeImage" style={{display:"none"}}>
            <p> {props.Price} </p>
            </div>
        </main>
    </>
}

export default CardOfHome;