import React from 'react';
import NavBar from '../components/common/NavBar';
import CategoryNav from '../components/common/CategoryNav';
import ProductSection from '../components/user/ProductSection';

const WomenPage = () => (
  <div>
    <NavBar />
    <CategoryNav />
    <ProductSection endpoint="/wproducts" title="Women's Collection" theme="women" linkPath="/women" />
  </div>
);

export default WomenPage;
