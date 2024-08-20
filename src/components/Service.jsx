import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

const Service = ({
  name,
  sku,
  images,
  price,
  description,
  category,
  sellerInfo,
}) => {
    const dispatch = useDispatch();
    const handleAddtoBook=()=>{
        dispatch({type: "ADD_SERVICE", payload: { name, price, images, sku }});
        alert("Item added to booking!");
  
    }
  return (
    <div className="card mb-4">
      <div className="card-header">
        <h2>{name||""}</h2>
        <small className="text-muted">SKU: {sku||""}</small>
      </div>
      <div className="card-body">
        <div
          id={`carousel-${sku}`}
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            {(images || []).map((image, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={image}
                  style={{ height: 300, width: 400, objectFit: "contain" }}
                  alt={`${name} ${index}`}
                 
                />
              </div>
            ))}
          </div>
       
        </div>
        <h3 className="mt-3">Price: ${(price||0).toFixed(2)}</h3>
        <p>{description}</p>

        <p>
          Category: <span className="badge badge-secondary">{category}</span>
        </p>
        <div className="seller-info mt-3">
          <h5>Seller Information</h5>
          <p>{sellerInfo?.name||""}</p>
        </div>
        <button className="btn btn-primary" onClick={handleAddtoBook}>Add your Booking</button>
      </div>
    </div>
  );
};

Service.propTypes = {
  name: PropTypes.string.isRequired,
  sku: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.oneOf(["Service", "Maintenance", "Vehicle Wash"])
    .isRequired,
  sellerInfo: PropTypes.string.isRequired,
};

export default Service;
