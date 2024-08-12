import './App.css';

import { Routes , Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from '../Signup/Signup';
import New from './New';
import SignIn from '../Signin/SignIn';
import FooterPage from '../Footer/Footer';
import Combined from '../Categories/Combined';
import JoinProducts from '../Products/JoinProducts';
import JoinWproducts from '../Products/JoinWproducts';
import JoinKproducts from '../Products/JoinKproducts';
import DisplayProfile from '../Profile/DisplayProfile';
import Adminindex from '../../Admin';
import Merged from '../../Admin/Components/App/Merged';
import ChangePassword from '../../Admin/Components/ChangePassword/Changepass';
import AddItems from '../../Admin/Components/Add items/AddItems';
import ForgotPassword from '../ForgotPassword/ForgotPassword';
import ManageORD from '../../Admin/Components/ManageOrders/ManageORD';


function App() { 
  return (
    <div> 
      <Routes> 
        <Route path='/E-Commerce-React' element={<New/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/LogIn' element={<SignIn/>}/>
        <Route path='/Mens' element={<JoinProducts/>}/>
        <Route path='/women' element={<JoinWproducts/>}/>
        <Route path='/kids' element={<JoinKproducts/>}/>
        <Route path='/categories' element={<Combined/>}/>
        <Route path='/profile' element={<DisplayProfile/>}/>
        <Route path='/Admin' element={<Adminindex/>}/>
        <Route path='/AdminPannel' element={<Merged/>}/>
        <Route path='/AddItems' element={<AddItems/>}/>
        <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
        <Route path='/changepassword' element={<ChangePassword/>}/>
        <Route path='/ManageOrders' element={<ManageORD/>}/>
      </Routes>
      <FooterPage/>
    </div>
  );
}

export default App;
