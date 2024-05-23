import React from "react";
import "./feature.css";
function OrderPage(){
    return <>
        <main id="OrderSec">
            <section id="OrdrSec1">
                <aside id="ordr1">
                    <box style={{float:"left"}}>1</box>
                    <span>LOGGED In As</span><br/>
                    <a style={{float:"left"}}>Rahul</a>
                    <a> Logout</a>

                </aside>
                <aside id="ordr2">
                <box style={{float:"left"}}>2</box>
                DELIVERY ADDRESS
                    <div id="ordr2address">
                        <input type="checkbox" defaultChecked/>
                        <span> Name</span> <br/>
                        <span>Total ADDRESS</span>
                    </div>
                </aside>
                <aside id="ordr3">
                <box style={{float:"left"}}>3</box>

                <button> Add New ADDRESS</button>
                </aside>
                <aside id="ordr4">
                <box style={{float:"left"}}>4</box>
                <span>Order Summary</span>
                </aside>
                <aside id="ordr5">
                <box style={{float:"left"}}>5</box>
                <span>Payment Option</span>
                </aside>
            </section>
            <section id="OrdrSec2">
                <aside>
                    PRICE DETAILS
                </aside>
                <aside>
                    <span>Price ( item) </span> <span> 69 Rupess</span>
                    <span> Delivery Charges</span> <span> 69 Rupess</span>
                    <span> Packing Charges</span> <span> 69 Rupess</span>
                    <span> Total Payable</span> <span> 207 Rupess</span>
                </aside>
            </section>


        </main>
    </>
        
}


export default OrderPage;