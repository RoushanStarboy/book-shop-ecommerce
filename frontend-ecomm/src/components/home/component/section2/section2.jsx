import React, { useState } from "react";
import "./section2.css";
import { NavLink } from "react-router-dom";
function Section2(){

        const [message,setMessage] = useState(false);
        const getTheMessage = ()=>{
            setMessage(true);
        }
        const closeTheMessage = ()=>{
            setMessage(false);
        }

    return(
        <main id="section2">
            <div className="fixsection2">
            <section id="sc2sc1p1">
            <p>Feeling lost?<br/> We believe you can find<br/> yourself between the pages.</p>
            </section>
            <section id="sc2sc2p1">
            <p>Step into a world of stories, step out with a purpose. Every book you choose at our bookstore fuels our mission to empower vulnerable women on their path to self-sufficiency. Your literary escape becomes their bridge to a brighter future.
            <br/> <br/>
            Start your own adventure and join us in rewriting their narratives, one page at a time.</p>
            <NavLink to="/allbooks"><span id="recom-link"> Explore Yourself<hr/> </span> </NavLink>
            </section>
            </div>
            <section id="sc2sc3p1">
            <p>More than just a bookstore, a community of change. Discover powerful stories and support a cause close to our hearts. Every book you choose empowers vulnerable women to break free from the cycle of disadvantage. Let's build a brighter future, one page at a time.</p>
            </section>
            <section id={message? "sc2sc3p2" :""} className='fixingMessage'>
                <span style={{display:message? "none":"block"}} onClick={getTheMessage}>Send Your Own Message</span>
                <form id="sec2form" style={{display: message? "block":"none"}}>
                    <label for="name"><b>Name</b></label>
                    <input type="text" placeholder="State Your Name maybe!" name="name" required/>
                    <label for="email"><b>Email</b></label>
                    <input type="email" placeholder="State Your Email here" name="email" required/>
                    <label for="message"><b>Your message</b></label>
                    <input type="text" placeholder="Tell Me" name="message" required/>
                    <button type="submit">Send</button><button id="messageClose" onClick={closeTheMessage}>X</button>
                </form>
            </section>
        </main>
    );
}

export default Section2;