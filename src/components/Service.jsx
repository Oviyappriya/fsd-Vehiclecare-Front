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
        <h2>{name}</h2>
        <small className="text-muted">SKU: {sku}</small>
      </div>
      <div className="card-body">
        <div
          id={`carousel-${sku}`}
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            {images.map((image, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={image}
                  className="d-block w-100 image"
                  alt={`${name} ${index}`}
                  style={{ objectFit: "contain", height:300,width:200}} 
                 // Added objectFit and height
                />
              </div>
            ))}
          </div>
          <a
            className="carousel-control-prev"
            href={`#carousel-${sku}`}
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href={`#carousel-${sku}`}
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
        <h3 className="mt-3">Price: ${price.toFixed(2)}</h3>
        <p>{description}</p>

        <p>
          Category: <span className="badge badge-secondary">{category}</span>
        </p>
        <div className="seller-info mt-3">
          <h5>Seller Information</h5>
          <p>{sellerInfo}</p>
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
