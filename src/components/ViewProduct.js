import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductService from "../ProductService";

const ViewProductComponent = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    ProductService.getProductById(id).then((res) => {
      setProduct(res.data);
    });
  }, [id]);

  return (
    <div>
      <br />
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center">View Product Details</h3>
        <div className="card-body">
          <div className="row">
            <label> Id:</label>
            <div>{product.id}</div>
          </div>
          <div className="row">
            <label> Name:</label>
            <div>{product.name}</div>
          </div>
          <div className="row">
            <label>Quantity:</label>
            <div>{product.quantity}</div>
          </div>
          <div className="row">
            <label>Price:</label>
            <div>{product.price}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProductComponent;
