import React,{useEffect, useState}  from "react";
import "./footer.css";

function Footer(){

    const [mainlogohere, setMainLogoHere] = useState("true");


    useEffect(()=>{
            const interval = setInterval(()=>{
                setMainLogoHere(sonething => !sonething);
            },1000);

            return () =>  clearInterval(interval);
    },[]);

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
            <div className="mainlogo" style={{display:mainlogohere?"block":"none"}}>
                    <span>Cadymart</span>
                </div>
            <div className="secondlogo" style={{display:mainlogohere?"none":"block"}}>
                <span>C M</span>
            </div>
            </section>
            <section className="footerSec" id="footerSec3">
                <p>Spacially for You, Dear</p>

            </section>

        </main>
    );

}


export default Footer;