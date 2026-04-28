import { Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Context
import { CartProvider } from './components/user/CartContext';

// Common
import Footer from './components/common/Footer';

// Pages
import HomePage from './pages/HomePage';
import MenPage from './pages/MenPage';
import WomenPage from './pages/WomenPage';
import KidsPage from './pages/KidsPage';
import CategoriesPage from './pages/CategoriesPage';

// User Components
import SignUp from './components/user/SignUp';
import SignIn from './components/user/SignIn';
import Verified from './components/user/Verified';
import ForgotPassword from './components/user/ForgotPassword';
import ProfilePage from './components/user/ProfilePage';
import Cart from './components/user/Cart';
import ProductDetail from './components/user/ProductDetail';
import PaymentPage from './components/user/PaymentPage';
import NetBankingPage from './components/user/NetBankingPage';

// Admin Components
import AdminIndex from './components/admin/AdminIndex';
import AdminDashboard from './components/admin/AdminDashboard';
import AddItems from './components/admin/AddItems';
import ChangePassword from './components/admin/ChangePassword';
import ManageOrders from './components/admin/ManageOrders';
import UserList from './components/admin/UserList';
import ManageItems from './components/admin/ManageItems';
import ManageProductList from './components/admin/ManageProductList';

function App() {
  return (
    <div className="app-wrapper">
      <CartProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<Verified />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/mens" element={<MenPage />} />
          <Route path="/women" element={<WomenPage />} />
          <Route path="/kids" element={<KidsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/netbanking" element={<NetBankingPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminIndex />} />
          <Route path="/admin/panel" element={<AdminDashboard />} />
          <Route path="/admin/add" element={<AddItems />} />
          <Route path="/admin/change-password" element={<ChangePassword />} />
          <Route path="/admin/orders" element={<ManageOrders />} />
          <Route path="/admin/users" element={<UserList />} />
          <Route path="/admin/items" element={<ManageItems />} />
          <Route path="/admin/products" element={<ManageProductList />} />
        </Routes>
      </CartProvider>
      <Footer />
    </div>
  );
}

export default App;
