import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import * as api from "../../api";
import Drawing from "./Drawing";

const GetImage = (props) => {
  const params = useParams();
  console.log(params.id);
  const [currentUrl, setCurrentUrl] = useState("");
  const imageId = params.id;

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const res = await api.getImage(imageId);
      console.log(res.data.path);
      setCurrentUrl(res.data.path);
      // ...
    }
    fetchData();
  }, [imageId]);

  return currentUrl ? (
    <div className="container">
      <Drawing imgSrc={currentUrl} />
    </div>
  ) : null;
};

export default GetImage;
