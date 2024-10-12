import React, { useState } from 'react'
import AdminNavBar from '../AdminNavbar/AdminNavbar'
import './manageitems.css'
import axios from 'axios'
import { Alert } from 'react-bootstrap'


const ManageItems = () => {

    const [Pname , setPname] = useState('')
    const [originalprice , setoriginalprice] = useState('')
    const [offerprice , setofferprice] = useState('')
    const [stock , setStock] = useState('')
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

  

    const HandelSubmit = async (e) =>{
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:7230/ManageItems', {
          Pname,
          stock,
          originalprice,
          offerprice
        });
  
        if (response.status === 201) {
          setMessage('Product Updated successfully.');
          setMessageType('success');
        } else {
          setMessage(response.data.message);
          setMessageType('danger');
        }
      } catch (error) {
        setMessage('An error occurred while changing the password.');
        setMessageType('danger');
        console.log(error);
      }
    }
    


  return (
    <div className='adminpannel'>
        <AdminNavBar/>
        <div className='M-items'>
            <h2 className='text-center text-light mb-5'>Update Items</h2>
            <form method="post" onSubmit={HandelSubmit}>
            {message && (
            <Alert variant={messageType} onClose={() => setMessage('')} dismissible>
              {message}
            </Alert>
            )}
            <label className='lb-name mb-3' style={{position:'relative', left:'5rem'}}>Product Name</label>
            <input type="text" className='input-tag ps-2' name="Pname" style={{position:'relative', left:'9.5rem'}} placeholder="Product Name" onChange={(e)=>setPname(e.target.value)} required/><br/>
            <label className='lb-name mb-4' style={{position:'relative', left:'5rem'}}>Original Price</label>
            <input type="text" className='input-tag ps-2' style={{position:'relative', left:'10rem'}} name="originalprice" placeholder='Product Price' onChange={(e)=>setoriginalprice(e.target.value)}  required/><br/>
            <label className='lb-name mb-4' style={{position:'relative', left:'5rem'}}>Offer Price</label>
            <input type="text" className='input-tag ps-2' style={{position:'relative', left:'11.5rem'}} name="offerprice" placeholder='Product Price' onChange={(e)=>setofferprice(e.target.value)} required/><br/>
            <label className='lb-name' style={{position:'relative', left:'7rem'}}>Stock</label>
            <select className='options' style={{position:"relative", left:"14.2rem"}} name='stock' onChange={(e)=>setStock(e.target.value)}  required>
            <option value="" disabled selected>-Stock Details-</option>
              <option value='0'>In-Stock</option>
              <option value='1'>Out-Of-Stock</option>
            </select><br/>
            <button className='btn btn-success mb-3 mt-3 updatebtn'>Update Items</button>
            <button type='reset' className='btn btn-success mb-3 mt-3 ms-4 updatebtn'>Reset</button>
            </form>
        </div>
    </div>
  )
}

export default ManageItems