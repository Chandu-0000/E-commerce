import React, { useState, useEffect } from 'react';
import './addproduct.css'; // Make sure to create and include the appropriate CSS file
import { callApi, errorResponse, getSession } from './main';

const ProductDetails = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        const uname = getSession("sid");
        const url = "http://localhost:4000/product/add";
        const data = JSON.stringify({
           
        });

        callApi("POST", url, data, productFetchSuccess, errorResponse);
    };

    const productFetchSuccess = (res) => {
        const productList = JSON.parse(res);
        setProducts(productList);
    };

    return (
        <div className='product-list'>
            <h3>Product List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Cost (Rs.)</th>
                        <th>Product Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={index}>
                            <td>{product.image}</td>
                            <td>{product.cost}</td>
                            <td>{product.stock}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductDetails;
