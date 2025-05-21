import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import ProductGrid from "../components/product/ProductGrid";
import { useParams } from "react-router-dom";
import { getProducts } from "../services/storageService";
import { Product } from "../types";

const TagProductsPage = () => {
  const { tag } = useParams<{ tag: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load products from storage
    const loadedProducts = getProducts();
    setProducts(loadedProducts);
    setLoading(false);
  }, []);

  // Filter products based on tag
  const filteredProducts = tag
    ? products.filter((product) => 
        product.tags.some(productTag => 
          productTag.toLowerCase() === tag.toLowerCase()
        )
      )
    : [];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {tag ? `${tag.charAt(0).toUpperCase() + tag.slice(1)} Deals` : "Tagged Deals"}
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with popular tags */}
          <div className="w-full md:w-64 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h2 className="font-semibold text-lg mb-4">Popular Tags</h2>
              <div className="space-y-2">
                {/* Get all unique tags from products */}
                {Array.from(
                  new Set(
                    products.flatMap((product) => product.tags)
                  )
                )
                .slice(0, 10) // Show only top 10 tags
                .map((popularTag, index) => (
                  <div key={index} className="flex items-center">
                    <a
                      href={`/${popularTag.toLowerCase()}`}
                      className={`block w-full py-1 px-2 rounded ${
                        tag?.toLowerCase() === popularTag.toLowerCase()
                          ? "bg-ebaycut-teal text-white"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {popularTag}
                    </a>
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
                  No products found with the tag "{tag}".
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TagProductsPage;
