import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactPage = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description:
          "We've received your message and will get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Contact Us
        </h1>
        <p className="text-gray-600 text-center max-w-3xl mx-auto mb-12">
          Have questions about our service or need assistance? We're here to
          help! Fill out the form below or use one of our contact methods.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-ebaycut-lightGray p-3 rounded-full mb-4">
              <Mail className="h-6 w-6 text-ebaycut-teal" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600 mb-2">For general inquiries:</p>
            <a
              href="mailto:info@ebaycut.com"
              className="text-ebaycut-teal hover:underline"
            >
              info@ebaycut.com
            </a>
            <p className="text-gray-600 mt-2 mb-2">For support:</p>
            <a
              href="mailto:support@ebaycut.com"
              className="text-ebaycut-teal hover:underline"
            >
              support@ebaycut.com
            </a>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-ebaycut-lightGray p-3 rounded-full mb-4">
              <Phone className="h-6 w-6 text-ebaycut-teal" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-2">Customer Service:</p>
            <a
              href="tel:+18005551234"
              className="text-ebaycut-teal hover:underline"
            >
              +1 (800) 555-1234
            </a>
            <p className="text-gray-600 mt-4 text-sm">
              Monday - Friday: 9am - 5pm EST
              <br />
              Saturday: 10am - 2pm EST
              <br />
              Sunday: Closed
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <div className="bg-ebaycut-lightGray p-3 rounded-full mb-4">
              <MapPin className="h-6 w-6 text-ebaycut-teal" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Our Location</h3>
            <p className="text-gray-600">
              EbayCut.com Headquarters
              <br />
              123 Deal Street
              <br />
              Shopping City, DC 12345
              <br />
              United States
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can we help you?"
                required
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Please provide details about your inquiry..."
                rows={6}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-ebaycut-teal hover:bg-opacity-90 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </span>
              )}
            </Button>
          </form>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Frequently Asked Questions
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                How do I request a specific deal?
              </h3>
              <p className="text-gray-600">
                You can request a specific deal by visiting our "Request Deal"
                page and filling out the form with details about the product
                you're looking for.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Are the discount codes always valid?
              </h3>
              <p className="text-gray-600">
                We make every effort to ensure that all discount codes are valid
                and up-to-date. However, retailers may change or expire codes
                without notice. If you find an invalid code, please let us know.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                How often are new deals added?
              </h3>
              <p className="text-gray-600">
                We add new deals daily. Our team is constantly searching for the
                best discounts across various retailers to bring you the most
                current savings opportunities.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Can I suggest a retailer to be included?
              </h3>
              <p className="text-gray-600">
                Absolutely! We welcome suggestions for new retailers to include
                in our deal listings. Please use the contact form above to send
                us your recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
