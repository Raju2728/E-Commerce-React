import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavBar from '../../AdminNavbar/AdminNavbar';
import '../manageitems.css'

const ManagePlist = () => {
  const [productList, setProductList] = useState([]);

  // Fetch product list from the backend API
  useEffect(() => {
    axios
      .get('http://localhost:7230/ManageProduct')
      .then(response => {
        setProductList(response.data);
        console.log(response.data)
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  return (
    <div className='adminpannel'>
        <AdminNavBar/>
        <div className='M-product'>
      <h2 className="text-center text-light mb-4">Product List</h2>
      <div className='scroll mb-3'>
      <table className="table table-bordered table-striped table-hover">
        <thead className="thead-dark position-sticky top-0">
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Category</th>
            <th>Gender</th>
            <th>Material</th>
            <th>Original Price</th>
            <th>Offer Price</th>
            <th>Image </th>
          </tr>
        </thead>
        <tbody>
          {productList.length > 0 ? (
            productList.map((product, index) => (
              <tr key={index}>
                <td>{product.id}</td>
                <td>{product.Pname}</td>
                <td>{product.Pcategorey}</td>
                <td>{product.gender}</td>
                <td>{product.material}</td>
                <td>{product.originalprice}</td>
                <td>{product.offerprice}</td>
                <td>
                  <img src={`http://localhost:7230/uploads/${product.image1}`} alt="Product" style={{ width: '50px' }} />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">
                No Products Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
      </div>
    </div>
  );
};

export default ManagePlist;
