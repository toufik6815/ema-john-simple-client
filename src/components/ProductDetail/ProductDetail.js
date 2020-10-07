import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import { CircularProgress } from "@material-ui/core";

const ProductDetail = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState({});
    document.title = "Product Details"

    useEffect(() =>{
      fetch('https://blooming-refuge-80139.herokuapp.com/product'+ productKey)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
    }, [productKey]);
    
    return (
      <div>
        <h1>Your Product Details...{productKey}</h1>
        {
          loading ? <CircularProgress color="secondary" />
          : <Product showAddToCart={false} product={product}></Product>

        }
      </div>
    );
};

export default ProductDetail;