import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
//Actions
import {
  createProduct,
  listProducts,
  
} from "../../actions/productActions";
import {
  PRODUCT_CREATE_RESET,

} from "../../constants/productConstants";

const ProductForm = (props) => {

  const params = useParams();
  const { id: productId } = params;
  const dispatch = useDispatch();
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const userId = userInfo._id;
  const [image, setImage] = useState("");
  const ref = React.useRef();
  const initialValues = {
    name: "",
    price: 0,
    date: new Date(),
    image: { path: "", public_id: "" },
    user: userId,
  };
  const [product, setProduct] = useState(initialValues);
  const productList = useSelector((state) => state.productList);
  const { products } = productList;
  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = productCreate;


  const handleInputChange = ({ target }) => {
    if (productId) setImage(product.image);
    setProduct({
      ...product,
      [target.name]: target.value,
      image,
      user: userId,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
 
      dispatch(createProduct(product));
      
  };

  const uploadImage = async (e) => {
    try {
      const files = e.target.files;
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "apjdd2im");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/www-qepweb-es/image/upload",
        {
          method: "POST",
          body: data,
        }
      );
      const file = await res.json();
      console.log(file.secure_url);
      setImage(file.url);
    } catch (err) {
      console.error(err);
    }
    ref.current.focus();
  };

  useEffect(() => {
    if (productId && products) {
      const current = products.find((product) => product._id === productId);
      if (current) {
        setProduct({
          title: current.title,
          image: current.image,
          price: current.price,
          date: new Date(),
          user: userId,
        });
      }
    }
  }, [productId, products, userId]);
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
    }
 
    setProduct({
      name: "",
      price: 0,
      date: new Date(),
      image: { path: "", public_id: "" },
      user: userId,
    });
    dispatch(listProducts());

    return () => {};
  }, [successCreate, dispatch,  userId]);

  return (
    <div className="form-container mx-auto bg-dark ">
    <form className="form form-horizontal" onSubmit={handleSubmit}>
     
            <ul >
              <li></li>
              <li>
                {loadingCreate && <LoadingBox></LoadingBox>}
                {errorCreate && (
                  <MessageBox variant="danger">{errorCreate}</MessageBox>
                )}
                {successCreate && <div>Product Saved Successfully.</div>}
           
              </li>
              {!productId && (
                <li>
                  <label> Image</label>
                  <input
                    id="fileInput"
                    type="file"
                    name="image"
                    ref={ref}
                    onChange={uploadImage}
                    className="form-input "
                  />
                </li>
              )}
              <li>
                <label htmlFor="name">Name</label>
                <input
                  name="name"
                  type="text"
                  value={product.name}
                  id="name"
                  onChange={handleInputChange}
                  className="form-control"
                />
              </li>

              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="form-control"
                  value={product.price}
                  onChange={handleInputChange}
                ></input>
              </li>
              <li>
                  <div className="right">
                <button type="submit" className="btn btn-primary ">
                  Submit
                </button>
                </div>
              </li>
            </ul>
          </form>
        </div>
    
  );
};

export default ProductForm;
