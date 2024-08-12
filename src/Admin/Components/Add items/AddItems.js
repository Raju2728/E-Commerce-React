import React, { useEffect, useState } from 'react'
import AdminNavBar from '../AdminNavbar/AdminNavbar'
import { Alert } from 'react-bootstrap'
import './additems.css'
import axios from 'axios'
import { FaCartPlus } from "react-icons/fa";


const AddItems = () => {  
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const [itemdata , setItemdata] = useState({
    Pname: '',
    Pcategorey: '',
    gender: '',
    material: '',
    description: '',
    image1:'',
    image2:'',
    image3:'',
    originalprice:'',
    offerprice:''
  })

  const HandelSubmit = async() =>{
    axios.post("http://localhost:7230/AddItems" , itemdata , {
      headers: { 
        'Content-Type':'multipart/form-data'
        }
    }) 
    .then((response) => {
      console.log(response.data)
      if (response.status === 201) {
        setMessage('Adding Items successfully.');
        setMessageType('success');
      } else {
        setMessage("Error In Adding Items");
        setMessageType('danger');
      }
      }) 
      .catch(val=>{
        alert(val)
      }) 
  }



  let [add,setadd]=useState([])
  useEffect(()=>{ 
   function main()
   {
    axios.get("http://localhost:7230/GetItems")
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
          <form onSubmit={HandelSubmit}>
          {message && (
            <Alert variant={messageType} onClose={() => setMessage('')} dismissible>
              {message}
            </Alert>
          )}
            <label className='lb-name mb-3' style={{position:'relative', left:'-7rem'}}>Product Name</label>
            <input type="text" className='input-tag ps-2' name="Pname" placeholder="Product Name" onChange={(e)=>setItemdata({...itemdata,Pname:e.target.value})} required/><br/>
            <label className='lb-name'>Product Categorey</label>
            <select className='options' name='Pcategorey' onChange={(e)=>setItemdata({...itemdata,Pcategorey:e.target.value})} required>
              {
                add.map((val,index)=>( 
                  <option key={index}>{val}</option>
                ))
              }
            </select><br/>
            <label className='lb-name mt-3'>Gender</label>
            <select className='options' style={{position:"relative", left:"2.8rem"}} name='gender' onChange={(e)=>setItemdata({...itemdata,gender:e.target.value})} required>
              <option value="" disabled selected>-Select Gender-</option>
              <option value="Male">Men</option>
              <option value="Female">Women</option>
              <option value="Kids">Kids</option>
            </select><br/>
            <label className='lb-name mt-3'>Material Type</label>
            <select className='options' style={{position:"relative", left:"1.3rem"}} name='material' onChange={(e)=>setItemdata({...itemdata,material:e.target.value})} required>
              <option value='Cotton'>Cotton</option>
              <option value='Polyester'>Polyester</option>
              <option value='Rayon'>Rayon</option>
            </select><br/>
            <label className='lb-name'>Description</label>
            <textarea className='textarea mt-3 ps-2' name="description" placeholder="Enter Description" rows={4} cols={25} onChange={(e)=>setItemdata({...itemdata,description:e.target.value})} required/><br/>
            <label className='lb-name' style={{position:'relative', left:'-4rem'}}>Product Image 1</label>
            <input type='file' className='input-file mt-3' name='image1' multiple onChange={(e)=>setItemdata({...itemdata,image1:e.target.value})} required/><br/>
            <label className='lb-name' style={{position:'relative', left:'-4rem'}}>Product Image 2</label>
            <input type='file' className='input-file mt-3' name='image2' multiple onChange={(e)=>setItemdata({...itemdata,image1:e.target.value})} required/><br/>
            <label className='lb-name' style={{position:'relative', left:'-4rem'}}>Product Image 3</label>
            <input type='file' className='input-file mt-3' name='image3' multiple onChange={(e)=>setItemdata({...itemdata,image1:e.target.value})} required/><br/>
            <label className='lb-name' style={{position:'relative', left:'-7rem'}}>Original Price</label>
            <input type="text" className='input-tag mt-3 ps-2' style={{position:'relative', left:'3rem'}} name="originalprice" placeholder='Product Price' onChange={(e)=>setItemdata({...itemdata,originalprice:e.target.value})} required/><br/>
            <label className='lb-name' style={{position:'relative', left:'-7rem'}}>Offer Price</label>
            <input type="text" className='input-tag mt-3 ps-2' style={{position:'relative', left:'3.7rem'}} name="offerprice" placeholder='Product Price' onChange={(e)=>setItemdata({...itemdata,offerprice:e.target.value})} required/><br/>
            <button className='btn btn-success mt-5' type='submit'><FaCartPlus/> Add Product</button>
          </form>
        </div>
    </div>
  )
}

export default AddItems