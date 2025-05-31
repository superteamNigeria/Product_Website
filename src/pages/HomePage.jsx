import React, { useState } from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import ProductCardDisplay from "../components/ProductCardDisplay";
import Footer from "../components/Footer";

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
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
      />
      <Footer />
    </section>
  );
};

export default HomePage;
