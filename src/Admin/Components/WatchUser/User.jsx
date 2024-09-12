import React  from 'react'
import AdminNavBar from '../AdminNavbar/AdminNavbar'
import './user.css'
import UserComp from './UserComp'


const User = () => {


  return (
    <div className='adminpannel'>
        <AdminNavBar/>
        <UserComp/>
    </div>
  )
}

export default User