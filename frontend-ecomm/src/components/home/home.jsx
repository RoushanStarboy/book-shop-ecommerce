import React, {useState, useEffect} from 'react';
import './Home.css';
import randomQuote from "../../qAPI/quotes.jsx";
import hero from "./component/hero.png";


function Home() { 
  const [quote, setQuote] = useState(null); // State to store the quote

  useEffect(() => {
    const fetchQuote = async () => {
      const fetchedQuote = await randomQuote();
      setQuote(fetchedQuote); 
    };

    fetchQuote();
    const interValid = setInterval(() => {
      fetchQuote();   // Fetch new quote every 10 sec
    }, 10000);
    return () => clearInterval(interValid); // just cleared the function
  }, []);


  return (
    <>
    <div className="home-container">
      <div id='hero1'>
        <h1>Discover Your Next</h1>
        <h1>Great Read</h1>
        <div id="quote-hero">
        <p>{quote ? quote.content : 'Loading quote...'}</p>
        <p>{quote ? quote.author : 'Thinking..'}</p>

        </div>
      </div>
      <div id="hero2">
        <img id= "heroimg" src={hero} alt='hero'/>
      </div>
    </div>
    <div id="takeitdown">
      <div id="port">
        <a href='/'> Discover Knowledge</a>
      </div>
    </div>
  </>
  );
}

export default Home;
