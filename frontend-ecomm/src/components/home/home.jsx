import React,{useState, useEffect} from "react";
import "./Home.css";
import randomQuote from "../../qAPI/quotes.jsx";

function Home() {
    const [quote,setQuote] = useState('');
  useEffect(() => {
    const fetchQuote = async () => {
      const fetchedQuote = await randomQuote();
      setQuote(fetchedQuote);
    };

    fetchQuote();
    const interValid = setInterval(() => {
      fetchQuote(); // Fetch new quote every 10 sec
    }, 10000);
    return () => clearInterval(interValid); // just cleared the function
  }, []);
 

  return (
    <>
      <div id="main-contain">
          <div id="hero1">
            <div id="heading">

            <h1>Discover Your Next</h1><br/>
            <h1>Great Read</h1>

            </div>
            <div id="quotes">

            <p>{quote ? quote.content : "Loading quote..."}</p>
            <p>
              {"---> "}
              {quote ? quote.author : "Thinking.."} {" <---"}{" "}
            </p>

            </div>
            <div id="explore">
                <div id="button-ex">
              <a href="/"> Discover Knowledge</a>
              </div>
            </div>
          </div>


          <div id="hero2">

            <div id="video-sec">
            <video
                id="myVideo"
                controls
                src="https://videos.pexels.com/video-files/6956529/6956529-hd_1080_1920_24fps.mp4"
              ></video>
            </div>

          </div>

      </div>
    </>
  );
}

export default Home;
