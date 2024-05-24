import React, { useState, useEffect } from "react";
import "./aboutus.css";

function Aboutus() {
    const [fileContent, setFileContent] = useState("");

    useEffect(() => {
        // function to fetch and read the text file
        const fetchTextFile = async () => {
            try {
                const response = await fetch('https://baconipsum.com/api/?callback=?');
                const text = await response.text();
                setFileContent(text);
            } catch (error) {
                console.log("The Error: " + error.message);
            }
        }
        fetchTextFile();
    }, []);

    return (
        <>
            <main style={{marginBottom:"100px"}}>

                <h1 style={{fontFamily: "Poetsen One"}}>About Us - BookNest.in</h1>

                <p>
                    Welcome to BookNest.in, your ultimate online destination for a vast collection of books across genres. At BookNest.in, we believe in the power of reading to inspire, educate, and transform lives. Our mission is to create a seamless and enjoyable shopping experience for book lovers everywhere, providing easy access to a wide range of books at competitive prices.
                </p>
                <h3 style={{fontFamily: "Poetsen One"}}>
                    Our Story
                </h3>

                <p>
                    BookNest.in was founded with a passion for books and a vision to make them accessible to everyone, regardless of location. We started as a small online bookstore, and with the support and trust of our customers, we have grown into a leading e-commerce platform dedicated to book enthusiasts. Our journey is driven by a love for literature and a commitment to spreading the joy of reading.
                </p>
                <h3 style={{fontFamily: "Poetsen One"}}>What We Offer</h3>
                <ul>
                    <li>
                        Extensive Collection: From bestsellers and classics to rare finds and academic texts, our diverse catalog caters to all age groups and interests. Whether you’re looking for the latest releases, timeless novels, or niche genres, we have something for everyone.
                    </li>
                    <li>
                        User-Friendly Interface: Our website is designed to provide a smooth and hassle-free shopping experience. Easily navigate through categories, search for specific titles, and enjoy a seamless checkout process.
                    </li>
                    <li>Competitive Pricing: We offer competitive prices on all our books, ensuring that you get the best value for your money. Keep an eye out for our regular discounts and special offers.
                    </li>
                    <li>Fast and Reliable Delivery: We understand the excitement of receiving a new book. That’s why we partner with reliable delivery services to ensure your orders reach you quickly and safely.
                    </li>
                    <li>
                        Customer Satisfaction: Our customers are at the heart of everything we do. Our dedicated customer service team is always ready to assist you with any queries or concerns, ensuring a delightful shopping experience every time.
                    </li>
                </ul>
                <h3 style={{fontFamily: "Poetsen One"}}>Our Vision</h3>
                <p>At BookNest.in, our vision is to be the go-to online bookstore for readers across the country. We aim to foster a community of book lovers, where people can explore, discover, and share their love for reading. By continuously expanding our collection and enhancing our services, we strive to make BookNest.in the preferred choice for book buyers.

                    Join Us on Our Journey

                    We invite you to explore our website and discover the joy of reading with BookNest.in. Whether you’re an avid reader, a student, or someone looking for a thoughtful gift, we are here to cater to all your book needs. Thank you for choosing BookNest.in – where every book finds a home.

                    Feel free to customize this content to better fit your brand’s voice and specific offerings.</p>
            </main>

        </>
    );
}

export default Aboutus;
