import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  website: string;
  xAccount: string;
  userCount: string;
  features: string[];
  colors: string[];
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
  colors: string[];
}

const ProductCardDisplay = ({ searchQuery, selectedCategory }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = 'https://superteamng-products-backend.vercel.app/api/products';
        const params = [];
        if (searchQuery) params.push(`q=${encodeURIComponent(searchQuery)}`);
        if (selectedCategory) params.push(`category=${encodeURIComponent(selectedCategory)}`);
        if (params.length) url += '/search?' + params.join('&');
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
  }, [searchQuery, selectedCategory]);

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
        {products.map((product) => (
          <ProductCard 
            key={product.id}
            name={product.name}
            categories={[product.category]}
            description={product.description}
            href={product.website}
            x={product.xAccount}
            website={product.website}
            users={product.userCount}
            colors={product.colors}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductCardDisplay;
