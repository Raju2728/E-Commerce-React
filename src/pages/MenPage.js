import React from 'react';
import NavBar from '../components/common/NavBar';
import CategoryNav from '../components/common/CategoryNav';
import ProductSection from '../components/user/ProductSection';

const MenPage = () => (
  <div>
    <NavBar />
    <CategoryNav />
    <ProductSection endpoint="/products" title="Men's Collection" theme="men" linkPath="/mens" />
  </div>
);

export default MenPage;
