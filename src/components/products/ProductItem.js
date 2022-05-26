import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, listProducts } from "../../actions/productActions";
import {

  PRODUCT_DELETE_RESET,
} from "../../constants/productConstants";
import { format } from "timeago.js";
const ProductItem = ({product}) => {
 
  const dispatch = useDispatch();
  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;
  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  
  };
    useEffect(() => {
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
      dispatch(listProducts());
    }
  
    return () => {};

    // eslint-disable-next-line
  }, [ dispatch, successDelete]);
  return (
    <div className="card text-white bg-dark animate__animated animate__fadeInUp ">
    {product.image && (
      <div className="overflow">
        <img className="card-img-top  thumbnail" src={product.image} alt={product.name} />
      </div>
    )}
      <div className="card-body">
      <span>{format(product.date)}</span>
        <h5>{product.name}</h5> 
      <>{product.price}</>
       
       
      </div>

      <p>
      {/*   <Link
          to={`/products/edit/${product._id}`}
          className="btn btn-primary btn-sm"
        >
          Edit
        </Link> */}
 
        <button
          className="btn btn-danger btn-sm "
          onClick={() => deleteHandler(product)}
        >
          Borrar
        </button>
      </p>
    </div>
  );
};

export default ProductItem;
