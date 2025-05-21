import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Menu, X, Settings } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // Add scroll effect to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to search results with query
    if (searchQuery.trim()) {
      window.location.href = `/ebaycut/products?search=${encodeURIComponent(
        searchQuery
      )}`;
    }
  };

  // Active link style
  const getNavLinkClass = (path: string) => {
    return location.pathname === path
      ? "border-b-2 border-ebaycut-teal text-ebaycut-teal"
      : "border-transparent text-gray-500 hover:border-ebaycut-teal hover:text-ebaycut-teal";
  };

  return (
    <nav
      className={`sticky top-0 z-30 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-ebaycut-teal font-bold text-3xl">
                EbayCut<span className="text-ebaycut-coral">.com</span>
              </span>
            </Link>
          </div>

          {/* Desktop Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-md mx-4">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="text"
                placeholder="Search for deals..."
                className="w-full rounded-full pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </form>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${getNavLinkClass(
                  "/"
                )}`}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${getNavLinkClass(
                  "/products"
                )}`}
              >
                Deals
              </Link>

              <Link
                to="/about"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${getNavLinkClass(
                  "/about"
                )}`}
              >
                About Us
              </Link>

              <Link to="/request">
                <Button className="inline-flex items-center px-5 py-1.5 text-sm font-medium rounded-md border border-ebaycut-coral/80 text-ebaycut-coral/90 bg-transparent hover:bg-ebaycut-coral/5 transition-colors duration-200">
                  Request a Deal
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ebaycut-teal"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search - always visible below header on mobile */}
      <div className="md:hidden px-4 pb-3 pt-2 bg-white">
        <form onSubmit={handleSearch} className="relative">
          <Input
            type="text"
            placeholder="Search for deals..."
            className="w-full rounded-full pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </form>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-white border-t shadow-lg`}
      >
        <div className="pt-2 pb-3 space-y-1">
          <Link
            to="/"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              location.pathname === "/"
                ? "border-l-4 border-ebaycut-teal bg-ebaycut-lightGray text-ebaycut-teal"
                : "border-l-4 border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              location.pathname === "/products"
                ? "border-l-4 border-ebaycut-teal bg-ebaycut-lightGray text-ebaycut-teal"
                : "border-l-4 border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            All Deals
          </Link>

          <Link
            to="/request"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              location.pathname === "/request"
                ? "border-l-4 border-ebaycut-teal bg-ebaycut-lightGray text-ebaycut-teal"
                : "border-l-4 border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Request Deal
          </Link>
          <Link
            to="/about"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              location.pathname === "/about"
                ? "border-l-4 border-ebaycut-teal bg-ebaycut-lightGray text-ebaycut-teal"
                : "border-l-4 border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            About Us
          </Link>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="px-4 space-y-3">
            <Button
              variant="secondary"
              className="w-full bg-ebaycut-coral text-white"
              asChild
            >
              <Link to="/request" onClick={() => setIsMenuOpen(false)}>
                Submit Deal
              </Link>
            </Button>

            <div className="flex justify-end">
              <Link
                to="/admin"
                className="text-xs text-gray-400 hover:text-ebaycut-teal flex items-center"
                onClick={() => setIsMenuOpen(false)}
              >
                <Settings className="h-3 w-3 mr-1" />
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
