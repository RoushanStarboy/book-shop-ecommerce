import React, { useState, useEffect } from "react";
import "./Home.css";
import Section1 from "./component/section1/section1.jsx";
import randomQuote from "../../qAPI/quotes.jsx";
import Section2 from "./component/section2/section2.jsx";


async function Testing(){
  try {
    const response = await fetch('http://127.0.0.1:8000/recommender/rando/');
    const randomData = await response.json();
    return randomData;
    
  } catch (error) {
    console.log(error.message);
    return null;
  }
} 


function Home() {
  const [quote, setQuote] = useState("");
  const [randoData, setRandoData] = useState({Name : "", occ :"", year : "",image : ""})

  useEffect(() => {
    const fetchQuote = async () => {
      const fetchedQuote = await randomQuote();
      setQuote(fetchedQuote);
    };

    const getRandomData = async()=>{
      const data = await Testing();
      setRandoData(data);
    }
    getRandomData();
    fetchQuote();
    const interValid = setInterval(fetchQuote, 10000);
    return () => clearInterval(interValid);
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
            <form action="/allbooks" method="POST">
              <input placeholder="What's in your mind ?" name="search" />
              <button type="submit">
                <i class="fa fa-search"></i>
              </button>
            </form>
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
          <div style={{display:"flex", flexDirection:"column", position:"absolute",top:"20%",right:"2%", height:"300px", width:"300px",backgroundColor:"green",opacity:"0.8",zIndex:"9999", borderRadius:"50px", justifyContent:"center",alignItems:"center", lineHeight:"0.5", color:"white", fontWeight:"800", fontSize:"20px"}}>
              <img src={randoData.image} alt="test" style={{height:"150px",width:"150px", opacity:"1", borderRadius:"50px",marginBottom:"30px"}}/>
              <p> {randoData.Name}</p>
              <p>{randoData.occ}</p>
              <p>{randoData.year}</p>
              
            </div>
        </section>
      </section>
      <Section1 />
      <Section2 />
    </main>
  );
}

export default Home;
