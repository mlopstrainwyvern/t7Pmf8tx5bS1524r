import React from "react";

const HowItWorksSection: React.FC = () => {
  return (
    <div className="my-16" id="how-it-works">
      <h2 className="text-3xl font-bold text-center mb-10">
        How EbayCut.com Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-t-4 border-ebaycut-teal">
          <div className="bg-ebaycut-lightGray w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-ebaycut-teal text-xl font-bold">1</span>
          </div>
          <h3 className="text-xl font-bold text-center mb-2">We Find Deals</h3>
          <p className="text-gray-600 text-center">
            Our team searches the web to find the best discounts across popular
            retailers.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-t-4 border-ebaycut-coral">
          <div className="bg-ebaycut-lightGray w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-ebaycut-coral text-xl font-bold">2</span>
          </div>
          <h3 className="text-xl font-bold text-center mb-2">We Verify Them</h3>
          <p className="text-gray-600 text-center">
            Every deal is checked to ensure the discount is genuine and
            worthwhile.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-t-4 border-ebaycut-yellow">
          <div className="bg-ebaycut-lightGray w-14 h-14 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-ebaycut-yellow text-xl font-bold">3</span>
          </div>
          <h3 className="text-xl font-bold text-center mb-2">You Save Money</h3>
          <p className="text-gray-600 text-center">
            Shop with confidence knowing you're getting the best possible price.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksSection;
