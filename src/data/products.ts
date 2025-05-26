import { Product } from "../types";

export const products: Product[] = [
  {
    id: "1",
    slug: "sony-wh-1000xm5-headphones",
    title: "Sony WH-1000XM5 Wireless Noise Cancelling Headphones",
    description:
      "Industry-leading noise cancellation and exceptional sound quality with this premium wireless headphones.",
    imageUrl:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2865&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2865&q=80",
        alt: "Sony WH-1000XM5 Black",
        isMain: true,
      },
      {
        url: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
        alt: "Sony WH-1000XM5 Side View",
      },
      {
        url: "https://images.unsplash.com/photo-1484704849700-f032a568e944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2940&q=80",
        alt: "Sony WH-1000XM5 Detail",
      },
    ],
    category: "Electronics",
    tags: ["headphones", "audio", "sony", "wireless"],
    featured: true,
    variants: [
      {
        type: "color",
        name: "Color",
        values: ["#000000", "#FFFFFF", "#7E7E7E"],
      },
    ],
    retailers: [
      {
        name: "Amazon",
        url: "https://amazon.com/sony-wh1000xm5",
        originalPrice: 399.99,
        discountPrice: 348.0,
        discount: 13,
        discountCode: "SONY15",
      },
      {
        name: "Best Buy",
        url: "https://bestbuy.com/sony-headphones",
        originalPrice: 399.99,
        discountPrice: 349.99,
        discount: 12,
        logo: "https://logo.clearbit.com/bestbuy.com",
      },
      {
        name: "Sony",
        url: "https://sony.com/headphones",
        originalPrice: 399.99,
        discountPrice: 399.99,
        discount: 0,
        logo: "https://logo.clearbit.com/sony.com",
      },
    ],
  },
  {
    id: "2",
    slug: "apple-airpods-pro-2",
    title: "Apple AirPods Pro (2nd Generation)",
    description:
      "Active Noise Cancellation, Transparency mode, Spatial Audio with dynamic head tracking.",
    imageUrl:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
    category: "Electronics",
    tags: ["earbuds", "audio", "apple", "wireless"],
    featured: true,
    retailers: [
      {
        name: "Apple",
        url: "https://apple.com/airpods-pro",
        originalPrice: 249.99,
        discountPrice: 249.99,
        discount: 0,
        logo: "https://logo.clearbit.com/apple.com",
      },
      {
        name: "Amazon",
        url: "https://amazon.com/airpods-pro",
        originalPrice: 249.99,
        discountPrice: 199.99,
        discount: 20,
        discountCode: "AIRPODS20",
        logo: "https://logo.clearbit.com/amazon.com",
      },
      {
        name: "Walmart",
        url: "https://walmart.com/apple-airpods",
        originalPrice: 249.99,
        discountPrice: 219.99,
        discount: 12,
        logo: "https://logo.clearbit.com/walmart.com",
      },
    ],
  },
  {
    id: "3",
    slug: "nintendo-switch-oled",
    title: "Nintendo Switch OLED Model",
    description:
      "Enhanced gaming with a vibrant 7-inch OLED screen, wide adjustable stand, and enhanced audio.",
    imageUrl:
      "https://images.unsplash.com/photo-1662219708541-39897d41e7a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
    category: "Gaming",
    tags: ["nintendo", "console", "gaming", "switch"],
    featured: false,
    retailers: [
      {
        name: "Nintendo",
        url: "https://nintendo.com/switch-oled",
        originalPrice: 349.99,
        discountPrice: 349.99,
        discount: 0,
        logo: "https://logo.clearbit.com/nintendo.com",
      },
      {
        name: "GameStop",
        url: "https://gamestop.com/nintendo-switch",
        originalPrice: 349.99,
        discountPrice: 329.99,
        discount: 6,
        logo: "https://logo.clearbit.com/gamestop.com",
      },
      {
        name: "Target",
        url: "https://target.com/nintendo",
        originalPrice: 349.99,
        discountPrice: 339.99,
        discount: 3,
        logo: "https://logo.clearbit.com/target.com",
      },
    ],
  },
  {
    id: "4",
    slug: "samsung-galaxy-s23-ultra",
    title: "Samsung Galaxy S23 Ultra",
    description:
      "The latest flagship smartphone with 200MP camera, S Pen functionality, and powerful Snapdragon processor.",
    imageUrl:
      "https://images.unsplash.com/photo-1676911542532-068649d5a85c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2371&q=80",
    category: "Mobile Devices",
    tags: ["samsung", "smartphone", "android", "galaxy"],
    featured: true,
    retailers: [
      {
        name: "Samsung",
        url: "https://samsung.com/galaxy-s23",
        originalPrice: 1199.99,
        discountPrice: 1099.99,
        discount: 8,
        logo: "https://logo.clearbit.com/samsung.com",
      },
      {
        name: "Best Buy",
        url: "https://bestbuy.com/samsung-phones",
        originalPrice: 1199.99,
        discountPrice: 999.99,
        discount: 17,
        logo: "https://logo.clearbit.com/bestbuy.com",
      },
      {
        name: "Verizon",
        url: "https://verizon.com/smartphones",
        originalPrice: 1199.99,
        discountPrice: 899.99,
        discount: 25,
        discountCode: "GALAXY25",
        logo: "https://logo.clearbit.com/verizon.com",
      },
    ],
  },
  {
    id: "5",
    slug: "dyson-airwrap",
    title: "Dyson Airwrap Complete Styler",
    description:
      "Style your hair with air, not extreme heat. Multiple styling attachments for different hair types.",
    imageUrl:
      "https://images.unsplash.com/photo-1637069585336-827b298fe84a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2148&q=80",
    category: "Beauty",
    tags: ["dyson", "hair styler", "beauty", "personal care"],
    featured: true,
    retailers: [
      {
        name: "Dyson",
        url: "https://dyson.com/airwrap",
        originalPrice: 599.99,
        discountPrice: 599.99,
        discount: 0,
        logo: "https://logo.clearbit.com/dyson.com",
      },
      {
        name: "Sephora",
        url: "https://sephora.com/dyson",
        originalPrice: 599.99,
        discountPrice: 549.99,
        discount: 8,
        logo: "https://logo.clearbit.com/sephora.com",
      },
      {
        name: "Ulta Beauty",
        url: "https://ulta.com/dyson-products",
        originalPrice: 599.99,
        discountPrice: 569.99,
        discount: 5,
        logo: "https://logo.clearbit.com/ulta.com",
      },
    ],
  },
  {
    id: "6",
    slug: "lg-c2-oled-tv-65inch",
    title: "LG C2 65-Inch OLED TV",
    description:
      "Incredible 4K picture quality with self-lit pixels and AI-powered processor for stunning visuals.",
    imageUrl:
      "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2370&q=80",
    category: "Electronics",
    tags: ["tv", "oled", "lg", "4k", "home theater"],
    featured: false,
    retailers: [
      {
        name: "LG",
        url: "https://lg.com/c2-oled",
        originalPrice: 2499.99,
        discountPrice: 2299.99,
        discount: 8,
        logo: "https://logo.clearbit.com/lg.com",
      },
      {
        name: "Best Buy",
        url: "https://bestbuy.com/lg-tvs",
        originalPrice: 2499.99,
        discountPrice: 1799.99,
        discount: 28,
        discountCode: "LGTV28",
        logo: "https://logo.clearbit.com/bestbuy.com",
      },
      {
        name: "Amazon",
        url: "https://amazon.com/lg-oled-tvs",
        originalPrice: 2499.99,
        discountPrice: 1899.99,
        discount: 24,
        logo: "https://logo.clearbit.com/amazon.com",
      },
    ],
  },
  // New sample products with additional features
  {
    id: "7",
    slug: "nike-dri-fit-tshirt",
    title: "Nike Dri-FIT Men's Training T-Shirt",
    description:
      "Sweat-wicking fabric helps you stay dry and comfortable during your workout. Relaxed fit for a casual feel.",
    imageUrl:
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2030&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2030&q=80",
        alt: "Nike Dri-FIT T-Shirt Front",
        isMain: true,
      },
      {
        url: "https://images.unsplash.com/photo-1618354691229-88d47f285158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2030&q=80",
        alt: "Nike Dri-FIT T-Shirt Back",
      },
      {
        url: "https://images.unsplash.com/photo-1618354691321-447f29c4a058?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2030&q=80",
        alt: "Nike Dri-FIT T-Shirt Detail",
      },
    ],
    category: "Apparel",
    tags: ["nike", "t-shirt", "sportswear", "dri-fit"],
    featured: true,
    variants: [
      {
        type: "color",
        name: "Color",
        values: ["#000000", "#FFFFFF", "#0A2463", "#D32F2F", "#689F38"],
      },
      {
        type: "size",
        name: "Size",
        values: ["S", "M", "L", "XL", "XXL"],
      },
    ],
    retailers: [
      {
        name: "Nike",
        url: "https://nike.com/dri-fit",
        originalPrice: 35.0,
        discountPrice: 35.0,
        discount: 0,
        logo: "https://logo.clearbit.com/nike.com",
      },
      {
        name: "Dick's Sporting Goods",
        url: "https://dickssportinggoods.com/nike",
        originalPrice: 35.0,
        discountPrice: 29.99,
        discount: 14,
        logo: "https://logo.clearbit.com/dickssportinggoods.com",
      },
      {
        name: "Kohl's",
        url: "https://kohls.com/nike",
        originalPrice: 35.0,
        discountPrice: 24.99,
        discount: 29,
        logo: "https://logo.clearbit.com/kohls.com",
      },
    ],
  },
  {
    id: "8",
    slug: "adidas-hoodie-essential",
    title: "Adidas Essentials Fleece 3-Stripes Full-Zip Hoodie",
    description:
      "Soft fleece construction provides lasting comfort and warmth. The full-zip design makes this hoodie versatile for layering.",
    imageUrl:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2787&q=80",
        alt: "Adidas Hoodie Front",
        isMain: true,
      },
      {
        url: "https://images.unsplash.com/photo-1584539696499-bff0b4768e4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2215&q=80",
        alt: "Adidas Hoodie Back",
      },
      {
        url: "https://images.unsplash.com/photo-1617606002806-94e279c22567?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        alt: "Adidas Hoodie Detail",
      },
    ],
    category: "Apparel",
    tags: ["adidas", "hoodie", "sportswear", "essential"],
    featured: false,
    variants: [
      {
        type: "color",
        name: "Color",
        values: ["#000000", "#0A2463", "#D32F2F", "#808080"],
      },
      {
        type: "size",
        name: "Size",
        values: ["XS", "S", "M", "L", "XL", "XXL"],
      },
    ],
    retailers: [
      {
        name: "Adidas",
        url: "https://adidas.com/hoodies",
        originalPrice: 65.0,
        discountPrice: 65.0,
        discount: 0,
        logo: "https://logo.clearbit.com/adidas.com",
      },
      {
        name: "JD Sports",
        url: "https://jdsports.com/adidas",
        originalPrice: 65.0,
        discountPrice: 52.0,
        discount: 20,
        logo: "https://logo.clearbit.com/jdsports.com",
      },
      {
        name: "Foot Locker",
        url: "https://footlocker.com/adidas",
        originalPrice: 65.0,
        discountPrice: 48.75,
        discount: 25,
        discountCode: "ADIDAS25",
        logo: "https://logo.clearbit.com/footlocker.com",
      },
    ],
  },
  {
    id: "9",
    slug: "ikea-billy-bookcase",
    title: "IKEA BILLY Bookcase",
    description:
      "A timeless bookcase with adjustable shelves that adapts to your needs. Perfect for books and more.",
    imageUrl:
      "https://images.unsplash.com/photo-1588200618450-3a35b0ff58e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    images: [
      {
        url: "https://images.unsplash.com/photo-1588200618450-3a35b0ff58e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        alt: "IKEA BILLY Bookcase",
        isMain: true,
      },
      {
        url: "https://images.unsplash.com/photo-1600210491305-7396500b0610?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
        alt: "IKEA BILLY Bookcase with books",
      },
      {
        url: "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2209&q=80",
        alt: "IKEA BILLY Bookcase in room setting",
      },
    ],
    category: "Furniture",
    tags: ["ikea", "bookcase", "furniture", "storage"],
    featured: false,
    variants: [
      {
        type: "color",
        name: "Finish",
        values: ["#FFFFFF", "#6F4E37", "#000000", "#F5DEB3"],
      },
      {
        type: "size",
        name: "Size",
        values: ["40x28x106 cm", "80x28x106 cm", "80x28x202 cm"],
      },
    ],
    retailers: [
      {
        name: "IKEA",
        url: "https://ikea.com/billy",
        originalPrice: 79.99,
        discountPrice: 79.99,
        discount: 0,
        logo: "https://logo.clearbit.com/ikea.com",
      },
      {
        name: "Amazon",
        url: "https://amazon.com/ikea-billy",
        originalPrice: 99.99,
        discountPrice: 89.99,
        discount: 10,
        logo: "https://logo.clearbit.com/amazon.com",
      },
      {
        name: "Wayfair",
        url: "https://wayfair.com/furniture/billy",
        originalPrice: 109.99,
        discountPrice: 84.99,
        discount: 23,
        discountCode: "FURNITURE23",
        logo: "https://logo.clearbit.com/wayfair.com",
      },
    ],
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter((product) => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter((product) => product.category === category);
};
