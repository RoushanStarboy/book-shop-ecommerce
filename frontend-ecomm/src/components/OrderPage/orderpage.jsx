import React from "react";
import "./OrderPage.css";
import { NavLink } from "react-router-dom";
function OrderPage() {
  return (
    <>
      <main id="OrderSec">
        <section id="OrdrSec1">
          <aside id="ordr1">
          <div>
            <div style={{height:"10%", width:"3%", backgroundColor:"#262682",textAlign:"center",fontWeight:"600"}}>1</div>
            <span style={{color:"black", fontWeight:"600"}}>Logged in as </span>
            </div>
            <span style={{color:"black", fontWeight:"600", fontSize:"1.2em", backgroundColor:"#515190", padding:"10px", borderRadius:"10px"}}> Rahul</span>
            <span style={{color:"black", fontWeight:"600"}}><a href="/" style={{textDecoration:"none"}}>Logout </a></span>
          </aside>
          <aside id="ordr2">
            <div>
                <div style={{height:"10%", width:"3%", backgroundColor:"#262682",textAlign:"center",fontWeight:"600"}}>2</div>
                <span style={{color:"black", fontWeight:"600"}}>DELIVERY ADDRESS </span>
            </div>
            <div id="ordr2address">
              <input type="checkbox" defaultChecked />
              <span style={{color:"black", fontWeight:"600"}}> Name</span> <br />
              <span>Total ADDRESS</span>
            </div>
          </aside>
          <aside id="ordr3">
            <div style={{height:"70%", width:"3%", backgroundColor:"#262682",textAlign:"center",fontWeight:"600",marginRight:"20px",float:"left"}}>3</div>
            <button style={{backgroundColor:"transparent", border:"3px solid #515190", borderRadius:"10px",}}>Add Address</button>
          </aside>
          <aside id="ordr5">
            <div style={{height:"60%", width:"3%", backgroundColor:"#262682",textAlign:"center",fontWeight:"600",marginRight:"20px",float:"left"}}>5</div>
            <span style={{color:"black", fontWeight:"600"}}>Payment Option</span>
            <div>
                <input type="checkbox" checked/>
                <span> Cash On Delivery [COD]</span>
            </div>
          </aside>
        </section>
        <section id="OrdrSec2">
          <aside style={{color:"black", fontWeight:"600"}}>PRICE DETAILS</aside>
          <aside>
            <span>Price ( item) X 1 </span> <span> 69 Rupess</span><br/>
            <span> Delivery Charges</span> <span> 69 Rupess</span><br/>
            <span> Packing Charges</span> <span> 69 Rupess</span><br/><br/>
            <span> Total Payable</span> <span> 207 Rupess</span><br/><br/>
          </aside>
          <div id="buy" style={{maxHeight:"50px", position:"absolute",bottom:"10%", left:"30%"}}><NavLink> Buy</NavLink></div>
        </section>
      </main>
    </>
  );
}

export default OrderPage;
