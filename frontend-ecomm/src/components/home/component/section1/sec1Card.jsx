import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = (props) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/products', {
            state: {
                title: props.title,
                image: props.image,
                author: props.author,
                price: props.price,
                rating: props.rating,
            },
        });
    };

    return (
        <div id='card-sec1' onClick={handleClick}>
            <div className="blur-overlay"></div>
            <div id='sec1cardImg' style={{ display: "visible" }}>
                <img
                    alt="alt"
                    src="https://img.freepik.com/premium-vector/black-sign-that-says-book-story-reading-reading-reading-club_1212397-20.jpg?w=740"
                    style={{ position: "absolute" }}
                />
                <img src={props.image} alt='Books' style={{ position: "inherit" }} />
            </div>
            <div id='hoverMenuOnCard'>
                <div id='sec1cardtitle'>
                    <p>{props.title}</p>
                </div>
                <div id='sec1cardauthor'>
                    <p>{props.author}</p>
                </div>
                <div id='sec1cardrating'>
                    <div id='rate'>Ratings :</div> <div id='point'>{props.rating.toFixed(2)}</div>
                </div>
                <div id='sec1cardprice'>
                    <p><b>Price :</b> {props.price} ₹</p>
                </div>
            </div>
        </div>
    );
};

export default BookCard;
