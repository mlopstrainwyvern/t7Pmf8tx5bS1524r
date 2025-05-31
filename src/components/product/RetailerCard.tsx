import React, { useState } from "react";
import { Retailer } from "../../types";
import { Copy, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";

interface RetailerCardProps {
  retailer: Retailer;
  bestDeal?: boolean;
}

const RetailerCard = ({ retailer, bestDeal = false }: RetailerCardProps) => {
  const [copied, setCopied] = useState(false);

  const copyDiscountCode = () => {
    if (retailer.discountCode) {
      navigator.clipboard.writeText(retailer.discountCode);
      setCopied(true);
      toast({
        title: "Copied!",
        description: `Discount code "${retailer.discountCode}" copied to clipboard.`,
        duration: 2000,
      });

      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className={`border rounded-lg p-4 ${
        bestDeal ? "border-ebaycut-teal" : "border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <img
            src={
              retailer.logo ||
              `https://www.google.com/s2/favicons?sz=128&domain_url=${encodeURIComponent(
                retailer.url
              )}`
            }
            alt={retailer.name}
            className="w-8 h-8 mr-2 rounded object-contain"
          />

          <span className="font-medium">{retailer.name}</span>
        </div>
        {bestDeal && (
          <Badge className="bg-ebaycut-teal text-white text-xs font-bold px-3 py-1 rounded-full">
            BEST DEAL
          </Badge>
        )}
      </div>

      {/* Display discount code if available */}
      {retailer.discountCode && (
        <div className="mb-3">
          <div className="flex items-center justify-between bg-ebaycut-lightGray border border-dashed border-ebaycut-teal rounded-md p-3">
            <div className="flex items-center">
              <span className="text-xs font-medium text-gray-600 mr-2">
                DISCOUNT CODE:
              </span>
              <span className="font-mono font-bold text-sm text-ebaycut-teal">
                {retailer.discountCode}
              </span>
            </div>
            <button
              onClick={copyDiscountCode}
              className="text-ebaycut-teal hover:text-opacity-80 bg-white p-1 rounded-md shadow-sm"
              title="Copy discount code"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-2xl font-bold text-ebaycut-coral">
            ${retailer.discountPrice.toFixed(2)}
          </span>
          {retailer.discount > 0 && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${retailer.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        {retailer.discount > 0 && (
          <Badge className="bg-gradient-to-r from-ebaycut-coral to-red-500 text-white px-3 py-1 rounded-lg text-sm font-bold shadow-md">
            {retailer.discount}% OFF
          </Badge>
        )}
      </div>
      <a
        href={retailer.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`block w-full text-center py-2 px-4 rounded-md transition-colors ${
          bestDeal
            ? "bg-ebaycut-teal text-white hover:bg-opacity-90"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        View Deal
      </a>
    </div>
  );
};

export default RetailerCard;
