import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Card(props) {

  const navigate = useNavigate();

    const handleClick = () => {
        navigate('/products', {
            state: {
                title: props.Name,
                image: props.Image,
                price: props.price,
                author: props.bookAuthor,
            },
        });
    };
  const [isNameOverflowing, setIsNameOverflowing] = useState(false);
  const bookNameRef = useRef(null);

  const [isAuthorOverflowing, setIsAuthorOverflowing] = useState(false);
  const authorNameRef = useRef(null);

  const isOverflowing = (element) => {
    return element.scrollWidth > element.clientWidth;
  };

  useEffect(() => {
    const namecontainerText = bookNameRef.current;
    if (namecontainerText && isOverflowing(namecontainerText)) {
      setIsNameOverflowing(true);
    } else {
      setIsNameOverflowing(false);
    }

    const authorContainer = authorNameRef.current;
    if (authorContainer && isOverflowing(authorContainer)) {
      setIsAuthorOverflowing(true);
    } else {
      setIsAuthorOverflowing(false);
    }
  }, [props.Name, props.bookAuthor]);

  return (
    
    <div id="main-Cards" onClick={handleClick}>
    
      <div id="card-img" style={{position:"relative"}}>
        <img alt="alt" src="https://img.freepik.com/premium-vector/black-sign-that-says-book-story-reading-reading-reading-club_1212397-20.jpg?w=740" style={{position:"absolute", opacity:'0.5'}}/>
        <img src={props.Image} alt="Avatar" />
      </div>
      <div
        id="card-name"
        ref={bookNameRef}
        style={{ width: '200px', overflow: 'hidden', whiteSpace: 'nowrap' }}
      >
        <span className={isNameOverflowing ? "ismarquree" : ""}>{props.Name}</span>
      </div>
      <div id="card-author" ref={authorNameRef}>
        <span className={isAuthorOverflowing ? "ismarquree" : ""}>{props.bookAuthor}</span>
      </div>
      
    </div>
  );
}

export default Card;
