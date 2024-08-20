import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { handleAPIGet } from "../apis/apis";
import { useSelector } from "react-redux";
import ServiceForm from "../components/ServiceForm";

const Service = ({ name, price, images }) => {
  return (
    <div
      className="card m-2 d-inline-block zoom-in-animation"
      style={{ width: "18rem" }}
    >
      <img
        src={images[0]}
        className="card-img-top"
        alt={name}
        style={{ height: "200px", width: "300px" }}
      />
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
  const { userInfo = { userType: "customer", userId: "" } } = useSelector(
    (state) => state.account || {}
  );

  const [openForm, setFormState] = useState(false);
  const [services, setServices] = useState([]);

  const loadServices = async () => {
    try {
      const services = await handleAPIGet(
        userInfo.userType === "seller"
          ? `/services/seller/${userInfo.userId}`
          : "/services/available"
      );

      setServices(services);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  return (
    <div className="container mt-4">
      <h1>Services Page</h1>
      {userInfo.userType === "seller" && (
        <button onClick={() => setFormState(true)} className="btn btn-primary mt-4">
          + Add New Service
        </button>
      )}
      {openForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "100vh",
            width: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            placeItems: "center",
            placeContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            className="bg-white p-4"
            style={{ minWidth: 500, height: 600, overflowY: "scroll" }}
          >
            <button onClick={() => setFormState(false)}>X</button>
            <ServiceForm />
          </div>
        </div>
      )}
      <div className="row">
        {services.map((service) =>
          userInfo.userType === "seller" ? (
            <Service key={service.sku} {...service} />
          ) : (
            <div className="col-md-4" key={service.sku}>
              <Link to={`/${service.sku}`}>
                <Service {...service} />
              </Link>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ServiceListing;
