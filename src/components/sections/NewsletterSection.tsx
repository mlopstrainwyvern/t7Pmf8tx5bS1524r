
import React, { useState } from 'react';
import { CircleCheck } from "lucide-react";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: "Thanks for subscribing!",
        description: "You'll now receive the best deals in your inbox.",
      });
      setEmail('');
    }
  };
  
  return (
    <div className="bg-dealdash-lightGray rounded-lg p-10 my-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-4">Get the Best Deals in Your Inbox</h2>
        <p className="text-gray-600 mb-6">Subscribe to our newsletter and never miss out on exclusive offers.</p>
        
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            className="flex-grow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="bg-dealdash-coral hover:bg-opacity-90 text-white">
            Subscribe
          </Button>
        </form>
        
        <div className="mt-6 flex items-center justify-center text-sm text-gray-500">
          <CircleCheck className="h-4 w-4 mr-2 text-dealdash-teal" />
          <span>We respect your privacy and will never share your email</span>
        </div>
      </div>
    </div>
  );
}

export default NewsletterSection;
