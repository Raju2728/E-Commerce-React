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
import User from '../../Admin/Components/WatchUser/User';
import UserComp from '../../Admin/Components/WatchUser/UserComp';
import Verified from '../Signup/Verified';
// import ProductDetail from '../Product Details/ProductDetails';
import ProductTry from '../Product Details/ProductTry';
import { CartProvider } from '../CartContext/CartContext';
import Cart from '../Cart/Cart';
import PaymentPage from '../Payment Page/Payment';
import NetBankingPage from '../Payment Page/NetBanking/NetBankingPage';
import ManageItems from '../../Admin/Components/Manage Items/ManageItems';
import ManagePlist from '../../Admin/Components/Manage Items/ManageComponents/ManagePlist';


function App() { 
  return (
    <div> 
      <CartProvider>
      <Routes> 
        <Route path='/E-Commerce-React' element={<New/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/VerifyEmail' element={<Verified/>}/>
        <Route path='/LogIn' element={<SignIn/>}/>
        <Route path='/Mens' element={<JoinProducts/>}/>
        <Route path='/women' element={<JoinWproducts/>}/>
        <Route path='/kids' element={<JoinKproducts/>}/>
        <Route path='/categories' element={<Combined/>}/>
        <Route path='/profile' element={<DisplayProfile/>}/>
        <Route path='/Admin' element={<Adminindex/>}/>
        <Route path='/AdminPannel' element={<Merged/>}/>
        <Route path='/AddProducts' element={<AddItems/>}/>
        <Route path='/ForgotPassword' element={<ForgotPassword/>}/>
        <Route path='/changepassword' element={<ChangePassword/>}/>
        <Route path='/ManageOrders' element={<ManageORD/>}/>
        <Route path='/Users' element={<User/>}/>
        <Route path='/WatchUsers' element={<UserComp/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path="/product/:id" element={<ProductTry/>} />
        <Route path="/payment" element={<PaymentPage/>} />
        <Route path='/Netbanking' element={<NetBankingPage/>} />
        <Route path='/ManageItems' element={<ManageItems/>} />
        <Route path='/ManageProducts' element={<ManagePlist/>} />
      </Routes>
      </CartProvider>
      <FooterPage/>
    </div>
  );
}

export default App;
