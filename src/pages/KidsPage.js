import React from 'react';
import NavBar from '../components/common/NavBar';
import CategoryNav from '../components/common/CategoryNav';
import ProductSection from '../components/user/ProductSection';

const KidsPage = () => (
  <div>
    <NavBar />
    <CategoryNav />
    <ProductSection endpoint="/kproducts" title="Kids' Collection" theme="kids" linkPath="/kids" />
  </div>
);

export default KidsPage;
