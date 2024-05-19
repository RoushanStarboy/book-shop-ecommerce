import React, { useEffect, useState } from "react";
import "./section1.css";
import Recommend_popular from "../../../../topRecom/recommend_popular";
import Sec1Card from "./sec1Card";

function allCrds(props){
    return<Sec1Card
        image = {props.image}
        author = {props.author}
        title = {props.title}
        rating  = {props.rating}
        price   = {props.price}
    />

}



function Section1(){

    const [recomPop, setRecomPop] = useState([]);

        useEffect(()=>{
            const allrecom = async () => {
                try {
                  const data = await Recommend_popular();        // Fetch data
                  if (data.top_books) {                         // Checking if the 'top_books' key exists
                    setRecomPop(data.top_books);                // changing State here <<><><><>>
                  } else {
                    console.error('Data received does not contain \'top_books\':', data);
                  }
                } catch (error) {
                  console.error('Failed to fetch data:', error);
                }
              };
              allrecom();
            
        },[]);




    return(

        <main id="section1">
                <article id="sc1ar1">
                    <h1>BUY A BOOK, EMPOWER A MIND.</h1>
                    <span>Explore our selection of inspiring books that give back to important causes.<hr/></span>
                    <hr/>
                </article>
                
                <article id="sc1ar2">
                    <aside id="as1">
                        <aside id="as1p1">
                            <p>BUY GOOD</p>
                        </aside>
                        <aside id="as1p2">
                            <p>DO GOOD</p>
                        </aside>
                    </aside>
                    <hr/>
                </article>

                <article id="sc1ar3">
                    <div id="recom">
                        <div id="p1">
                        {recomPop.map(allCrds)}
                        </div>
                    </div>
                </article>
         </main>
    );
}
export default Section1;
