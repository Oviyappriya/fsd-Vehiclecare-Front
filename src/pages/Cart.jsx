import { useState } from 'react';
import Loader from '../components/Loader';
import PropTypes from 'prop-types';
import { useSelector,useDispatch } from 'react-redux';
import CartItem from '../components/CartItem';
import '../App.css'
import { handleAPIPost } from '../apis/apis';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cart= useSelector((state) => state.cart);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const processOrder = async () => {
    try {
      setLoading(true);
      const response = await handleAPIPost("/order/place-order", cart);

      alert(response.msg);

      navigate(`/orderSuccess?orderNo=${response.bookingNo}`);

      dispatch({ type: "cart_clear" });
    } catch (err) {
      console.log(err);
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
      {(cart.services||[]).map((item, index) => (
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
        <h2>Total Price: ${cart.services.reduce((acc, curr) => acc + curr.price, 0)}</h2>
        <button onClick={processOrder}className="btn btn-primary">Place Booking</button>
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
      category: PropTypes.oneOf(['Service', 'Maintenance', 'Vehicle Wash']).isRequired,
      sellerInfo: PropTypes.string.isRequired,
    })
  ),
};

export default Cart;
