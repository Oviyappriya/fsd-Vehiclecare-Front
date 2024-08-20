import { useState } from "react";
import { handleAPIPost } from "../apis/apis";

const ProductForm = () => {
  const [service, setService] = useState({
    name: "",
    sku: "",
    price: "",
    description: "",
    images: "",

    category: "Maintenance",
  });

  const [errors, setErrors] = useState({
    name: "",
    sku: "",
    price: "",
    description: "",
    images: "",

    category: "Maintenance",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setService({
      ...service,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      const serviceData = {
        ...service,
        images: service.images.split(",").map((img) => img.trim()),
      };

     const response=await handleAPIPost('/services', serviceData);
     setService({
        name: "",
        sku: "",
        price: "",
        description: "",
        images: "",

        category: "Maintainance",
      });
    }
  

  return (
    <div className="container mt-5">
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={service.name}
            onChange={handleChange}
          />
          <br />
          <span style={{ color: "red" }}>{errors.name}</span>
        </div>
        <div className="mb-3">
          <label className="form-label">SKU</label>
          <input
            type="text"
            className="form-control"
            name="sku"
            value={service.sku}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={service.price}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={service.description}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Images (comma separated URLs)</label>
          <input
            type="text"
            className="form-control"
            name="images"
            value={service.images}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={service.category}
            onChange={handleChange}
          >
            <option value="Maintenance">Maintenance</option>
            <option value="Vehicle Wash">Vehicle Wash</option>
            <option value="Service">Service</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary mb-4">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
