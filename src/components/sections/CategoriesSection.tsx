
import React from 'react';
import { Link } from 'react-router-dom';

const CategoriesSection: React.FC = () => {
  const categories = ['Electronics', 'Beauty', 'Fashion', 'Home', 'Gaming', 'Sports'];
  
  return (
    <div className="my-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Popular Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link 
            key={category} 
            to={`/products?category=${category}`} 
            className="bg-white hover:bg-dealdash-teal hover:text-white group p-6 rounded-lg text-center transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100"
          >
            <div className="font-semibold text-lg group-hover:text-white">{category}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoriesSection;
