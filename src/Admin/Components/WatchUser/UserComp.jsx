import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { MdVerified } from "react-icons/md";
import { VscUnverified } from "react-icons/vsc";

const UserComp = () => {

    const [users, setUsers] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:7230/Users')
            .then(response => {
                setUsers(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);
    
  return (
    <div className='admin-User'>
          <h1 className='text-light mb-5'>Users</h1>
          <div className='tab'>
            <table className="table table-hover table-striped">
                <thead className="table-dark head">
                    <tr>
                        <th>S.No</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Date of Joining</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                            <td>{user.name}</td>
                            <td>
                              {user.email}
                              {user.verified ===1 ? 
                              (<abbr title="Verified User" style={{cursor:'pointer', color:'blue'}}><MdVerified/></abbr>) :
                              (<abbr title="Un-Verified User" style={{cursor:'pointer', color:'red'}}><VscUnverified/></abbr>) }
                            </td>
                            
                            <td>{user.joindate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            </div>
  )
}

export default UserComp