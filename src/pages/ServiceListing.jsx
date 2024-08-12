import PropTypes from "prop-types";
import services from "../json-Data/Service.json";
import { Link } from "react-router-dom";
const Service = ({ name, price, images }) => {
  return (
    <div className="card m-2 d-inline-block" style={{ width: "18rem" }}>
      <img src={images[0]} className="card-img-top pt-4" style={{height:"200",width:"300"}} alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Price: ${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

Service.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const ServiceListing = () => {
  return (
    <div className="container mt-4">
      <h1>Services Page</h1>
      <div className="row">
        {services.map((service) => (
          <div className="col-md-4"key ={service.sku} >
            <Link to={`/${service.sku}`}>
            <Service {...service} />
            
            </Link>
            

          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceListing;
