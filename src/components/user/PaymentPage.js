import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NavBar from '../common/NavBar';
import '../../styles/payment.css';

const PaymentPage = () => {
  const location = useLocation();
  const totalPrice = location.state?.totalPrice || 0;
  const navigate = useNavigate();

  const handleNetBanking = () => {
    navigate('/netbanking', { state: { totalPrice } });
  };

  return (
    <div>
      <NavBar />
      <div className="payment-page">
        <h2 className="text-center mb-4">Payment Options</h2>
        <div className="total-price">
          <h4>Total Price: &#8377;{totalPrice}</h4>
        </div>
        <div className="payment-methods">
          <h5>Select Payment Method</h5>
          <div className="upi-options">
            <Button variant="primary" className="m-2">GPay</Button>
            <Button variant="success" className="m-2">PhonePe</Button>
            <Button variant="info" className="m-2">Paytm</Button>
            <Button variant="outline-primary" className="m-2" onClick={handleNetBanking}>Net Banking</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
