import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import "../App.css";
import { handleAPIPost } from "../apis/apis";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import instance from "../api-instance";
import Loader from "../components/Loader";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };

  const makePayment = async () => {
    try {
      setLoading(true);
      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

      const response = await instance.post("/payment/get-payment-session", {
        services: cart.services,
      });

      const { id } = response.data;

      console.log("Session ID111:", id); 

      const result = await stripe.redirectToCheckout({
        sessionId: id,
      });

      if (result.error) {
        console.error(result.error);
        alert("Payment failed, please try again.");
      }
    } catch (err) {
      console.error("Error creating payment session:", err);
      alert("Payment failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  
  const processBooking = async () => {
    try {
      setLoading(true);
      const response = await handleAPIPost("/booking/place-booking", cart);
      alert(response.msg);
      navigate(`/bookingSuccess?bookingNo=${response.bookingNo}`);
      dispatch({ type: "cart_clear" });
    } catch (err) {
      console.error(err);
      alert("Something went wrong, Please try again later");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="container from-right-animation">
      <h1>Your Cart</h1>
      {(cart.services || []).map((item, index) => (
        <CartItem
          key={index}
          name={item.name}
          sku={item.sku}
          images={item.images}
          price={item.price}
          description={item.description}
          category={item.category}
          sellerInfo={item.sellerInfo}
        />
      ))}
      <div>
        <h2>
          Total Price: $
          {cart.services.reduce((acc, curr) => acc + curr.price, 0)}
        </h2>
        <div>
          <input
            type="radio"
            name="payment"
            value="cod"
            id="cod"
            checked={payment === "cod"}
            onChange={handlePaymentChange}
          />
          &nbsp;
          <label htmlFor="cod">Cash On Delivery</label>&nbsp;&nbsp;
          <input
            type="radio"
            name="payment"
            value="online"
            id="online"
            checked={payment === "online"}
            onChange={handlePaymentChange}
          />
          &nbsp;
          <label htmlFor="online">Online Payment</label>
        </div>
        <button
          onClick={() => {
            if (payment === "online") {
              makePayment();
            } else {
              processBooking();
            }
          }}
          className="btn btn-primary"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
