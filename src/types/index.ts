export interface Product {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  images?: ProductImage[];
  category: string;
  tags: string[];
  featured?: boolean;
  retailers: Retailer[];
  variants?: ProductVariant[];
}

export interface ProductImage {
  url: string;
  alt: string;
  isMain?: boolean;
}

export interface ProductVariant {
  type: "color" | "size" | "style" | "material" | "other";
  name: string;
  values: string[];
}

export interface Retailer {
  name: string;
  url: string;
  originalPrice: number;
  discountPrice: number;
  discount: number;
  logo?: string;
  discountCode?: string;
}

export interface ProductRequest {
  id?: string;
  name: string;
  email: string;
  productUrl: string;
  comment?: string;
  createdAt?: string;
  status?: "pending" | "approved" | "rejected";
}
