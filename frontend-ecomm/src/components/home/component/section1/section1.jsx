import React from "react";
import "./section1.css";
import AllcardsBooks from "../../../all books/componenta/allbooks-card";
function Section1(){
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
                        <AllcardsBooks limit={4}/>
                        </div>
                    </div>
                </article>
         </main>
    );
}
export default Section1;
