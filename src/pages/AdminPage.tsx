import React, { useState, useEffect } from "react";
import Layout from "../components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Product, Retailer, ProductVariant } from "../types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/storageService";
import { exportProductsToJson } from "../services/exportService";
import { useAuth } from "../contexts/AuthContext";

const AdminPage = () => {
  const { toast } = useToast();
  const { isAuthenticated, login } = useAuth();
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Product form state
  const [productForm, setProductForm] = useState({
    title: "",
    description: "",
    category: "",
    imageUrl: "", // Keep for backward compatibility
    tags: "",
    slug: "",
    featured: false,
  });

  // Separate state for product images
  const [productImages, setProductImages] = useState<
    { url: string; alt: string; isMain: boolean }[]
  >([{ url: "", alt: "", isMain: true }]);

  // Retailer form state
  const [retailers, setRetailers] = useState<Partial<Retailer>[]>([
    {
      name: "",
      originalPrice: 0,
      discountPrice: 0,
      discount: 0,
      url: "",
      discountCode: "",
      // Remove logo from initial state since it's optional
    },
  ]);

  // Variant form state
  const [variants, setVariants] = useState<Partial<ProductVariant>[]>([
    { name: "", type: "color", values: [""] },
  ]);

  // Load products on mount
  useEffect(() => {
    if (isAuthenticated) {
      loadProducts();
    }
  }, [isAuthenticated]);

  // Extract unique categories from products
  useEffect(() => {
    if (allProducts.length > 0) {
      const uniqueCategories = Array.from(
        new Set(allProducts.map((product) => product.category))
      );
      setCategories(uniqueCategories);
    }
  }, [allProducts]);

  const loadProducts = () => {
    setIsLoading(true);
    try {
      const products = getProducts();
      setAllProducts(products);
    } catch (error) {
      console.error("Error loading products:", error);
      toast({
        title: "Error loading products",
        description:
          "There was an error loading the products. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);

    if (success) {
      toast({
        title: "Logged in successfully",
        description: "You now have access to the admin panel",
      });
    } else {
      toast({
        title: "Authentication failed",
        description: "Incorrect password",
        variant: "destructive",
      });
    }
  };

  const handleEditProduct = (product: Product) => {
    setIsEditing(true);
    setEditingProductId(product.id);
    setActiveTab("add-product");

    // Set form values
    setProductForm({
      title: product.title,
      description: product.description,
      category: product.category,
      imageUrl: product.imageUrl,
      tags: product.tags.join(", "),
      slug: product.slug,
      featured: product.featured || false,
    });

    // Set product images
    if (product.images && product.images.length > 0) {
      // Ensure all images have isMain property
      const processedImages = product.images.map((img) => ({
        url: img.url,
        alt: img.alt || product.title,
        isMain: img.isMain === true,
      }));

      // Make sure at least one image is marked as main
      if (!processedImages.some((img) => img.isMain)) {
        processedImages[0].isMain = true;
      }

      setProductImages(processedImages);
    } else if (product.imageUrl) {
      // Fallback to imageUrl if no images array
      setProductImages([
        { url: product.imageUrl, alt: product.title, isMain: true },
      ]);
    }

    // Set retailers
    setRetailers(product.retailers);

    // Set variants
    setVariants(product.variants || []);
  };

  const handleDeleteProduct = (productId: string) => {
    setProductToDelete(productId);
    setDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = () => {
    if (productToDelete) {
      try {
        deleteProduct(productToDelete);
        toast({
          title: "Product deleted",
          description: "The product has been successfully deleted.",
        });
        loadProducts();
        setSelectedProducts((prev) =>
          prev.filter((id) => id !== productToDelete)
        );
      } catch (error) {
        console.error("Error deleting product:", error);
        toast({
          title: "Error deleting product",
          description:
            "There was an error deleting the product. Please try again.",
          variant: "destructive",
        });
      }
    }
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  const handleBulkDelete = () => {
    if (selectedProducts.length === 0) return;

    try {
      // Get all products
      const products = getProducts();

      // Filter out selected products
      const updatedProducts = products.filter(
        (product) => !selectedProducts.includes(product.id)
      );

      // Save the updated products
      localStorage.setItem("ebaycut_products", JSON.stringify(updatedProducts));

      toast({
        title: "Products deleted",
        description: `${selectedProducts.length} products have been deleted.`,
      });

      // Reset selected products
      setSelectedProducts([]);

      // Reload products
      loadProducts();
    } catch (error) {
      console.error("Error deleting products:", error);
      toast({
        title: "Error deleting products",
        description:
          "There was an error deleting the products. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // Filter products based on current filters
      const filteredProducts = allProducts
        .filter(
          (product) => !filterCategory || product.category === filterCategory
        )
        .filter(
          (product) =>
            !searchTerm ||
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            product.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );

      // Select all filtered products
      setSelectedProducts(filteredProducts.map((product) => product.id));
    } else {
      // Deselect all
      setSelectedProducts([]);
    }
  };

  const handleSelectProduct = (productId: string, checked: boolean) => {
    if (checked) {
      setSelectedProducts((prev) => [...prev, productId]);
    } else {
      setSelectedProducts((prev) => prev.filter((id) => id !== productId));
    }
  };

  const getFilteredProducts = () => {
    return allProducts
      .filter(
        (product) => !filterCategory || product.category === filterCategory
      )
      .filter(
        (product) =>
          !searchTerm ||
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          product.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
  };

  const handleExportProducts = () => {
    try {
      exportProductsToJson();
      toast({
        title: "Export successful",
        description: "Products have been exported to JSON file.",
      });
    } catch (error) {
      console.error("Error exporting products:", error);
      toast({
        title: "Export failed",
        description: "There was an error exporting the products.",
        variant: "destructive",
      });
    }
  };

  const handleProductChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProductForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFeaturedChange = (checked: boolean) => {
    setProductForm((prev) => ({ ...prev, featured: checked }));
  };

  const handleRetailerChange = (
    index: number,
    field: keyof Retailer,
    value: any
  ) => {
    const updatedRetailers = [...retailers];
    updatedRetailers[index] = { ...updatedRetailers[index], [field]: value };

    // Auto-calculate discount percentage when originalPrice or discountPrice changes
    if (field === "originalPrice" || field === "discountPrice") {
      const retailer = updatedRetailers[index];
      if (
        retailer.originalPrice &&
        retailer.originalPrice > 0 &&
        retailer.discountPrice
      ) {
        const discount = Math.round(
          ((retailer.originalPrice - retailer.discountPrice) /
            retailer.originalPrice) *
            100
        );
        updatedRetailers[index] = { ...updatedRetailers[index], discount };
      }
    }

    setRetailers(updatedRetailers);
  };

  const addRetailer = () => {
    setRetailers([
      ...retailers,
      {
        name: "",
        originalPrice: 0,
        discountPrice: 0,
        discount: 0,
        url: "",
        discountCode: "",
      },
    ]);
  };

  const removeRetailer = (index: number) => {
    const updatedRetailers = [...retailers];
    updatedRetailers.splice(index, 1);
    setRetailers(updatedRetailers);
  };

  const handleVariantChange = (
    index: number,
    field: keyof ProductVariant,
    value: any
  ) => {
    const updatedVariants = [...variants];
    updatedVariants[index] = { ...updatedVariants[index], [field]: value };
    setVariants(updatedVariants);
  };

  const handleVariantValueChange = (
    variantIndex: number,
    valueIndex: number,
    value: string
  ) => {
    const updatedVariants = [...variants];
    const currentValues = updatedVariants[variantIndex].values || [""];
    const newValues = [...currentValues];
    newValues[valueIndex] = value;
    updatedVariants[variantIndex] = {
      ...updatedVariants[variantIndex],
      values: newValues,
    };
    setVariants(updatedVariants);
  };

  const addVariantValue = (variantIndex: number) => {
    const updatedVariants = [...variants];
    const currentValues = updatedVariants[variantIndex].values || [""];
    updatedVariants[variantIndex] = {
      ...updatedVariants[variantIndex],
      values: [...currentValues, ""],
    };
    setVariants(updatedVariants);
  };

  const removeVariantValue = (variantIndex: number, valueIndex: number) => {
    const updatedVariants = [...variants];
    const currentValues = updatedVariants[variantIndex].values || [""];
    const newValues = [...currentValues];
    newValues.splice(valueIndex, 1);
    updatedVariants[variantIndex] = {
      ...updatedVariants[variantIndex],
      values: newValues,
    };
    setVariants(updatedVariants);
  };

  const addVariant = () => {
    setVariants([...variants, { name: "", type: "color", values: [""] }]);
  };

  const removeVariant = (index: number) => {
    const updatedVariants = [...variants];
    updatedVariants.splice(index, 1);
    setVariants(updatedVariants);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Process tags
      const tagArray = productForm.tags.split(",").map((tag) => tag.trim());

      if (isEditing && editingProductId) {
        // Update existing product
        const existingProduct = allProducts.find(
          (p) => p.id === editingProductId
        );
        if (!existingProduct) {
          throw new Error("Product not found");
        }

        const updatedProduct: Product = {
          ...existingProduct,
          title: productForm.title,
          description: productForm.description,
          category: productForm.category,
          imageUrl: productForm.imageUrl,
          slug:
            productForm.slug ||
            productForm.title.toLowerCase().replace(/\s+/g, "-"),
          tags: tagArray,
          featured: productForm.featured,
          retailers: retailers as Retailer[],
          variants: variants as ProductVariant[],
          images: productImages,
        };

        updateProduct(updatedProduct);

        toast({
          title: "Product updated successfully",
          description: `${updatedProduct.title} has been updated.`,
        });
      } else {
        // Create new product
        // Generate a new product ID
        const newId =
          allProducts.length > 0
            ? (
                Math.max(...allProducts.map((p) => parseInt(p.id))) + 1
              ).toString()
            : "1";

        // Create the new product
        const newProduct: Product = {
          id: newId,
          title: productForm.title,
          description: productForm.description,
          category: productForm.category,
          imageUrl: productForm.imageUrl,
          slug:
            productForm.slug ||
            productForm.title.toLowerCase().replace(/\s+/g, "-"),
          tags: tagArray,
          featured: productForm.featured,
          retailers: retailers as Retailer[],
          variants: variants as ProductVariant[],
          images: productImages,
        };

        addProduct(newProduct);

        toast({
          title: "Product added successfully",
          description: `${newProduct.title} has been added to the database.`,
        });
      }

      // Reset form and state
      setProductForm({
        title: "",
        description: "",
        category: "",
        imageUrl: "",
        tags: "",
        slug: "",
        featured: false,
      });
      setProductImages([{ url: "", alt: "", isMain: true }]);
      setRetailers([
        {
          name: "",
          originalPrice: 0,
          discountPrice: 0,
          discount: 0,
          url: "",
          discountCode: "",
          // Logo is optional, so we don't need to initialize it
        },
      ]);
      setVariants([{ name: "", type: "color", values: [""] }]);
      setIsEditing(false);
      setEditingProductId(null);
      loadProducts();
      setActiveTab("products");
    } catch (error) {
      console.error("Error saving product:", error);
      toast({
        title: `Error ${isEditing ? "updating" : "adding"} product`,
        description: `There was an error ${
          isEditing ? "updating" : "adding"
        } the product. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <Layout>
        <div className="max-w-md mx-auto my-16 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-ebaycut-teal">
              Login
            </Button>
          </form>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="add-product">
              {isEditing ? "Edit Product" : "Add Product"}
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="dashboard"
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium mb-2">Total Products</h3>
                <p className="text-3xl font-bold text-ebaycut-teal">
                  {allProducts.length}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium mb-2">Categories</h3>
                <p className="text-3xl font-bold text-ebaycut-teal">
                  {new Set(allProducts.map((p) => p.category)).size}
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium mb-2">Retailers</h3>
                <p className="text-3xl font-bold text-ebaycut-teal">
                  {
                    new Set(
                      allProducts.flatMap((p) => p.retailers.map((r) => r.name))
                    ).size
                  }
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => setActiveTab("add-product")}
                  className="bg-ebaycut-teal"
                >
                  Add New Product
                </Button>
                <Button
                  onClick={() => setActiveTab("products")}
                  variant="outline"
                >
                  Manage Products
                </Button>
                <Button onClick={handleExportProducts} variant="outline">
                  Export Products
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent
            value="products"
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Manage Products</h2>
              <div className="flex gap-2">
                <Button
                  onClick={handleExportProducts}
                  variant="outline"
                  size="sm"
                >
                  Export Products
                </Button>
                <Button
                  onClick={() => {
                    setIsEditing(false);
                    setEditingProductId(null);
                    setProductForm({
                      title: "",
                      description: "",
                      category: "",
                      imageUrl: "",
                      tags: "",
                      slug: "",
                      featured: false,
                    });
                    setRetailers([
                      {
                        name: "",
                        originalPrice: 0,
                        discountPrice: 0,
                        discount: 0,
                        url: "",
                        discountCode: "",
                        // Logo is optional, so we don't need to initialize it
                      },
                    ]);
                    setVariants([{ name: "", type: "color", values: [""] }]);
                    setActiveTab("add-product");
                  }}
                  className="bg-ebaycut-teal"
                >
                  Add New Product
                </Button>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Search Products
                </label>
                <Input
                  placeholder="Search by title, description, or tags"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Category
                </label>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-ebaycut-teal"
                >
                  <option value="">All Categories</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end">
                {selectedProducts.length > 0 && (
                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={handleBulkDelete}
                    >
                      Delete Selected ({selectedProducts.length})
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedProducts([])}
                    >
                      Clear Selection
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {isLoading ? (
              <div className="text-center py-8">
                <p>Loading products...</p>
              </div>
            ) : allProducts.length === 0 ? (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  No products found. Add your first product!
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox
                          checked={
                            selectedProducts.length > 0 &&
                            selectedProducts.length ===
                              getFilteredProducts().length
                          }
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price Range</TableHead>
                      <TableHead>Featured</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredProducts().map((product) => {
                      // Calculate price range
                      const prices = product.retailers.map(
                        (r) => r.discountPrice
                      );
                      const minPrice =
                        prices.length > 0 ? Math.min(...prices) : 0;
                      const maxPrice =
                        prices.length > 0 ? Math.max(...prices) : 0;

                      return (
                        <TableRow key={product.id}>
                          <TableCell>
                            <Checkbox
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={(checked) =>
                                handleSelectProduct(
                                  product.id,
                                  checked as boolean
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <img
                              src={product.imageUrl}
                              alt={product.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <span className="truncate max-w-[200px]">
                                {product.title}
                              </span>
                              <span className="text-xs text-gray-500">
                                ID: {product.id}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>
                            {minPrice === maxPrice
                              ? `$${minPrice.toFixed(2)}`
                              : `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(
                                  2
                                )}`}
                            <div className="text-xs text-gray-500">
                              {product.retailers.length} retailer
                              {product.retailers.length !== 1 ? "s" : ""}
                            </div>
                          </TableCell>
                          <TableCell>
                            {product.featured ? (
                              <Badge className="bg-ebaycut-teal">
                                Featured
                              </Badge>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditProduct(product)}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {getFilteredProducts().length === 0 && (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <p className="text-gray-500">
                            No products match your search criteria.
                          </p>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>

          <TabsContent
            value="add-product"
            className="bg-white rounded-lg shadow-md p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-4">
              {isEditing ? "Edit Product" : "Add New Product"}
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-6">
              <div className="lg:col-span-2">
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Product Title*
                      </label>
                      <Input
                        id="title"
                        name="title"
                        value={productForm.title}
                        onChange={handleProductChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="category"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Category*
                      </label>
                      <div className="relative">
                        <Input
                          id="category"
                          name="category"
                          value={productForm.category}
                          onChange={handleProductChange}
                          list="category-suggestions"
                          required
                        />
                        <datalist id="category-suggestions">
                          {categories.map((category, index) => (
                            <option key={index} value={category} />
                          ))}
                        </datalist>
                      </div>
                      {categories.length > 0 && (
                        <div className="mt-1 flex flex-wrap gap-1">
                          {categories.slice(0, 5).map((category, index) => (
                            <button
                              key={index}
                              type="button"
                              className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
                              onClick={() =>
                                setProductForm((prev) => ({
                                  ...prev,
                                  category,
                                }))
                              }
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Description*
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      value={productForm.description}
                      onChange={handleProductChange}
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Product Images
                      </label>
                      <div className="space-y-3">
                        {productImages.map((image, index) => (
                          <div key={index} className="border rounded-md p-3">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="text-sm font-medium">
                                Image #{index + 1}
                              </h4>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center">
                                  <input
                                    type="radio"
                                    id={`main-image-${index}`}
                                    name="main-image"
                                    checked={image.isMain}
                                    onChange={() => {
                                      const updatedImages = productImages.map(
                                        (img, i) => ({
                                          ...img,
                                          isMain: i === index,
                                        })
                                      );
                                      setProductImages(updatedImages);
                                    }}
                                    className="mr-1"
                                  />
                                  <label
                                    htmlFor={`main-image-${index}`}
                                    className="text-xs"
                                  >
                                    Main
                                  </label>
                                </div>
                                {productImages.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedImages = [...productImages];
                                      updatedImages.splice(index, 1);

                                      // If we removed the main image, set the first one as main
                                      if (
                                        image.isMain &&
                                        updatedImages.length > 0
                                      ) {
                                        updatedImages[0].isMain = true;
                                      }

                                      setProductImages(updatedImages);

                                      // Update imageUrl for backward compatibility
                                      const mainImage = updatedImages.find(
                                        (img) => img.isMain
                                      );
                                      if (mainImage) {
                                        setProductForm((prev) => ({
                                          ...prev,
                                          imageUrl: mainImage.url,
                                        }));
                                      }
                                    }}
                                    className="text-red-500 text-xs"
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              <div>
                                <label className="block text-xs text-gray-600 mb-1">
                                  Image URL*
                                </label>
                                <Input
                                  value={image.url}
                                  onChange={(e) => {
                                    const updatedImages = [...productImages];
                                    updatedImages[index].url = e.target.value;
                                    setProductImages(updatedImages);

                                    // Update imageUrl for backward compatibility if this is the main image
                                    if (image.isMain) {
                                      setProductForm((prev) => ({
                                        ...prev,
                                        imageUrl: e.target.value,
                                      }));
                                    }
                                  }}
                                  placeholder="https://example.com/image.jpg"
                                  required
                                />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-600 mb-1">
                                  Alt Text
                                </label>
                                <Input
                                  value={image.alt}
                                  onChange={(e) => {
                                    const updatedImages = [...productImages];
                                    updatedImages[index].alt = e.target.value;
                                    setProductImages(updatedImages);
                                  }}
                                  placeholder="Image description"
                                />
                              </div>
                            </div>
                            {image.url && (
                              <div className="mt-2">
                                <img
                                  src={image.url}
                                  alt={image.alt || "Preview"}
                                  className="h-16 object-contain rounded border"
                                />
                              </div>
                            )}
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setProductImages([
                              ...productImages,
                              { url: "", alt: "", isMain: false },
                            ]);
                          }}
                          className="w-full"
                        >
                          Add Another Image
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="slug"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Slug (optional)
                      </label>
                      <Input
                        id="slug"
                        name="slug"
                        value={productForm.slug}
                        onChange={handleProductChange}
                        placeholder="product-url-slug"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Leave empty to generate automatically from title
                      </p>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="tags"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Tags (comma separated)
                    </label>
                    <Input
                      id="tags"
                      name="tags"
                      value={productForm.tags}
                      onChange={handleProductChange}
                      placeholder="electronics, gadgets, sale"
                    />
                  </div>

                  <div className="mb-6 flex items-center space-x-2">
                    <Checkbox
                      id="featured"
                      checked={productForm.featured}
                      onCheckedChange={handleFeaturedChange}
                    />
                    <label
                      htmlFor="featured"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Featured product (will appear on homepage)
                    </label>
                  </div>

                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Retailers</h3>
                      <Button
                        type="button"
                        onClick={addRetailer}
                        variant="outline"
                        size="sm"
                      >
                        Add Retailer
                      </Button>
                    </div>

                    {retailers.map((retailer, index) => (
                      <div key={index} className="border rounded-md p-4 mb-4">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">Retailer #{index + 1}</h4>
                          {retailers.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeRetailer(index)}
                              className="text-red-500 text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Retailer Name*
                            </label>
                            <Input
                              value={retailer.name}
                              onChange={(e) =>
                                handleRetailerChange(
                                  index,
                                  "name",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Logo URL (optional)
                            </label>
                            <Input
                              value={retailer.logo || ""}
                              onChange={(e) =>
                                handleRetailerChange(
                                  index,
                                  "logo",
                                  e.target.value
                                )
                              }
                              placeholder="https://example.com/logo.png"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Original Price*
                            </label>
                            <Input
                              type="number"
                              value={retailer.originalPrice}
                              onChange={(e) =>
                                handleRetailerChange(
                                  index,
                                  "originalPrice",
                                  parseFloat(e.target.value)
                                )
                              }
                              step="0.01"
                              min="0"
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Discount Price*
                            </label>
                            <Input
                              type="number"
                              value={retailer.discountPrice}
                              onChange={(e) =>
                                handleRetailerChange(
                                  index,
                                  "discountPrice",
                                  parseFloat(e.target.value)
                                )
                              }
                              step="0.01"
                              min="0"
                              required
                            />
                            <p className="text-xs text-gray-500 mt-1">
                              Discount % will auto-calculate
                            </p>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Discount %
                            </label>
                            <Input
                              type="number"
                              value={retailer.discount}
                              onChange={(e) =>
                                handleRetailerChange(
                                  index,
                                  "discount",
                                  parseInt(e.target.value)
                                )
                              }
                              min="0"
                              max="100"
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Product URL*
                            </label>
                            <Input
                              value={retailer.url}
                              onChange={(e) =>
                                handleRetailerChange(
                                  index,
                                  "url",
                                  e.target.value
                                )
                              }
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Discount Code
                            </label>
                            <Input
                              value={retailer.discountCode}
                              onChange={(e) =>
                                handleRetailerChange(
                                  index,
                                  "discountCode",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium">Product Variants</h3>
                      <Button
                        type="button"
                        onClick={addVariant}
                        variant="outline"
                        size="sm"
                      >
                        Add Variant
                      </Button>
                    </div>

                    {variants.map((variant, variantIndex) => (
                      <div
                        key={variantIndex}
                        className="border rounded-md p-4 mb-4"
                      >
                        <div className="flex justify-between mb-2">
                          <h4 className="font-medium">
                            Variant #{variantIndex + 1}
                          </h4>
                          {variants.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeVariant(variantIndex)}
                              className="text-red-500 text-sm"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Variant Name*
                            </label>
                            <Input
                              value={variant.name}
                              onChange={(e) =>
                                handleVariantChange(
                                  variantIndex,
                                  "name",
                                  e.target.value
                                )
                              }
                              placeholder="Color, Size, etc."
                              required
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Variant Type*
                            </label>
                            <select
                              value={variant.type}
                              onChange={(e) =>
                                handleVariantChange(
                                  variantIndex,
                                  "type",
                                  e.target.value
                                )
                              }
                              className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-ebaycut-teal"
                              required
                            >
                              <option value="color">Color</option>
                              <option value="size">Size</option>
                              <option value="material">Material</option>
                              <option value="other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Variant Values*
                          </label>
                          {variant.values?.map((value, valueIndex) => (
                            <div
                              key={valueIndex}
                              className="flex items-center mb-2"
                            >
                              <Input
                                value={value}
                                onChange={(e) =>
                                  handleVariantValueChange(
                                    variantIndex,
                                    valueIndex,
                                    e.target.value
                                  )
                                }
                                className="flex-1"
                                placeholder={
                                  variant.type === "color"
                                    ? "red, #FF0000, etc."
                                    : "S, M, L, etc."
                                }
                                required
                              />
                              <div className="flex ml-2">
                                {valueIndex ===
                                  (variant.values?.length || 0) - 1 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      addVariantValue(variantIndex)
                                    }
                                    className="text-ebaycut-teal text-sm px-2 py-1 border border-ebaycut-teal rounded-md mr-1"
                                  >
                                    +
                                  </button>
                                )}
                                {(variant.values?.length || 0) > 1 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      removeVariantValue(
                                        variantIndex,
                                        valueIndex
                                      )
                                    }
                                    className="text-red-500 text-sm px-2 py-1 border border-red-500 rounded-md"
                                  >
                                    -
                                  </button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (isEditing) {
                          setIsEditing(false);
                          setEditingProductId(null);
                          setProductForm({
                            title: "",
                            description: "",
                            category: "",
                            imageUrl: "",
                            tags: "",
                            slug: "",
                            featured: false,
                          });
                          setProductImages([
                            { url: "", alt: "", isMain: true },
                          ]);
                          setRetailers([
                            {
                              name: "",
                              originalPrice: 0,
                              discountPrice: 0,
                              discount: 0,
                              url: "",
                              discountCode: "",
                              // Logo is optional, so we don't need to initialize it
                            },
                          ]);
                          setVariants([
                            { name: "", type: "color", values: [""] },
                          ]);
                        }
                        setActiveTab("products");
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="bg-ebaycut-teal"
                      disabled={isSubmitting}
                    >
                      {isSubmitting
                        ? isEditing
                          ? "Updating Product..."
                          : "Adding Product..."
                        : isEditing
                        ? "Update Product"
                        : "Add Product"}
                    </Button>
                  </div>
                </form>
              </div>

              {/* Product Preview */}
              <div className="lg:col-span-1">
                <h3 className="text-lg font-medium mb-4">Product Preview</h3>
                <Card className="overflow-hidden">
                  {productImages.some((img) => img.url) ? (
                    <div className="relative">
                      <img
                        src={
                          productImages.find((img) => img.isMain)?.url ||
                          productImages[0].url
                        }
                        alt={productForm.title || "Product preview"}
                        className="w-full h-48 object-cover"
                      />
                      {productForm.featured && (
                        <Badge className="absolute top-2 right-2 bg-ebaycut-teal">
                          Featured
                        </Badge>
                      )}
                      {productImages.length > 1 && (
                        <Badge
                          variant="outline"
                          className="absolute bottom-2 right-2"
                        >
                          +{productImages.filter((img) => img.url).length - 1}{" "}
                          more
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                      <p className="text-gray-400">No image URL provided</p>
                    </div>
                  )}
                  <CardContent className="p-4">
                    <h4 className="font-semibold truncate">
                      {productForm.title || "Product Title"}
                    </h4>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                      {productForm.description ||
                        "Product description will appear here."}
                    </p>

                    {productForm.category && (
                      <div className="mt-2">
                        <Badge variant="outline" className="mr-1">
                          {productForm.category}
                        </Badge>
                      </div>
                    )}

                    {productForm.tags && (
                      <div className="mt-2 flex flex-wrap gap-1">
                        {productForm.tags.split(",").map(
                          (tag, index) =>
                            tag.trim() && (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-xs"
                              >
                                {tag.trim()}
                              </Badge>
                            )
                        )}
                      </div>
                    )}

                    {retailers.length > 0 && retailers[0].name && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm font-medium">Price comparison:</p>
                        <ul className="mt-1 space-y-1">
                          {retailers.map(
                            (retailer, index) =>
                              retailer.name && (
                                <li
                                  key={index}
                                  className="text-sm flex justify-between"
                                >
                                  <span>{retailer.name}</span>
                                  <span className="font-medium">
                                    ${retailer.discountPrice?.toFixed(2)}
                                    {retailer.discount > 0 && (
                                      <span className="text-green-600 ml-1">
                                        (-{retailer.discount}%)
                                      </span>
                                    )}
                                  </span>
                                </li>
                              )
                          )}
                        </ul>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2">Preview Notes:</h4>
                  <ul className="text-xs text-gray-600 space-y-1 list-disc pl-4">
                    <li>
                      This preview shows how your product will appear on the
                      site
                    </li>
                    <li>Add an image URL to see the product image</li>
                    <li>Featured products will appear on the homepage</li>
                    <li>Add retailers to show price comparison</li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteProduct}
              className="bg-red-500 hover:bg-red-600"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Layout>
  );
};

export default AdminPage;
