import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from './AdminNavbar';
import { API_BASE_URL, getImageUrl } from '../../apiConfig';
import '../../styles/admin.css';

const ManageProductList = () => {
  const [productList, setProductList] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/ManageProduct`)
      .then(response => setProductList(response.data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="admin-panel">
      <AdminNavbar />
      <div className="admin-content">
        <h2>Product List</h2>
        <div className="admin-table-card">
          <div className="admin-table-scroll">
            <table className="table table-bordered table-striped table-hover">
              <thead className="thead-dark position-sticky top-0">
                <tr>
                  <th>ID</th><th>Product Name</th><th>Category</th><th>Gender</th>
                  <th>Material</th><th>Original Price</th><th>Offer Price</th><th>Image</th>
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
                      <td><img src={getImageUrl(product.image1)} alt="Product" style={{ width: '50px', borderRadius: '4px' }} /></td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="8" className="text-center">No Products Available</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProductList;
