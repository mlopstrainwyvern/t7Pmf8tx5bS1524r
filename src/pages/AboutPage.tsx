import React from "react";
import Layout from "../components/layout/Layout";
import { Link } from "react-router-dom";
import { Search, Tag, Users, Award, ShoppingBag } from "lucide-react";

const AboutPage = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            About EbayCut.com
          </h1>
          <p className="text-xl text-gray-600">
            We're on a mission to help shoppers find the best deals and save
            money on their favorite products.
          </p>
        </div>

        {/* Our Story Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <p className="text-gray-600 mb-4">
                EbayCut.com was founded in 2025 with a simple idea: make it
                easier for people to find the best deals online without having
                to search through dozens of websites.
              </p>
              <p className="text-gray-600 mb-4">
                Our team of deal hunters works tirelessly to find and verify
                discounts, promo codes, and special offers from hundreds of
                retailers. We're passionate about helping our users save money
                and discover great products.
              </p>
              <p className="text-gray-600">
                What started as a small project has grown into a comprehensive
                deal-finding platform that thousands of shoppers rely on every
                day to make smarter purchasing decisions.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80"
                alt="Team working together"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-20 bg-ebaycut-lightGray rounded-xl p-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            Our Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-ebaycut-teal bg-opacity-10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Search className="h-6 w-6 text-ebaycut-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Transparency</h3>
              <p className="text-gray-600">
                We're committed to providing accurate, up-to-date information
                about deals and discounts. We clearly indicate when deals expire
                and verify all promo codes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-ebaycut-teal bg-opacity-10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Tag className="h-6 w-6 text-ebaycut-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Value</h3>
              <p className="text-gray-600">
                We focus on finding genuine deals that offer real value to our
                users. We prioritize quality over quantity in the deals we
                feature.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-ebaycut-teal bg-opacity-10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-ebaycut-teal" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600">
                We believe in building a community of savvy shoppers who share
                tips and recommendations. Your feedback helps us improve our
                service.
              </p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">
            How EbayCut.com Works
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-ebaycut-teal text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">We Find Deals</h3>
              <p className="text-gray-600">
                Our team searches hundreds of retailers to find the best
                discounts and promo codes.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-ebaycut-teal text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">We Verify</h3>
              <p className="text-gray-600">
                Each deal is checked to ensure it's active and offers genuine
                savings.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-ebaycut-teal text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">We Organize</h3>
              <p className="text-gray-600">
                Deals are categorized and tagged to make it easy for you to find
                what you're looking for.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-ebaycut-teal text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">You Save</h3>
              <p className="text-gray-600">
                Browse our curated deals, click through to retailers, and save
                money on your purchases.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-20 bg-white rounded-xl p-10 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-ebaycut-teal mb-2">
                500+
              </div>
              <p className="text-gray-600">Retailers Monitored</p>
            </div>

            <div>
              <div className="text-4xl font-bold text-ebaycut-teal mb-2">
                10,000+
              </div>
              <p className="text-gray-600">Active Deals</p>
            </div>

            <div>
              <div className="text-4xl font-bold text-ebaycut-teal mb-2">
                $2M+
              </div>
              <p className="text-gray-600">Saved by Our Users</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-ebaycut-teal to-cyan-500 rounded-lg p-10 text-center text-white shadow-lg">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Saving?</h2>
          <p className="text-white opacity-90 mb-8 max-w-2xl mx-auto">
            Browse our curated collection of deals and start saving on your
            favorite products today.
          </p>
          <Link
            to="/products"
            className="bg-white text-ebaycut-teal hover:bg-opacity-90 font-semibold py-3 px-8 rounded-md transition-colors inline-flex items-center text-lg"
          >
            <ShoppingBag className="mr-2 h-5 w-5" />
            Browse Deals
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
