
import React from 'react';
import ProductCard from './ProductCard';
import { Product } from '../../types';

interface ProductGridProps {
  products: Product[];
  title?: string;
  columns?: number;
}

const ProductGrid = ({ 
  products, 
  title, 
  columns = 3 // Default to 3 columns for better apparel display
}: ProductGridProps) => {
  // Generate dynamic column classes based on the columns prop
  const getGridColumnClass = () => {
    switch (columns) {
      case 2: return 'sm:grid-cols-1 md:grid-cols-2';
      case 3: return 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4: return 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      case 5: return 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
      default: return 'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
    }
  };

  return (
    <section className="my-8">
      {title && (
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          {products.length > 3 && (
            <a href="/products" className="text-dealdash-teal font-medium hover:underline text-sm">
              View all
            </a>
          )}
        </div>
      )}
      
      {products.length > 0 ? (
        <div className={`grid grid-cols-1 ${getGridColumnClass()} gap-6`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No products found</p>
        </div>
      )}
    </section>
  );
};

export default ProductGrid;
