import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductGrid from "../product/ProductGrid";
import { Tag, ArrowRight } from "lucide-react";
import { getProducts } from "../../services/storageService";
import { Product } from "../../types";

const FeaturedDealsSection: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get all products and filter for featured ones
    const allProducts = getProducts();
    const featured = allProducts.filter((product) => product.featured);
    setFeaturedProducts(featured);
    setLoading(false);
  }, []);

  return (
    <div className="my-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center">
          <Tag className="mr-2 text-dealdash-teal" /> Featured Deals
        </h2>
        <Link
          to="/products"
          className="text-dealdash-teal font-medium hover:underline flex items-center"
        >
          View all <ArrowRight className="h-4 w-4 ml-1" />
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading featured deals...</p>
        </div>
      ) : featuredProducts.length > 0 ? (
        <ProductGrid products={featuredProducts} columns={4} />
      ) : (
        <div className="bg-gray-50 p-8 rounded-lg text-center">
          <p className="text-gray-500">
            No featured deals available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default FeaturedDealsSection;
