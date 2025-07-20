import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroBanner from "../components/HeroBanner";
import CategoryGrid from "../components/CategoryGrid";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/products";
import { categories } from "../data/categories";

const Home = () => {
  const featuredProducts = products.filter((product) => product.isFeatured);

  return (
    <div>
      <Header />
      <HeroBanner />
      <section id="categories" className="categories">
        <h2>Categories</h2>
        <CategoryGrid categories={categories} />
      </section>
      <section id="featured-products" className="featured-products">
        <h2>Featured Products</h2>
        <ProductGrid products={featuredProducts} />
      </section>
      <Footer />
    </div>
  );
};

export default Home;