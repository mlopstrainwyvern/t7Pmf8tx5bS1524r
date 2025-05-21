import React from "react";
import { Link } from "react-router-dom";
import { Product } from "../../types";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tag } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  // Get the best deal from all retailers
  const bestDeal = product.retailers.reduce((prev, current) => {
    return prev.discount > current.discount ? prev : current;
  });

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative h-full flex flex-col">
      {bestDeal.discount > 0 && (
        <div className="absolute top-3 right-3 z-10">
          <Badge className="bg-gradient-to-r from-ebaycut-coral to-red-500 text-white rounded-lg px-3 py-1 shadow-md font-bold">
            {bestDeal.discount}% OFF
          </Badge>
        </div>
      )}

      <Link to={`/${product.slug}`} className="h-full flex flex-col">
        <div className="h-64 sm:h-72 overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover object-top transition-transform hover:scale-105"
          />
        </div>

        <CardContent className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {product.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>

          <div className="mt-auto pt-3">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-lg font-bold text-ebaycut-coral">
                  ${bestDeal.discountPrice.toFixed(2)}
                </span>
                {bestDeal.discount > 0 && (
                  <span className="ml-2 text-sm text-gray-500 line-through">
                    ${bestDeal.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {product.variants && (
              <div className="mt-2">
                {product.variants.map(
                  (variant, index) =>
                    variant.type === "color" && (
                      <div
                        key={index}
                        className="flex items-center space-x-1 mt-1"
                      >
                        <span className="text-xs text-gray-500">Colors:</span>
                        <div className="flex space-x-1">
                          {variant.values.slice(0, 3).map((color, i) => (
                            <span
                              key={i}
                              className="w-3 h-3 rounded-full border border-gray-200"
                              style={{ backgroundColor: color }}
                            ></span>
                          ))}
                          {variant.values.length > 3 && (
                            <span className="text-xs text-gray-500">
                              +{variant.values.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                )}
              </div>
            )}

            {product.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {product.tags.slice(0, 2).map((tag, index) => (
                  <Link key={index} to={`/${tag.toLowerCase()}`}>
                    <Badge
                      variant="outline"
                      className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-0.5 rounded"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
