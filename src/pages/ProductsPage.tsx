import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import ProductGrid from "../components/product/ProductGrid";
import { useSearchParams, Link } from "react-router-dom";
import { getProducts } from "../services/storageService";
import { Product } from "../types";

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get("category");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load products from storage
    const loadedProducts = getProducts();
    setProducts(loadedProducts);
    setLoading(false);
  }, []);

  // Get unique categories from products
  const categories = Array.from(
    new Set(products.map((product) => product.category))
  );

  // Filter products based on category if specified
  const filteredProducts = categoryFilter
    ? products.filter((product) => product.category === categoryFilter)
    : products;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {categoryFilter ? `${categoryFilter} Deals` : "All Deals"}
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="w-full md:w-64 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Categories</h2>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Link
                    to="/products"
                    className={`block w-full py-1 px-2 rounded ${
                      !categoryFilter
                        ? "bg-ebaycut-teal text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    All Categories
                  </Link>
                </div>
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <Link
                      to={`/products?category=${category}`}
                      className={`block w-full py-1 px-2 rounded ${
                        categoryFilter === category
                          ? "bg-ebaycut-teal text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-gray-500">Loading products...</p>
              </div>
            ) : filteredProducts.length > 0 ? (
              <ProductGrid products={filteredProducts} />
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                <p className="text-gray-500">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
