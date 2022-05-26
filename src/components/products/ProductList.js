import React from "react";
import ProductItem from "./ProductItem";
import { useSelector } from "react-redux";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CircularProgress } from "@material-ui/core";
const ProductList = ({ setCurrentId }) => {
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;

  return (
    <div >
     
        {products && <h4>Mis dibujos...</h4>}
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <div className="card-columns ">
            {products !== null && !loading ? (
              <TransitionGroup>
                {products &&
                  products.map((product) => (
                    <CSSTransition
                      key={product._id}
                      timeout={500}
                      classNames="item"
                    >
                      <ProductItem product={product} key="product._id" setCurrentId={setCurrentId} />
                    </CSSTransition>
                  ))}
              </TransitionGroup>
            ) : (
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            )}
          </div>
        )}
      </div>
  
  );
};
export default ProductList;
