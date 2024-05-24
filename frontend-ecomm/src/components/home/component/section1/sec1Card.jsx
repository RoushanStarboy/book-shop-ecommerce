import React from 'react';
import "./section1.css";
import Navbar from '../../../Nav/navbar';
import { NavLink } from 'react-router-dom';



function Sec1Card(props){

    const roundedRating = props.rating.toFixed(1);
    return <>
    <NavLink to="/products">
        <div id='card-sec1'>
        <div class="blur-overlay"></div>
            
                <div id='sec1cardImg'  style={{display:"visible"}}>

                    <img src={props.image} alt='Books'/>
                </div>
                
                <div id='hoverMenuOnCard'>
                    
                            <div id='sec1cardtitle'>
                                <p>{props.title} </p>
                            </div>
                            <div id='sec1cardauthor'>
                                <p>{props.author} </p>
                            </div>
                                
                            <div id='sec1cardrating'>
                            <div id='rate'>Ratings :</div> <div id='point'>{roundedRating}</div>
                            </div>
                            <div id='sec1cardprice'>
                            <p><b>Price :</b> {props.price} ₹</p>
                            </div>
                    
                </div>
                
        </div>
        </NavLink>
    </>
}

export default Sec1Card;