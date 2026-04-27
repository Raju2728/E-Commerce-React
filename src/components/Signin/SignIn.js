import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './signin.css';
import NavBar from '../Nav/NavBar';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../apiConfig';

const SignIn = () => {
  const navigate = useNavigate()
  const [msg , setMsg] = useState('')
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
      // console.log('Sign in successful:', response.status);
      if(response.status ===200){
        navigate("/E-Commerce-React")
        localStorage.setItem('UserName', response.data.UserName);
        localStorage.setItem('UserEmail', response.data.UserEmail);
        localStorage.setItem('JoinDate', response.data.JD);
        console.log("Data Recived!")
      }
      else{
        console.log("Invalid Username/Password");
        setMsg("Invalid Username/Password")
        setTimeout(() => {
          setMsg('')
        }, 3000);
      }
      
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div className='glass-bg'>
      <NavBar/>
      <div className='container'>
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <h3 className="text-center mb-4">Sign In</h3>
            {msg && <p style={{margin:'1rem', color:'red', fontWeight:'bold'}}>{msg}</p>}
            <Form onSubmit={handleSubmit}  >
            <div className="form-group">
                  <label htmlFor="username" className='float-lb'>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={email}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete='off'
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className='float-lb'>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Link to='/ForgotPassword'>Forgot Password?</Link>
              <Button variant="primary" type="submit" className="w-100 mt-3">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default SignIn;
