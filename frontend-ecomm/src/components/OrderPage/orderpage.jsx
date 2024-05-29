import React, { useEffect, useState } from "react";
import "./OrderPage.css";
import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("STRIPE_PUBLISHABLE_KEY");

function OrderPage() {
  const location = useLocation();
  const { title, price } = location.state || {};
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    const fetchSessionId = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/cart/your_cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, price }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Session ID fetched:", data.session_id);
        setSessionId(data.session_id);
      } catch (error) {
        console.error('Error fetching session ID:', error);
      }
    };

    fetchSessionId();
  }, [title, price]);

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    if (!sessionId) {
      console.error('No session ID available');
      return;
    }

    const { error } = await stripe.redirectToCheckout({ sessionId });

    if (error) {
      console.error('Error during checkout:', error.message);
    }
  };

  return (
    <>
      <main id="OrderSec">
        <section id="OrdrSec1">
          <aside id="ordr1">
            <div>
              <div style={{ height: "10%", width: "3%", backgroundColor: "#262682", textAlign: "center", fontWeight: "600" }}>1</div>
              <span style={{ color: "black", fontWeight: "600" }}>Logged in as </span>
            </div>
            <span style={{ color: "black", fontWeight: "600", fontSize: "1.2em", backgroundColor: "#515190", padding: "10px", borderRadius: "10px" }}> Rahul</span>
            <span style={{ color: "black", fontWeight: "600" }}><a href="/" style={{ textDecoration: "none" }}>Logout </a></span>
          </aside>
          <aside id="ordr2">
            <div>
              <div style={{ height: "10%", width: "3%", backgroundColor: "#262682", textAlign: "center", fontWeight: "600" }}>2</div>
              <span style={{ color: "black", fontWeight: "600" }}>DELIVERY ADDRESS </span>
            </div>
            <div id="ordr2address">
              <input type="checkbox" defaultChecked />
              <span style={{ color: "black", fontWeight: "600" }}> Name</span> <br />
              <span>Total ADDRESS</span>
            </div>
          </aside>
          <aside id="ordr3">
            <div style={{ height: "70%", width: "3%", backgroundColor: "#262682", textAlign: "center", fontWeight: "600", marginRight: "20px", float: "left" }}>3</div>
            <button style={{ backgroundColor: "transparent", border: "3px solid #515190", borderRadius: "10px" }}>Add Address</button>
          </aside>
          <aside id="ordr5">
            <div style={{ height: "60%", width: "3%", backgroundColor: "#262682", textAlign: "center", fontWeight: "600", marginRight: "20px", float: "left" }}>5</div>
            <span style={{ color: "black", fontWeight: "600" }}>Payment Option</span>
            <div>
              <input type="checkbox" checked />
              <span> Cash On Delivery [COD]</span>
            </div>
          </aside>
        </section>
        <section id="OrdrSec2">
          <aside style={{ color: "black", fontWeight: "600" }}>PRICE DETAILS</aside>
          <aside>
            <p>{title}</p>
            <span>Price ({price * 1}) X 1 </span> <span> {price * 1} Rupess</span><br />
            <span> Delivery Charges</span> <span> 69 Rupess</span><br />
            <span> Packing Charges</span> <span> 69 Rupess</span><br /><br />
            <span> Total Payable</span> <span> {price * 1 + 69 + 69} Rupess</span><br /><br />
          </aside>
          <div id="buy" style={{ maxHeight: "50px", position: "absolute", bottom: "10%", left: "30%" }}>
            <button onClick={handleCheckout}>Buy</button>
          </div>
        </section>
      </main>
    </>
  );
}

export default OrderPage;
