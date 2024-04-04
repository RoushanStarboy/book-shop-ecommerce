import React, {useEffect,useState} from 'react';
import './Home.css';
import randomQuote from "../../qAPI/quotes";
// import { clear } from '@testing-library/user-event/dist/clear';

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
    }, 30000);
    return () => clearInterval(interValid); // just cleared the function
  }, []);

  return (
    <main className="home-container">
      <div className='logo'>
        <img src="https://www.creativefabrica.com/wp-content/uploads/2021/03/20/Mountain-logo-Design-Graphics-9785421-1-1-580x435.png" alt="logo" className="home-logo" />
      </div>
      <div className="home-content">
        <h1>Shop Your Dream Book</h1>
        <p>Consider the Book You Need, Not that what you want!</p>
        <button type="button">Order Now</button>
      </div>
      <p>{quote ? quote.content : 'Loading quote...'}</p>
      <p>{quote ? quote.author : 'Thinking..'}</p>
    </main>
  );
}

export default Home;
