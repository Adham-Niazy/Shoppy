import React from "react";

import { Product, HeroBanner, FooterBanner } from "../components";
import { client } from "../lib/client";

const Home = ({ products, banners }) => {
  return (
    <>
      <HeroBanner HeroBanner={banners.length && banners[1]} />
      <div className="products-heading">
        <h2>Best Selling Products</h2>
        <p>Speakers of many variations</p>
      </div>
      <div className="products-container">
        {products?.map((product) => (
          <Product key={product._id} productDetails={product} />
        ))}
      </div>

      <FooterBanner footerBanner={banners.length && banners[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const banners = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      banners,
    },
  };
};

export default Home;
