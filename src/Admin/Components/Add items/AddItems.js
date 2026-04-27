import React, { useEffect, useState } from 'react'
import AdminNavBar from '../AdminNavbar/AdminNavbar'
import { Alert } from 'react-bootstrap'
import './additems.css'
import axios from 'axios'
import { FaCartPlus } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import { API_BASE_URL } from '../../../apiConfig';

const AddItems = () => {  
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [Pname , setPname] = useState('')
  const [Pcategorey , setPcategorey] = useState('')
  const [gender , setgender] = useState('')
  const [material , setmaterial] = useState('')
  const [description , setdescription] = useState('')
  const [originalprice , setoriginalprice] = useState('')
  const [offerprice , setofferprice] = useState('')
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);

  const clearForm = () =>{
    window.location.reload();
  }

  const HandelSubmit = async(e) =>{
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
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }) 
    .then((response) => {
      console.log(response.data)
      if (response.status === 201) {
        setMessage('Adding Items successfully.');
        setMessageType('success');
        setTimeout(() => {
          setMessage("")
        }, 3000);
      } else {
        setMessage("Error In Adding Items");
        setMessageType('danger');
        setTimeout(() => {
          setMessage("")
        }, 1000);
      }
      }) 
      .catch(val=>{
        alert(val)
      }) 
  }


  const handleImageChange = (e) => {
    setImage1(e.target.files[0]);
    setImage2(e.target.files[0]);
    setImage3(e.target.files[0]);
  };


  let [add,setadd]=useState([])
  useEffect(()=>{ 
   function main()
   {
    axios.get(`${API_BASE_URL}/GetItems`)
    .then(val=>setadd(val.data))
    .catch(val=>console.log(val)) 
 
   } 
   main()
  },[]) 
  
  
  return (
    <div className='adminpannel'>
        <AdminNavBar/>
        <div className='additems'>
          <h1 className='text-light mb-5'>Add Items</h1>
          <form onSubmit={HandelSubmit} method='POST'>
          {message && (
            <Alert variant={messageType} onClose={() => setMessage('')} dismissible>
              {message}
            </Alert>
          )}
            <label className='lb-name mb-3' style={{position:'relative', left:'-7rem'}}>Product Name</label>
            <input type="text" className='input-tag ps-2' name="Pname" placeholder="Product Name" onChange={(e)=>setPname(e.target.value)} required/><br/>
            <label className='lb-name'>Product Categorey</label>
            <select className='options' name='Pcategorey' onChange={(e)=>setPcategorey(e.target.value)} required>
              {
                add.map((val,index)=>( 
                  <option key={index}>{val}</option>
                ))
              }
            </select><br/>
            <label className='lb-name mt-3'>Gender</label>
            <select className='options' style={{position:"relative", left:"2.8rem"}} name='gender' onChange={(e)=>setgender(e.target.value)} required>
              <option value="" disabled selected>-Select Gender-</option>
              <option value="Male">Men</option>
              <option value="Female">Women</option>
              <option value="Kids">Kids</option>
            </select><br/>
            <label className='lb-name mt-2'>Material Type</label>
            <select className='options' style={{position:"relative", left:"1.3rem"}} name='material' onChange={(e)=>setmaterial(e.target.value)}  required>
            <option value="" disabled selected>-Select material-</option>
              <option value='Cotton'>Cotton</option>
              <option value='Polyester'>Polyester</option>
              <option value='Rayon'>Rayon</option>
            </select><br/>
            <label className='lb-name'>Description</label>
            <textarea className='textarea mt-2 ps-2' name="description" placeholder="Enter Description" rows={4} cols={25} onChange={(e)=>setdescription(e.target.value)}  required/><br/>
            <label className='lb-name' style={{position:'relative', left:'-4rem'}}>Product Image 1</label>
            <input type='file' className='input-file mt-2' name='image1' multiple onChange={handleImageChange} required/><br/>
            <label className='lb-name' style={{position:'relative', left:'-4rem'}}>Product Image 2</label>
            <input type='file' className='input-file mt-2' name='image2' multiple onChange={handleImageChange} required/><br/>
            <label className='lb-name' style={{position:'relative', left:'-4rem'}}>Product Image 3</label>
            <input type='file' className='input-file mt-2' name='image3' multiple onChange={handleImageChange} required/><br/>
            <label className='lb-name' style={{position:'relative', left:'-7rem'}}>Original Price</label>
            <input type="text" className='input-tag mt-2 ps-2' style={{position:'relative', left:'3rem'}} name="originalprice" placeholder='Product Price' onChange={(e)=>setoriginalprice(e.target.value)}  required/><br/>
            <label className='lb-name' style={{position:'relative', left:'-7rem'}}>Offer Price</label>
            <input type="text" className='input-tag mt-2 ps-2' style={{position:'relative', left:'3.7rem'}} name="offerprice" placeholder='Product Price' onChange={(e)=>setofferprice(e.target.value)} required/><br/>
            <button className='btn btn-success mt-3' type='submit'><FaCartPlus/> Add Product</button>
            <button className='btn btn-info mt-3 ms-5' type='reset' onClick={clearForm}> <IoReload/> Reset</button>
          </form>
        </div>
    </div>
  )
}

export default AddItems