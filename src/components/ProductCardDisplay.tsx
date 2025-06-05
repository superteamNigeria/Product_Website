import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string[]; // Fixed: This should be an array based on your API response
  website: string;
  xAccount: string;
  userCount: string;
  features: string[];
  brandColors: string[];
  status: string;
}

interface ProductCardProps {
  name: string;
  categories: string[];
  description: string;
  href: string;
  x: string;
  website: string;
  users: string;
  brandColors: string[];
}

interface ProductCardDisplayProps {
  searchQuery: string;
  selectedCategory: string;
  products: Product[];
  loading: boolean;
  error: string | null;
}

const ProductCardDisplay = ({ searchQuery, selectedCategory, products, loading, error }: ProductCardDisplayProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const PRODUCTS_PER_PAGE = 10;

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Client-side filtering - FIXED
  const filteredProducts = products.filter(product => {
    // Fixed: Check if the selectedCategory is included in the product's category array
    const matchesCategory = selectedCategory ? product.category.includes(selectedCategory) : true;
    
    const matchesSearch = searchQuery ? (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    ) : true;
    
    return matchesCategory && matchesSearch;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-base"></div>
        <p className="mt-4 text-lg font-medium text-gray-600 dark:text-gray-300">
          Loading amazing products...
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Please wait while we fetch the latest innovations
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-16 h-16 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
          </svg>
        </div>
        <p className="mt-4 text-lg font-medium text-red-500">
          Oops! Something went wrong
        </p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {error}
        </p>
      </div>
    );
  }

  return (
    <section className='flex flex-wrap justify-center items-start mt-4 mb-4 px-4'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {paginatedProducts.map((product) => (
          <ProductCard 
            key={product.id}
            name={product.name}
            categories={product.category} // Pass the entire category array
            description={product.description}
            href={product.id}
            x={product.xAccount}
            website={product.website}
            users={product.userCount}
            brandColors={product.brandColors}
          />
        ))}
      </div>
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2 w-full">
          <button
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium disabled:opacity-50"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded-full font-medium mx-1 ${currentPage === i + 1 ? 'bg-green-base text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-medium disabled:opacity-50"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductCardDisplay;