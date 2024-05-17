import React from "react"; 
// import Avatar from "./avatar";
// import Details from "./details";

function Card(props){
return<>
    <div id="main-Cards">
        <div id="card-img">
            <img src={props.Image} alt="Avatar"/>
        </div>
        <div id="card-name">
            <h1>{props.Name}</h1>
        </div>
        <div id="card-details">
            <span>
                {props.Email}<br/>
                {props.Phone}
            </span>
        </div>
    </div>
</>
}

export default Card;