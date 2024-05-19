import React, { useEffect, useState } from "react";
// import contacts from '../all books/componenta/contacts';
import Card from '../all books/componenta/card';
import "./allbooks.css";
import RandomBooksAPI from "../../rapidAPI/rapid";


function allcards(props){
    
    return(
        <Card
            Name = {props.bookTitle}
            bookAuthor = {props.bookAuthor}
            Image = {props.bookImage}
        />

    );
}

function AllBooks(){
    const [books,setBooks] = useState([]);
    const [curentPage, setCurrentPage] = useState(1);
    const perPage = 15;

    useEffect(()=>{
        const allbooksShown = async()=>{
            const data = await RandomBooksAPI();
            if(data){
                console.log(data);
                setBooks(data);
            }
            
        }
        allbooksShown();
    },[]);


    const indexOfLastBook = curentPage* perPage;
    const indexOfFirstBook = indexOfLastBook - perPage;
    const indexOfCureentBook = books.slice(indexOfFirstBook,indexOfLastBook);


    const previousPage = ()=>{
        if(curentPage > 1){
            setCurrentPage(curentPage-1);
        }
    }

    const nextPage = ()=>{
        if(curentPage*perPage < books.length){
            setCurrentPage(curentPage+1);
        }
    }



    return(<>
        <div id="heading-books">
        <h1>Welcome To Ocean Of Books</h1>
        </div>
        <div id="previousPage">
        <button onClick={previousPage} disabled={curentPage === 1}> Previous Page</button>
        </div>
        
        <div id="nextPage">
        <button onClick={nextPage} disabled={curentPage * perPage >= books.length}> Next Page</button>
        </div>
        {curentPage}
        <div id="all-card">
        
        {indexOfCureentBook.map(allcards)}
        </div>

        <div id="previousPage">
        <button onClick={previousPage} disabled={curentPage === 1}> Previous Page</button>
        </div>
        
        <div id="nextPage">
        <button onClick={nextPage} disabled={curentPage * perPage >= books.length}> Next Page</button>
        </div>

        {/* <div>
        {books.slice(0, 5).map((book, index) => (
          <div key={index} className="book-card">
            <h2>{book.bookTitle}</h2>
            <img src={book.bookImage} alt={book.bookTitle} />
            <p>{book.bookAuthor}</p>
            <p>{book.bookDescription}</p>
            <p>Publisher: {book.bookPublisher}</p>
            <p>ISBN: {book.bookIsbn}</p>
            <p>Rank: {book.bookRank}</p>
            <a href={book.amazonBookUrl} target="_blank" rel="noopener noreferrer">Buy on Amazon</a>
          </div>
        ))}
        </div> */}
        </>
    );
}

export default AllBooks;