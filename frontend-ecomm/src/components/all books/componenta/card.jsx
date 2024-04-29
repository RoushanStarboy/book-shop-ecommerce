import React from "react"; 
// import Avatar from "./avatar";
// import Details from "./details";

function Card(props){
return<>
    <div id="main-Cards">
        <div id="card-img">
            <img src={props.Image} alt="Avatar"/>
        </div>
        <div>
            <h1>{props.Name}</h1>
        </div>
        <div>
            <span id="card-details">
                {props.Email}
                {props.Phone}
            </span>
        </div>
    </div>
</>
}

export default Card;