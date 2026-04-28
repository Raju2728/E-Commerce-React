import React from 'react';
import NavBar from '../components/common/NavBar';
import CategoryNav from '../components/common/CategoryNav';
import ProductSection from '../components/user/ProductSection';

const CategoriesPage = () => (
  <div>
    <NavBar />
    <CategoryNav />
    <ProductSection endpoint="/products" title="Men's Collection" theme="men" linkPath="/mens" />
    <ProductSection endpoint="/wproducts" title="Women's Collection" theme="women" linkPath="/women" direction="right" />
    <ProductSection endpoint="/kproducts" title="Kids' Collection" theme="kids" linkPath="/kids" />
  </div>
);

export default CategoriesPage;
