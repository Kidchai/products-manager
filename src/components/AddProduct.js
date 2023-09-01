import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductService from "../ProductService";

const FormField = ({ label, name, value, onChange }) => (
    <div className="form-group">
        <label>{label}</label>
        <input
            placeholder={label}
            name={name}
            className="form-control"
            value={value}
            onChange={onChange}
        />
    </div>
);

const AddProductComponent = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const [product, setProduct] = useState({
        id: "",
        name: "",
        quantity: "",
        price: "",
    });

    useEffect(() => {
        if (id !== "_add") {
            ProductService.getProductById(id)
                .then((res) => setProduct(res.data))
                .catch(console.log);
        }
    }, [id]);

    const saveOrUpdateProduct = (event) => {
        event.preventDefault();
        const action = id === "_add" ? ProductService.createProduct : ProductService.updateProduct;

        action(product, id)
            .then(() => navigate("/products"))
            .catch(console.log);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    return (
        <div>
            <br />
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        <h3 className="text-center">{id === "_add" ? "Add Product" : "Update Product"}</h3>
                        <div className="card-body">
                            <form>
                                {Object.keys(product).map((key) => (
                                    <FormField
                                        key={key}
                                        label={key[0].toUpperCase() + key.slice(1)}
                                        name={key}
                                        value={product[key]}
                                        onChange={handleChange}
                                    />
                                ))}
                                <button className="btn btn-success" onClick={saveOrUpdateProduct}>Save</button>
                                <button className="btn btn-danger" onClick={() => navigate("/products")} style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductComponent;