import React from "react";
// import Avatar from "./avatar";
// import Details from "./details";

function Card(props) {
  // const getDynamicFontSize = (text) => {
  //   if (text.length > 20) {
  //     return "0.8rem"; // Smaller font size for longer text
  //   } else if (text.length > 10) {
  //     return "0.8rem"; // Medium font size for medium length text
  //   } else {
  //     return "1rem"; // Larger font size for shorter text
  // style={{ fontSize: getDynamicFontSize(props.bookAuthor) }}
  //   }
  // };
  return (
    <>
      <div id="main-Cards">
        <div id="card-img">
          <img src={props.Image} alt="Avatar" />
        </div>
        <div id="card-name">
          <h1>
            {props.Name}
          </h1>
        </div>
        <div id="card-name">
          <h1 >
            {props.bookAuthor}
          </h1>
        </div>
      </div>
    </>
  );
}

export default Card;
