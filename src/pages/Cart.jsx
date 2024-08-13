

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import '../App.css'

const Cart = () => {
  const { services } = useSelector((state) => state.cart);

  return (
    <div className="container from-right-animation">
      <h1>Your Cart</h1>
      {services.map((item, index) => (
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
        <h2>Total Price: ${services.reduce((acc, curr) => acc + curr.price, 0)}</h2>
        <button className="btn btn-primary">Place Booking</button>
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
