import React from 'react';
import "./section1.css";
import { NavLink } from 'react-router-dom';



function Sec1Card(props){

    const roundedRating = props.rating.toFixed(1);
    return <>
    <NavLink to="/products">
        <div id='card-sec1'>
        <div class="blur-overlay"></div>
            
                <div id='sec1cardImg'  style={{display:"visible"}}>
                <img alt="alt" src="https://img.freepik.com/premium-vector/black-sign-that-says-book-story-reading-reading-reading-club_1212397-20.jpg?w=740" style={{position:"absolute"}}/>
                <img src={props.image} alt='Books' style={{position:"inherit"}}/>
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