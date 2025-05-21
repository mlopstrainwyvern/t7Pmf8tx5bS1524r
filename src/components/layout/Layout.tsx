
import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  
  // Determine if this is a product page
  const isProductPage = location.pathname.startsWith('/product/');
  const productSlug = isProductPage ? location.pathname.split('/')[2] : null;
  
  // Add product metadata if we're on a product page
  React.useEffect(() => {
    if (isProductPage && productSlug) {
      // Update the canonical URL to support direct access via xyz.com/product-name
      const link = document.createElement('link');
      link.rel = 'canonical';
      link.href = `${window.location.origin}/${productSlug}`;
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [isProductPage, productSlug]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
