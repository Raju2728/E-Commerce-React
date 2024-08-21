import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './index.css'
import { useNavigate } from 'react-router-dom';

const Adminindex = () => {
  const navigate = useNavigate()
  const [msg , setMsg] = useState('')
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("This Page Is Only Used For Pc Devices");
    try {
      const response = await axios.post('http://localhost:7230/adminLogin', { email, password });
      // console.log('Sign in successful:', response.status);
      if(response.status ===200){
        navigate("/AdminPannel")
        localStorage.setItem('AdminUserName', response.data.AdminUserName);
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
    <div className='admin-glass-bg'>
      <div className='admin-container'>
        
        <Row className="w-100">
          <Col md={6} lg={4} className="mx-auto">
            <h3 className="text-center mb-4 text-light">Admin Sign In</h3>
            {msg && <p style={{margin:'1rem', color:'red', fontWeight:'bold'}}>{msg}</p>}
            <Form onSubmit={handleSubmit}  >
            <div className="form-group">
                  <label htmlFor="username" className='float-lb text-light mb-3'>Username</label>
                  <input
                    type="text"
                    className="form-control mb-3"
                    id="username"
                    value={email}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    autoComplete='off'
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className='float-lb text-light mb-3'>Password</label>
                  <input
                    type="password"
                    className="form-control mb-4"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

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

export default Adminindex;
