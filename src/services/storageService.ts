import { Product } from "../types";
import { products as defaultProducts } from "../data/products";
import initialProductsJson from "../data/initial-products.json";

// Cast the imported JSON to the Product type
const initialProducts: Product[] = initialProductsJson as Product[];

const STORAGE_KEY = "ebaycut_products";

/**
 * Get all products from local storage or initial data
 */
export const getProducts = (): Product[] => {
  try {
    const storedProducts = localStorage.getItem(STORAGE_KEY);
    if (storedProducts) {
      return JSON.parse(storedProducts);
    }
    // Initialize with initial products from JSON file if nothing in storage
    // This allows us to update the products by updating the JSON file
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
    return initialProducts;
  } catch (error) {
    console.error("Error getting products from storage:", error);
    return initialProducts.length > 0 ? initialProducts : defaultProducts;
  }
};

/**
 * Save all products to local storage
 */
export const saveProducts = (products: Product[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Error saving products to storage:", error);
  }
};

/**
 * Add a new product to storage
 */
export const addProduct = (product: Product): Product => {
  try {
    const products = getProducts();
    const updatedProducts = [...products, product];
    saveProducts(updatedProducts);
    return product;
  } catch (error) {
    console.error("Error adding product to storage:", error);
    throw error;
  }
};

/**
 * Update an existing product
 */
export const updateProduct = (product: Product): Product => {
  try {
    const products = getProducts();
    const updatedProducts = products.map((p) =>
      p.id === product.id ? product : p
    );
    saveProducts(updatedProducts);
    return product;
  } catch (error) {
    console.error("Error updating product in storage:", error);
    throw error;
  }
};

/**
 * Delete a product by ID
 */
export const deleteProduct = (productId: string): void => {
  try {
    const products = getProducts();
    const updatedProducts = products.filter((p) => p.id !== productId);
    saveProducts(updatedProducts);
  } catch (error) {
    console.error("Error deleting product from storage:", error);
    throw error;
  }
};

/**
 * Get a product by slug
 */
export const getProductBySlug = (slug: string): Product | undefined => {
  try {
    const products = getProducts();
    return products.find((product) => product.slug === slug);
  } catch (error) {
    console.error("Error getting product by slug:", error);
    return undefined;
  }
};

/**
 * Get a product by ID
 */
export const getProductById = (id: string): Product | undefined => {
  try {
    const products = getProducts();
    return products.find((product) => product.id === id);
  } catch (error) {
    console.error("Error getting product by ID:", error);
    return undefined;
  }
};
