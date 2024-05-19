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
    const [curentPage, setCurrentPage] = useState(1);
    const perPage = 5;

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


            
        const indexOfLastBook = curentPage* perPage;
        const indexOfFirstBook = indexOfLastBook - perPage;
        const indexOfCureentBook = recomPop.slice(indexOfFirstBook,indexOfLastBook);


        const previousPage = ()=>{
            if(curentPage > 1){
                setCurrentPage(curentPage-1);
            }
        }

        const nextPage = ()=>{
            if(curentPage*perPage < recomPop.length){
                setCurrentPage(curentPage+1);
            }
        }





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
                    
                        <div id="p1">
                        <button onClick={previousPage} disabled={curentPage === 1}>&lt;</button>
                        {indexOfCureentBook.map(allCrds)}
                        <button onClick={nextPage} disabled={curentPage * perPage >= recomPop.length}>&gt;</button>
                        </div>
                    
                </article>
         </main>
    );
}
export default Section1;
