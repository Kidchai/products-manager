import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductService from "../ProductService";

const ListProductComponent = () => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);

  useEffect(() => {
    ProductService.getProducts().then((res) => {
      setProducts(res.data);
    });
  }, []);

  const deleteProduct = (id) => {
    ProductService.deleteProduct(id).then(() => {
      setProducts(products.filter((product) => product.id !== id));
    });
  };

  const viewProduct = (id) => {
    navigate(`/view-product/${id}`);
  };

  const editProduct = (id) => {
    navigate(`/add-product/${id}`);
  };

  const addProduct = () => {
    navigate("/add-product/_add");
  };

  return (
    <div>
      <h2 className="text-center">Product List</h2>
      <div className="row">
        <button className="btn btn-primary" onClick={addProduct}>
          Add Product
        </button>
      </div>
      <br />
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
                <th>Id</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>
                  <button
                    onClick={() => editProduct(product.id)}
                    className="btn btn-info"
                  >
                    Update
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteProduct(product.id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => viewProduct(product.id)}
                    className="btn btn-info"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListProductComponent;
