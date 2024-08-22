import { useState } from "react";
import Loader from "../components/Loader";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import CartItem from "../components/CartItem";
import "../App.css";
import { handleAPIPost } from "../apis/apis";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import instance from "../api-instance";

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const navigate = useNavigate();
  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handlePaymentChange = (e) => {
    setPayment(e.target.value);
  };
  const processBooking = async () => {
    try {
      setLoading(true);
      const response = await handleAPIPost("/booking/place-booking", cart);

      alert(response.msg);
      navigate(`/bookingSuccess?bookingNo=${response.bookingNo}`);

      dispatch({ type: "cart_clear" });
    } catch (err) {
      console.log(err);
      alert("Something went wrong, Please try again later");
    } finally {
      setLoading(false);
    }
  };
  console.log(processBooking);
  const makePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);

    const response = await instance.post("/payment/get-payment-session", {
      services: cart.services,
    });

    const { id } = response.data;

    const result = await stripe.redirectToCheckout({
      sessionId: id,
    });

    if (result.error) {
      console.log(result.error);
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

Cart.propTypes = {
  services: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      sku: PropTypes.string.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      category: PropTypes.oneOf(["Service", "Maintenance", "Vehicle Wash"])
        .isRequired,
      sellerInfo: PropTypes.string.isRequired,
    })
  ),
};

export default Cart;
