import React, { useState } from "react";
import { useToast } from "../hooks/use-toast";
import Layout from "../components/layout/Layout";
import { ProductRequest } from "../types";

const RequestPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<
    Omit<ProductRequest, "id" | "status" | "createdAt">
  >({
    name: "",
    email: "",
    productUrl: "",
    comment: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      // In a real implementation, you would send this to Supabase
      console.log("Form submitted:", formData);

      // Show success message
      toast({
        title: "Request submitted!",
        description: "We'll let you know when we find deals for this product.",
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        productUrl: "",
        comment: "",
      });

      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Request a Product Deal
          </h1>
          <p className="text-gray-600 mb-8">
            Can't find a specific product you're looking for? Let us know and
            we'll hunt for the best deals and discounts available across the
            web.
          </p>

          <div className="bg-white shadow-sm rounded-lg p-6 mb-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ebaycut-teal"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ebaycut-teal"
                />
                <p className="text-xs text-gray-500 mt-1">
                  We'll notify you when we find deals for this product.
                </p>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="productUrl"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Product URL *
                </label>
                <input
                  type="url"
                  id="productUrl"
                  name="productUrl"
                  required
                  value={formData.productUrl}
                  onChange={handleChange}
                  placeholder="https://example.com/product"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ebaycut-teal"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Link to the product on any website so we can find the best
                  deals.
                </p>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="comment"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Additional Comments (Optional)
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-ebaycut-teal"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-deal ${
                    isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-gray-100 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">How it works</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Submit your product request using the form above</li>
              <li>
                Our team will search for the best deals across multiple
                retailers
              </li>
              <li>
                We'll add the product to our deals database with all available
                discounts
              </li>
              <li>
                You'll receive an email notification when the product is
                available
              </li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RequestPage;
