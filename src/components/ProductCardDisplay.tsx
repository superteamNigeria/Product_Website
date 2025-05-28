import React from "react";
import data from "../data/products.json";
import ProductCard from "./ProductCard";

const ProductCardDisplay = () => {
  return (
    <section className="flex flex-wrap justify-center items-start mt-4 mb-4 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-screen-xl">
        {data.map((product) => (
          <div key={product.name} className="p-0">
            {product.info.map((info) => (
              <ProductCard
                key={info.website}
                name={product.name}
                categories={info.categories}
                description={info.description}
                href={info.website}
                x={info.xLink}
                website={info.website}
                users={info.users}
                className="mb-4"
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCardDisplay;
