import { useParams } from "react-router-dom";
import Service from "../components/Service";
import { useEffect, useState } from "react";
import { handleAPIGet } from "../apis/apis";
import Loader from "../components/Loader";

const ProductInfo = () => {
  const { serviceSku } = useParams();

  const [loading, setLoading] = useState(false);

  const [currentService, setService] = useState({});

  const loadService = async () => {
    try {
      setLoading(true);
      const service = await handleAPIGet(`/services/available/${serviceSku}`);
      setService(service);
      setLoading(false);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    loadService();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="m-4">
      <h1>Service Info</h1>
      <p>SKU: {serviceSku}</p>
     
      <Service {...currentService} />
    </div>
  );
};

export default ProductInfo;
