import React from 'react';

function Sec1Card(props){
    return <>
        <div id='card-sec1'>
            <div>
                <div id='sec1cardImg'>
                    <img src={props.image} alt='Books'/>
                </div>
                <div id='sec1cardtitle'>
                    <p>{props.title} </p>
                </div>
                <div id='sec1cardauthor'>
                    <p>{props.author} </p>
                </div>
            </div>
            <div>
                <div id='sec1cardrating'>
                <p>{props.rating}</p>
                </div>
                <div id='sec1cardprice'>
                <p>{props.price}</p>
                </div>
            </div>
        </div>
    </>
}

export default Sec1Card;