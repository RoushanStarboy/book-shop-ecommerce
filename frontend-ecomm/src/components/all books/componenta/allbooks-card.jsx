import React from "react";
import contacts from './contacts';
import Card from './card';


function Allcards(props){
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

function AllcardsBooks({limit}){
    return(<>
        <div id="recom-card">
        {contacts.slice(0,limit).map(Allcards)}
        </div>
        </>
    );
}

export default AllcardsBooks;