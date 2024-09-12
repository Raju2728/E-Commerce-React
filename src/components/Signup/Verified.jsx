import React, { useState } from 'react'
import NavBar from '../Nav/NavBar'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Verified = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState({
      otp: ''
    });

    const handelSubmit = () => {
      axios.post("http://localhost:7230/verify", otp)
      .then(response => {
        console.log(response.data);
        alert("Verification Successfull");
        navigate('/E-commerce-React');
        })
        .catch(error => {
          console.log(error);
        })
    }

    const Change = (e)=> {
      const{name , value} = e.target;
      setOtp({...otp,[name]:value})
    }
     
  return (
    <div className='glass-bg'>
        <NavBar/>
        <form onSubmit={handelSubmit}>
        <div className='container'>
            <h1 className='text-center'>Verification</h1>
        <div className="row justify-content-center">
              <div className="col-md-6 col-lg-4">
                <label htmlFor="username" className="form-label">OTP</label>
                <input
                  type="text"
                  className={`form-control`}
                  id="otp"
                  name="otp"
                  autoComplete='off'
                  placeholder='Enter The OTP'
                  onChange={Change}
                  value={otp.otp}
                  required
                />
                <button className="btn btn-primary mt-3" type="submit">Verify</button>
              </div>
        </div>
        </div>
        </form>
    </div>
  )
}

export default Verified