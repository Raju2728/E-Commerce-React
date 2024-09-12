import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import NavBar from '../Nav/NavBar';
import './signup.css';
import { Form, InputGroup, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [message , setMessage] = useState("")


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) newErrors.username = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post('http://localhost:7230/signup', formData);
        setMessage("Registration successful!"); // Set success message
        setMessageType('success')
        console.log('Form data submitted:', response.data);
        alert("Verification Mail Sent Successfully. Please Enter the OTP")
        navigate('/VerifyEmail')
      } catch (error) {
        console.error('Error submitting form:', error);
        setMessage("Registration failed. Please try again."); // Set error message
        setMessageType('danger')
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <NavBar />
      <div className='glass-bg'>
        <div className="container">
        {message && (
            <Alert variant={messageType} onClose={() => setMessage('')} dismissible>
              {message}
            </Alert>
          )}
          <h2 className="my-4 row justify-content-center">Sign Up</h2>
          <form onSubmit={handleSubmit} noValidate>
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-4">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete='off'
                  required
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>}
              </div>
            </div>
            <div className="mb-3 row justify-content-center">
              <div className="col-md-6 col-lg-4">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete='off'
                  required
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
            </div>
            <div className="mb-3 row justify-content-center">
              <div className="col-md-6 col-lg-4">
                <label htmlFor="password" className="form-label">Password</label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    id='password'
                    name='password'
                    required
                  />
                  <InputGroup.Text onClick={togglePasswordVisibility} className="eye-icon">
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </InputGroup.Text>
                </InputGroup>
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
            </div>
            <div className="mb-5 row justify-content-center">
              <div className="col-md-6 col-lg-4">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <InputGroup>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    id='confirmPassword'
                    name='confirmPassword'
                    required
                  />
                  <InputGroup.Text onClick={togglePasswordVisibility} className="eye-icon">
                    <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                  </InputGroup.Text>
                </InputGroup>
                {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
              </div>
            </div>
            <div className="mb-3 row justify-content-center">
              <div className="col-md-6 col-lg-4">
                <button type="submit" className="btn btn-primary w-100">Sign Up</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
