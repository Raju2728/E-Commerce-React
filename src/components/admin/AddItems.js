import React, { useEffect, useState } from 'react';
import AdminNavbar from './AdminNavbar';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaCartPlus } from 'react-icons/fa';
import { IoReload } from 'react-icons/io5';
import { API_BASE_URL } from '../../apiConfig';
import '../../styles/admin.css';

const AddItems = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [Pname, setPname] = useState('');
  const [Pcategorey, setPcategorey] = useState('');
  const [gender, setGender] = useState('');
  const [material, setMaterial] = useState('');
  const [description, setDescription] = useState('');
  const [originalprice, setOriginalprice] = useState('');
  const [offerprice, setOfferprice] = useState('');
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/GetItems`)
      .then(val => setCategories(val.data))
      .catch(val => console.error(val));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Pname', Pname);
    formData.append('Pcategorey', Pcategorey);
    formData.append('gender', gender);
    formData.append('material', material);
    formData.append('description', description);
    formData.append('image1', image1);
    formData.append('image2', image2);
    formData.append('image3', image3);
    formData.append('originalprice', originalprice);
    formData.append('offerprice', offerprice);

    axios.post(`${API_BASE_URL}/AddItems`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then((response) => {
        if (response.status === 201) {
          setMessage('Product added successfully.');
          setMessageType('success');
          setTimeout(() => setMessage(''), 3000);
        } else {
          setMessage('Error adding product.');
          setMessageType('danger');
        }
      })
      .catch(() => {
        setMessage('Error adding product.');
        setMessageType('danger');
      });
  };

  const clearForm = () => window.location.reload();

  return (
    <div className="admin-panel">
      <AdminNavbar />
      <div className="admin-content">
        <h2>Add Items</h2>
        <div className="admin-form-card">
          {message && (
            <Alert variant={messageType} onClose={() => setMessage('')} dismissible>{message}</Alert>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Product Name</label>
              <input type="text" className="form-control" placeholder="Product Name" onChange={(e) => setPname(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Product Category</label>
              <select className="form-select" onChange={(e) => setPcategorey(e.target.value)} required>
                <option value="">Select Category</option>
                {categories.map((val, index) => (<option key={index}>{val}</option>))}
              </select>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Gender</label>
                <select className="form-select" onChange={(e) => setGender(e.target.value)} required>
                  <option value="">Select Gender</option>
                  <option value="Male">Men</option>
                  <option value="Female">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">Material Type</label>
                <select className="form-select" onChange={(e) => setMaterial(e.target.value)} required>
                  <option value="">Select Material</option>
                  <option value="Cotton">Cotton</option>
                  <option value="Polyester">Polyester</option>
                  <option value="Rayon">Rayon</option>
                </select>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows={3} placeholder="Enter Description" onChange={(e) => setDescription(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Product Image 1</label>
              <input type="file" className="form-control" onChange={(e) => setImage1(e.target.files[0])} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Product Image 2</label>
              <input type="file" className="form-control" onChange={(e) => setImage2(e.target.files[0])} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Product Image 3</label>
              <input type="file" className="form-control" onChange={(e) => setImage3(e.target.files[0])} required />
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Original Price</label>
                <input type="text" className="form-control" placeholder="Original Price" onChange={(e) => setOriginalprice(e.target.value)} required />
              </div>
              <div className="col-md-6">
                <label className="form-label">Offer Price</label>
                <input type="text" className="form-control" placeholder="Offer Price" onChange={(e) => setOfferprice(e.target.value)} required />
              </div>
            </div>
            <div className="d-flex gap-3">
              <button className="btn btn-success" type="submit"><FaCartPlus /> Add Product</button>
              <button className="btn btn-outline-secondary" type="reset" onClick={clearForm}><IoReload /> Reset</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddItems;
