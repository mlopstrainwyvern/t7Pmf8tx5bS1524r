import React, { useEffect } from "react";
import Layout from "../components/layout/Layout";
import HeroSection from "../components/sections/HeroSection";
import HowItWorksSection from "../components/sections/HowItWorksSection";
import FeaturedDealsSection from "../components/sections/FeaturedDealsSection";
import CtaSection from "../components/sections/CtaSection";

const Index = () => {
  // Improve animation stability with intersection observer
  useEffect(() => {
    const animateOnScroll = () => {
      const elements = document.querySelectorAll(".animate-on-scroll");

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-fade-in");
              // Once the animation has been applied, we no longer need to observe this element
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -100px 0px" }
      );

      elements.forEach((element) => observer.observe(element));
    };

    // Init animations with a small delay to ensure DOM is ready
    setTimeout(animateOnScroll, 200);

    // Clean up observer
    return () => {
      const elements = document.querySelectorAll(".animate-on-scroll");
      const observer = new IntersectionObserver(() => {});
      elements.forEach((element) => observer.unobserve(element));
    };
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="animate-on-scroll">
          <HeroSection />
        </div>

        {/* How It Works Section */}
        <div className="animate-on-scroll">
          <HowItWorksSection />
        </div>

        {/* Featured Deals Section */}
        <div className="animate-on-scroll">
          <FeaturedDealsSection />
        </div>

        {/* CTA Section */}
        <div className="animate-on-scroll">
          <CtaSection />
        </div>
      </div>
    </Layout>
  );
};

export default Index;
