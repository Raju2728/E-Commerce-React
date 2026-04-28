import React from 'react';
import NavBar from '../components/common/NavBar';
import Sliders from '../components/user/Sliders';
import ProductSection from '../components/user/ProductSection';

const HomePage = () => {
  return (
    <div>
      <NavBar />
      <Sliders />
      <ProductSection endpoint="/products" title="Men's Collection" theme="men" linkPath="/mens" direction="left" />
      <ProductSection endpoint="/wproducts" title="Women's Collection" theme="women" linkPath="/women" direction="right" />
      <ProductSection endpoint="/kproducts" title="Kids' Collection" theme="kids" linkPath="/kids" direction="left" />
    </div>
  );
};

export default HomePage;
