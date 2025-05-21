
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <Layout>
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-5xl font-bold text-dealdash-teal mb-4">404</h1>
          <p className="text-2xl font-medium text-gray-800 mb-6">Oops! Page not found</p>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="btn-deal">
              Return to Home
            </Link>
            <Link to="/products" className="btn-secondary">
              Browse Deals
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
