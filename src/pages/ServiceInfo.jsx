import { useParams } from "react-router-dom";
import Service from "../components/Service";
import services from "../json-Data/Service.json";
const ServiceInfo = () => {
  const {serviceSku}=useParams();
  const serviceData=services.find((item)=>item.sku===serviceSku);

  return (
    <div>
      <h1>Service Information</h1>
      <p>SKU:{serviceSku}</p>
      <Service {...serviceData}/>
    </div>
  );
};

export default ServiceInfo;
