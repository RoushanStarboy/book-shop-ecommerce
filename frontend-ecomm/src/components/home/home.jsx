import React, { useState, useEffect } from "react";
import "./Home.css";
import "./component/cardOfHome.css";
import Section1 from "./component/section1/section1.jsx";
import randomQuote from "../../qAPI/quotes.jsx";
import Section2 from "./component/section2/section2.jsx";
import CardOfHome from "./component/cardOfhome.jsx";


const backgroundImageUrl = "https://img.freepik.com/premium-vector/black-sign-that-says-book-story-reading-reading-reading-club_1212397-20.jpg?w=740";
function SearchAndRecom({ results }) {
  if (!results) return null;

  const { book_details } = results;
  return (
    <>
      <CardOfHome 
        Image={book_details['Image-URL-L']} 
        Name={book_details['Book-Title']}
        Author={book_details['Book-Author']}
        Price={book_details['Price']}
      />
    </>
  );
}

function Home() {
  const [quote, setQuote] = useState("");
  const [title, setTitle] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setResults(null);

    const formData = new FormData();
    formData.append('title', title);

    try {
      const response = await fetch('http://127.0.0.1:8000/recommender/search', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setResults(data);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('An error occurred while fetching data.');
    }
  };

  useEffect(() => {
    const fetchQuote = async () => {
      const fetchedQuote = await randomQuote();
      setQuote(fetchedQuote);
    };

    fetchQuote();
    const intervalId = setInterval(fetchQuote, 10000);
    return () => clearInterval(intervalId);
  }, []);

  const [on, setOn] = useState("none");

  const SearchON = () => {
    setOn("block");
  };
  const SearchClose = () => {
    setOn("none");
  };

  return (
    <main id="main-page">
      <section id="main-container">
        <video autoPlay muted loop className="background-video">
          <source src="https://media.istockphoto.com/id/1957450987/video/promo-sale-banner-wiggle-on-isolated-background-for-bookstore-bookshop-library-book-lover-e.mp4?s=mp4-640x640-is&k=20&c=jAq4oSxOHZTVJWGdXbhCwN_qFLA_fA_WjbNwID5fVuk=" />
        </video>

        <div id="searchbar" style={{ display: on, overflowY: "hidden" }}>
          <span id="closebtn" onClick={SearchClose} title="Close Overlay">
            ×
          </span>
          <div id="searchOn">
            <form onSubmit={handleSubmit}>
              <input
                placeholder="What's in your mind?"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>

          <div
            style={{
              height: "50%",
              width: "80%",
              display: "flex",
              position: "relative",
              top: "40%",
              left: "10%",
              gap: "10px",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "25%",
                backgroundColor: "#B2BEB5",
                borderRadius: "20px",
              }}
            >
              {error && <p>{error}</p>}
              {results && <SearchAndRecom results={results} />}
            </div>

            {results && results.recommendations && (
              <div style={{ display: "flex", flexDirection:"row", gap: "10px"}}>
                {results.recommendations.slice(0,5).map((book, index) => (
                  <div
                    key={index}
                    style={{
                      height: "70%",
                      width: "25%",
                      backgroundColor: "#B2BEB5",
                      borderRadius: "20px",
                      padding: "10px",
                      backgroundImage:`url(${backgroundImageUrl})`
                    }}
                  >
                    <img src={book['Image-URL-M']} alt="book Recom" style={{height:"100%", width:"100%", borderRadius:"inherit"}}/>
                    {/* <p>
                      {book['Book-Title']} by {book['Book-Author']}
                    </p> */}
                  </div>
                ))}
              </div>
            )}

            {/* <div
              style={{
                height: "70%",
                width: "25%",
                backgroundColor: "#B2BEB5",
                borderRadius: "20px",
              }}
            ></div>
            <div
              style={{
                height: "70%",
                width: "25%",
                backgroundColor: "#B2BEB5",
                borderRadius: "20px",
              }}
            ></div>
            <div
              style={{
                height: "70%",
                width: "25%",
                backgroundColor: "#B2BEB5",
                borderRadius: "20px",
              }}
            ></div> */}
          </div>
        </div>
        <section id="page1">
          <article id="article">
            <div id="heading">
              <h1>Discover Your Next</h1>
              <br />
              <h1>Great Read</h1>
            </div>
            <div id="quotes">
              <p>{quote ? quote.content : "Loading quote..."}</p>
              <p>
                {"---> "} {quote ? quote.author : "Thinking.."} {" <---"}
              </p>
            </div>
            <div id="explore">
              <div id="button-ex">
                <span onClick={SearchON}> Discover Knowledge</span>
              </div>
            </div>
          </article>
        </section>
      </section>
      <Section1 />
      <Section2 />
    </main>
  );
}

export default Home;
