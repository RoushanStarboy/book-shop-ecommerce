import React,{useEffect, useState}  from "react";
import Logo from "../logo/logo";
import "./footer.css";

function Footer(){


    return(
        <main id="total-footer">
            <section className="footerSec" id="footerSec1">

                    <p>CONNECT WITH US</p>
                    <ul>
                        
                    <li>Facebook</li>
                    <li>Instagram</li>
                    <li>Twitter</li>
                    <li>LinkedIn</li>
                    <li>YouTube</li>
         
                    </ul>
            </section>
            <section className="footerSec" id="footerSec2">
            <div className="mainlogo">
                    <Logo/>
                </div>
            </section>
            <section className="footerSec" id="footerSec3">
                <p>Spacially for You, Dear</p>

            </section>

        </main>
    );

}


export default Footer;