import React from "react";
import { useSelector } from "react-redux";
import ProductForm from "../components/products/ProductForm";
import ProductItem from "../components/products/ProductItem";

const ProductScreen = () => {
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center h-100">
      <div className="card-columns">
        <ProductForm />
        <div className="col-md-12">
          {products &&
            products.map((product) => <ProductItem product={product} key={product._id} />)}
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
