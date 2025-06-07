import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductCardDisplay from "../components/ProductCardDisplay";
import Footer from "../components/Footer";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // console.log("Data:", data)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const url = 'https://superteamng-products-backend.vercel.app/api/products';
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="flex-1 lg:px-[80px] lg:py-[48px] dark:bg-[#0A0D14] min-h-screen">
      <Header />
      <Hero
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductCardDisplay
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        products={products}
        loading={loading}
        error={error}
      />
      <Footer />
    </section>
  );
};

export default HomePage;
