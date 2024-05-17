import React from "react";
import contacts from '../all books/componenta/contacts';
import Card from '../all books/componenta/card';
import "./allbooks.css";


function allcards(props){
    return(
        <Card
            key = {props.key}
            Name = {props.name}
            Image = {props.imgURL}
            Phone = {props.phone}
            Email = {props.email}
        />

    );
}

function AllBooks(){
    return(<>
        <div id="heading-books">
        <h1>Welcome To Ocean Of Books</h1>
        </div>
        <div id="all-card">
        {contacts.map(allcards)}
        </div>
        </>
    );
}

export default AllBooks;