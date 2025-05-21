import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CtaSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-ebaycut-teal to-cyan-500 rounded-lg p-10 my-16 text-center text-white shadow-lg">
      <h2 className="text-3xl font-bold mb-4">
        Can't find what you're looking for?
      </h2>
      <p className="text-white opacity-90 mb-8 max-w-2xl mx-auto">
        Let us know what product you want to find deals on, and we'll add it to
        our collection.
      </p>
      <Link
        to="/request"
        className="bg-white text-ebaycut-teal hover:bg-opacity-90 font-semibold py-3 px-8 rounded-md transition-colors inline-flex items-center text-lg"
      >
        Request a Product <ArrowRight className="ml-2 h-5 w-5" />
      </Link>
    </div>
  );
};

export default CtaSection;
