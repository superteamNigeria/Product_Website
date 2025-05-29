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

const ProductCardDisplay = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://superteamng-products-backend.vercel.app/api/products');
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

  if (loading) {
    return <div className="text-center mt-8">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-500">Error: {error}</div>;
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
            colors={[product.colors]}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductCardDisplay;
