import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from '../all books/componenta/card';
import "./allbooks.css";
import { NavLink } from "react-router-dom";
import { ReactComponent as WelcomeSVG } from "./componenta/welcome.svg";


function AllBooks() {
    const [books, setBooks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const perPage = 15;

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/recommender/api/books/`, {
                    params: {
                        page: currentPage,
                        page_size: perPage
                    }
                });
                const data = response.data;
                if (data) {
                    setBooks(data.books);
                    setTotalPages(data.total_pages);
                }
            } catch (error) {
                console.error("Error fetching books:", error);
            }
        };
        fetchBooks();
    }, [currentPage]);

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            <div id="heading-books">
                <WelcomeSVG style={{height:"100%", width:"500%"}}/>

            </div>
            <div id="previousPage">
                <button onClick={previousPage} disabled={currentPage === 1}> Previous Page</button>
            </div>
            <div id="nextPage">
                <button onClick={nextPage} disabled={currentPage >= totalPages}> Next Page</button>
            </div>
            <NavLink to= "/products" style={{textDecoration:"none"}}>
            <div id="all-card">
            
                {books.map(book => (
                    
                    <Card
                        key={book.ISBN}
                        Name={book["Book-Title"]}
                        bookAuthor={book["Book-Author"]}
                        Image={book["Image-URL-L"]}
                    />
                    
                ))}
            
            </div>
            </NavLink>
            <div id="previousPage">
                <button onClick={previousPage} disabled={currentPage === 1}> Previous Page</button>
            </div>
            <div id="nextPage">
                <button onClick={nextPage} disabled={currentPage >= totalPages}> Next Page</button>
            </div>
        </>
    );
}

export default AllBooks;
