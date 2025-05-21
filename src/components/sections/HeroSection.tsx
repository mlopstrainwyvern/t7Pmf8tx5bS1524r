import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-ebaycut-teal to-cyan-500 rounded-xl text-white p-10 mb-12 shadow-lg relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10 z-0"></div>
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-white opacity-10 rounded-full"></div>
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-white opacity-10 rounded-full"></div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <span className="inline-block bg-ebaycut-coral px-4 py-1 rounded-full text-sm font-bold mb-4 animate-pulse">
          Save up to 70% today
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 leading-tight">
          Find the Best Deals from Around the Web
        </h1>
        <p className="text-lg sm:text-xl mb-8 opacity-90">
          We hunt for discounts so you don't have to. Save big on your favorite
          products!
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/products"
            className="bg-white text-ebaycut-teal hover:bg-opacity-90 font-semibold py-3 px-8 rounded-md transition-colors text-lg flex items-center justify-center"
          >
            Browse Deals <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/request"
            className="bg-ebaycut-coral hover:bg-opacity-90 text-white font-semibold py-3 px-8 rounded-md transition-colors text-lg"
          >
            Request a Deal
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
