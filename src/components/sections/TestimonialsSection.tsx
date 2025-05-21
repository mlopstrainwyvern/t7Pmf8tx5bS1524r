
import React from 'react';

const testimonials = [
  {
    name: "Sarah Johnson",
    text: "DealDash helped me save over $300 on my new laptop. The deals are always verified and current!",
  },
  {
    name: "Michael Chen",
    text: "I love how easy it is to find discounts across multiple stores. This is now my go-to before making any purchase.",
  },
  {
    name: "Emily Rodriguez",
    text: "The deal request feature is amazing! I asked about a specific camera model and found a 30% discount the next day.",
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <div className="my-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">What Our Users Say</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="flex items-center space-x-1 mb-3 text-dealdash-yellow">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
            <p className="font-semibold">{testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialsSection;
