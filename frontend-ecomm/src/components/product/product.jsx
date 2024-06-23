import React, { useState, useEffect, useContext } from "react";
import "./products.css";
import Recommend_popular from "../../topRecom/recommend_popular";
import Sec1Card from "../home/component/section1/sec1Card";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Footer from "../footer/footer";
import { CartContext } from '../../CartContext';

function allCrds(props) {
  return (
    <Sec1Card
      image={props.image}
      author={props.author}
      title={props.title}
      rating={props.rating}
      price={props.price}
    />
  );
}

function Product() {
  const [recomPop, setRecomPop] = useState([]);
  const [curentPage, setCurrentPage] = useState(1);
  const perPage = 4;
  const location = useLocation();

  const { title = '', image = '', author = '', price = '' } = location.state || {};

  const { cartCount, handleAddToCart, getCartItemCount, handleRemoveFromCart } = useContext(CartContext);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/orderpage', {
      state: {
        title: title,
        price: price,
      },
    });
  };

  const handleAddBookToCart = (e) => {
    e.preventDefault();
    handleAddToCart({ title, image, author, price });
  };

  const handleRemoveBookFromCart = (e) => {
    e.preventDefault();
    const index = recomPop.findIndex(item => item.title === title);
    if (index !== -1) {
      handleRemoveFromCart(index);
    }
  };

  useEffect(() => {
    const allrecom = async () => {
      try {
        const data = await Recommend_popular();
        if (data.top_books) {
          setRecomPop(data.top_books);
        } else {
          console.error("Data received does not contain 'top_books':", data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    allrecom();
  }, []);

  const indexOfLastBook = curentPage * perPage;
  const indexOfFirstBook = indexOfLastBook - perPage;
  const indexOfCureentBook = recomPop.slice(indexOfFirstBook, indexOfLastBook);

  const previousPage = () => {
    if (curentPage > 1) {
      setCurrentPage(curentPage - 1);
    }
  };

  const nextPage = () => {
    if (curentPage * perPage < recomPop.length) {
      setCurrentPage(curentPage + 1);
    }
  };

  const bookQuantity = getCartItemCount(title);

  return (
    <>
      <main id="productPage">
        <section id="producSection1">
          <aside id="productAside1">
            <div id="productImage">
              <img style={{ borderRadius: "20px" }} src={image} alt="product"></img>
            </div>
            <div id="Productdetals">
              <h3>{title}</h3>
              <p>{author}</p>
            </div>
          </aside>

          <aside id="productAside2">
            <div id="productPrice">
              <span style={{ fontSize: "1.5rem" }}><b>Price :</b> {price} ₹</span><br />
              <span style={{ textDecoration: "line-through" }}>MRP = 69 ₹</span>
            </div>

            <div id="productDeliveryDetailsCard">
              <p>
                FREE scheduled delivery as soon as Wednesday, 22 May, 7 AM - 9
                PM. <a href="/">Details</a>
              </p>
              <p style={{}}>
                <span style={{ color: "#6be9ff", fontWeight: "600", fontSize: "larger" }}>In stock</span><br />
                Ships from<br />
                BookNest.In
                Sold by martPrivate Ltd.<br />
              </p>
            </div>

            <div id="productOffers">
              <img
                id="discountLogo"
                src={image}
                alt="discount tag"
                style={{ float: "left", marginLeft: "12px", marginTop: "10px" }}
              />
              <p
                style={{
                  color: "black",
                  marginTop: "5px",
                  marginLeft: "40px",
                  fontWeight: "600",
                }}
              >
                Offers
              </p>
              <div id="offerGrid">
                <div id="bankOffer">
                  <p>Bank Offer</p>
                  <span>
                    Additional INR 250 Instant Discount on OneCard Credit Card 9
                    month and above EMI Trxn. Min purchase value ₹1000
                  </span>
                </div>
                <div id="noCostEmi">
                  <p>No Cost EMI</p>
                  <span>EMI interest savings on select Credit Cards</span>
                </div>
                <div id="Promocode">
                  <p>Promo Code</p>
                  <label htmlFor="promocode" style={{ fontSize: "1.1rem", color: "whitesmoke" }}>Code</label>
                  <input name="promocode" placeholder="your Code" style={{ height: "30%", width: "100%", backgroundColor: "grey", fontWeight: 600, color: "white", marginTop: "5%" }} />
                  <button style={{ marginTop: "10%", height: "20%", width: "60%" }}>Confirm</button>
                </div>
              </div>
            </div>

            <div id="productTestLogo"></div>

            <div id="productCartAndBuy">
              <div id="dopdownQuantity">
                <label htmlFor="quantity">Quantity:</label>
                <select id="quantity" name="quantity">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </select>
              </div>
              <div id="buy">
                <Link 
                  to={{
                    pathname: "/orderpage"
                  }}
                  onClick={handleClick}
                >
                  Buy
                </Link>
              </div>
              <div style={{ minHeight: "4%", minWidth: "2%", position: "absolute", backgroundColor: "black", color: "#262682", textAlign: "center", borderRadius: "50%" }}><b>{bookQuantity}</b></div>
              <div id="addCart">
                <Link to="#" onClick={handleAddBookToCart}> Add To Cart </Link>
                <Link to="#" onClick={handleRemoveBookFromCart}> Remove </Link>
              </div>
            </div>
          </aside>
        </section>
        <section id="producSection2">
          <button
            id="uparrow"
            onClick={previousPage}
            disabled={curentPage === 1}
          >
            &uarr;
          </button>
          <aside id="producSection2Recom">
            {indexOfCureentBook.map(allCrds)}
          </aside>
          <button
            id="downarrow"
            onClick={nextPage}
            disabled={curentPage * perPage >= recomPop.length}
          >
            &darr;
          </button>
        </section>
      </main>
      <br />
      <Footer />
    </>
  );
}

export default Product;
