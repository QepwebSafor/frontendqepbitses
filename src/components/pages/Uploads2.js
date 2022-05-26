import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import * as api from "../../api";
const UploadPage = () => {
  const [images, setImages] = useState([]);
  const [imageRef, setImageRef] = useState("");
  async function fetchData() {
    const res = await api.getImages();
    console.log(res.data);

    setImages(res.data);
  }
  useEffect(() => {
 
    fetchData();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    if (imageRef.files.length > 0) {
      const file = imageRef.files[0];
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "react_images");
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/recicle/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) {
        throw new Error();
      }
      const image = await res.json();
      console.log('image', image)
      try {
        const newImage = {
            public_id: image.public_id,
            path: image.secure_url,  
            originalname: image.original_filename,
            size: image.bytes,
        };

        console.log('newImage',newImage);
        await api.createImage(newImage);
        setImageRef("");
        setImages([]);
      } catch (error) {
        if (error.response) {
          console.log(error);
          const { data } = error.response;
          setImages({ imageerror: data });
        }
      }
    }
    fetchData();
  };
  const onRemoveImage = async (id) => {
    await api.deleteImage(id);
    
  };
  return (
    <Fragment>
      <div className="col-md-5">
        <div className="card bg-dark">
          <div className="card-header">
            <i className="fas fa-upload 3x"></i>&nbsp; &nbsp;&nbsp;Subir
            imagenes
          </div>
          <div className="card-body">
            <form onSubmit={onSubmit}>
              <div className="btn-group d-flex">
                <label
                  className="btn  btn-primary m-0  mr-2"
                  htmlFor="photoFile"
                >
                  Examinar
                </label>
                <input
                  ref={(ref) => setImageRef(ref)}
                  type="file"
                  className="form-control-file d-none"
                  id="photoFile"
                />

                <button type="submit" className="btn btn-secondary m-0 ml-2 ">
                  Enviar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="col-md-12">
        <div className="card-columns">
          {images &&
            images.map((image) => (
              <div
                className="card text-white bg-dark  "
                key={image._id}
              >
                <div className="card-body">
                  <img
                    className="card-img-top "
                    alt="Uploaded file"
                    src={image.path}
                  />
                </div>
                <div className="btn-group card-footer ">
                  <Link
                    className="btn btn-primary btn-xs"
                    to={"/images/" + image._id}
                  >
                    <i className="fas fa-edit 3x"></i>{" "}
                  </Link>
                  <button
                    className="btn btn-danger btn-xs"
                    type="button"
                    onClick={() => onRemoveImage(image._id)}
                  >
                    <i className="fas fa-trash 3x"></i>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  );
};

export default UploadPage;