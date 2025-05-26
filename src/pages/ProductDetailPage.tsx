import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import Layout from "../components/layout/Layout";
import RetailerCard from "../components/product/RetailerCard";
import { Product, Retailer, ProductVariant } from "../types";
import ProductGrid from "../components/product/ProductGrid";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug, getProducts } from "../services/storageService";

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();

  // Extract slug from path if we're on a direct URL (without /product/ prefix)
  const pathSegments = location.pathname.split("/");
  const pathSlug = pathSegments[pathSegments.length - 1];

  // Use the slug from params or from the path
  const effectiveSlug = slug || pathSlug;
  const product = getProductBySlug(effectiveSlug || "");
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (!product) {
      console.error(`Product with slug ${slug} not found`);
      return;
    }

    // Set the main image or the first image as selected
    if (product.images && product.images.length > 0) {
      const mainImage = product.images.find((img) => img.isMain);
      setSelectedImage(mainImage ? mainImage.url : product.images[0].url);
    } else {
      setSelectedImage(product.imageUrl);
    }

    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [product, slug]);

  if (!product) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-900">
              Product not found
            </h2>
            <p className="mt-2 text-gray-500">
              The product you're looking for doesn't exist.
            </p>
            <div className="mt-6">
              <Link to="/products" className="btn-deal">
                Browse All Deals
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Get retailers sorted by discount (highest first)
  const sortedRetailers = [...product.retailers].sort(
    (a, b) => b.discount - a.discount
  );
  const bestDeal = sortedRetailers[0];

  // Get related products (same category, excluding current product)
  const allProducts = getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-8">
          <ol className="flex items-center space-x-1 text-sm text-gray-500">
            <li>
              <Link to="/" className="hover:text-ebaycut-teal">
                Home
              </Link>
            </li>
            <li>
              <span className="mx-1">/</span>
            </li>
            <li>
              <Link to="/products" className="hover:text-ebaycut-teal">
                Deals
              </Link>
            </li>
            <li>
              <span className="mx-1">/</span>
            </li>
            <li>
              <Link
                to={`/products?category=${product.category}`}
                className="hover:text-ebaycut-teal"
              >
                {product.category}
              </Link>
            </li>
            <li>
              <span className="mx-1">/</span>
            </li>
            <li className="font-medium text-gray-900 truncate max-w-[200px]">
              {product.title}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Product Images */}
          <div>
            <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden mb-4">
              <img
                src={selectedImage}
                alt={product.title}
                className="w-full h-full object-center object-cover"
              />
            </div>

            {/* Thumbnail images */}
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden border-2 ${
                      selectedImage === image.url
                        ? "border-ebaycut-teal"
                        : "border-transparent"
                    }`}
                    onClick={() => setSelectedImage(image.url)}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-full h-full object-center object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {product.tags.map((tag, index) => (
                <Link key={index} to={`/${tag.toLowerCase()}`}>
                  <span className="deal-tag">{tag}</span>
                </Link>
              ))}
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Product variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6 space-y-4">
                {product.variants.map(
                  (variant: ProductVariant, index: number) => (
                    <div key={index}>
                      <h3 className="text-sm font-medium text-gray-900 mb-2">
                        {variant.name}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {variant.type === "color"
                          ? // Display colors as color swatches
                            variant.values.map((color, i) => (
                              <div
                                key={i}
                                className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer"
                                style={{ backgroundColor: color }}
                                title={color}
                              />
                            ))
                          : // Display other variants as badges
                            variant.values.map((value, i) => (
                              <Badge
                                key={i}
                                variant="outline"
                                className="px-3 py-1 cursor-pointer hover:bg-gray-100"
                              >
                                {value}
                              </Badge>
                            ))}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

            <div className="mb-6">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Best price available:
              </div>
              <div className="flex items-baseline">
                <span className="text-3xl font-bold text-ebaycut-coral mr-2">
                  ${bestDeal.discountPrice.toFixed(2)}
                </span>
                {bestDeal.discount > 0 && (
                  <>
                    <span className="text-lg text-gray-500 line-through mr-2">
                      ${bestDeal.originalPrice.toFixed(2)}
                    </span>
                    <span className="bg-ebaycut-coral text-white px-2 py-1 rounded text-sm font-bold">
                      {bestDeal.discount}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="border-t border-b py-4 mb-6">
              <h2 className="font-semibold text-lg mb-4">
                Available Retailers
              </h2>
              <div className="space-y-4">
                {sortedRetailers.map((retailer, index) => (
                  <RetailerCard
                    key={retailer.name}
                    retailer={retailer}
                    bestDeal={index === 0}
                  />
                ))}
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-400 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">
                  Prices and availability may change after publication
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mb-12">
          <Tabs defaultValue="description">
            <TabsList className="w-full border-b">
              <TabsTrigger value="description" className="flex-1">
                Description
              </TabsTrigger>
              <TabsTrigger value="details" className="flex-1">
                Details
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1">
                Shipping
              </TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="p-4">
              <p className="text-gray-700">{product.description}</p>
              <p className="mt-4 text-gray-700">
                This {product.title} is available at multiple retailers with
                varying prices. We've curated the best deals so you can compare
                and save.
              </p>
            </TabsContent>
            <TabsContent value="details" className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold mb-2">Product Details</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Category: {product.category}</li>
                    <li>Brand: {product.title.split(" ")[0]}</li>
                    {product.variants &&
                      product.variants.map((variant, index) => (
                        <li key={index}>
                          {variant.name}: {variant.values.join(", ")}
                        </li>
                      ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Features</h3>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    {product.tags.map((tag, index) => (
                      <li key={index} className="capitalize">
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="p-4">
              <p className="text-gray-700">
                Shipping policies and delivery times vary by retailer. Please
                check the retailer's website for specific shipping details.
              </p>
              <div className="mt-4 space-y-4">
                {product.retailers.map((retailer) => (
                  <div key={retailer.name} className="flex items-start">
                    <div className="w-10 h-10 mr-3 flex-shrink-0">
                      {retailer.logo && (
                        <img
                          src={
                            retailer.logo ||
                            `https://www.google.com/s2/favicons?sz=64&domain_url=${encodeURIComponent(
                              retailer.url
                            )}`
                          }
                          alt={retailer.name}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{retailer.name}</h4>
                      <p className="text-sm text-gray-500">
                        Standard shipping policies apply. Visit{" "}
                        <a
                          href={retailer.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-ebaycut-teal hover:underline"
                        >
                          retailer website
                        </a>{" "}
                        for details.
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <ProductGrid products={relatedProducts} title="Similar Products" />
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
