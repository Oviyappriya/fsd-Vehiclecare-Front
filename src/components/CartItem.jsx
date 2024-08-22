import PropTypes from "prop-types";

const CartItem = ({ name, sku, images, price, description, category }) => {
  return (
    <div className="card mb-3">
      <div className="row no-gutters">
        <div className="col-md-4">
          <img
            src={images[0]} // Display the first image in the array
            className="card-img"
            alt={name}
            style={{ objectFit: "cover", height: "100%" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">
              <small className="text-muted">SKU: {sku}</small>
            </p>
            <p className="card-text">Price: ${price.toFixed(2)}</p>
            <p className="card-text">{description}</p>
            <p className="card-text">
              Category:{" "}
              <span className="badge badge-secondary">{category}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  name: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.oneOf(["Service", "Maintenance", "Vehicle Wash"])
    .isRequired,
  sellerInfo: PropTypes.string.isRequired,
};

export default CartItem;
