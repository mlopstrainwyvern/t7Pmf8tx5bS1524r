import React from "react";
import Layout from "../components/layout/Layout";

const PrivacyPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Introduction
            </h2>
            <p>
              At EbayCut.com, we respect your privacy and are committed to
              protecting your personal data. This Privacy Policy explains how we
              collect, use, disclose, and safeguard your information when you
              visit our website or use our services.
            </p>
            <p className="mt-4">
              Please read this Privacy Policy carefully. If you do not agree
              with the terms of this Privacy Policy, please do not access the
              site or use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Information We Collect
            </h2>
            <p>
              We may collect several types of information from and about users
              of our website, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                <strong>Personal Information:</strong> This includes information
                by which you may be personally identified, such as name, email
                address, and other contact information when you subscribe to our
                newsletter or submit a request.
              </li>
              <li>
                <strong>Usage Information:</strong> Details of your visits to
                our website, including traffic data, location data, logs, and
                other communication data and the resources that you access and
                use on the website.
              </li>
              <li>
                <strong>Device Information:</strong> Information about your
                computer and internet connection, including your IP address,
                operating system, and browser type.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. How We Use Your Information
            </h2>
            <p>
              We may use the information we collect about you for various
              purposes, including:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>To present our website and its contents to you.</li>
              <li>
                To provide you with information, products, or services that you
                request from us.
              </li>
              <li>To fulfill any other purpose for which you provide it.</li>
              <li>To send you newsletters and promotional communications.</li>
              <li>To improve our website and services.</li>
              <li>
                To personalize your experience and deliver content relevant to
                your interests.
              </li>
              <li>For any other purpose with your consent.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Cookies and Tracking Technologies
            </h2>
            <p>
              We use cookies and similar tracking technologies to track activity
              on our website and store certain information. Cookies are files
              with a small amount of data which may include an anonymous unique
              identifier.
            </p>
            <p className="mt-4">
              You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent. However, if you do not accept
              cookies, you may not be able to use some portions of our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Disclosure of Your Information
            </h2>
            <p>
              We may disclose personal information that we collect or you
              provide:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>To our subsidiaries and affiliates.</li>
              <li>
                To contractors, service providers, and other third parties we
                use to support our business.
              </li>
              <li>To comply with any court order, law, or legal process.</li>
              <li>
                To enforce or apply our terms of use and other agreements.
              </li>
              <li>
                If we believe disclosure is necessary to protect the rights,
                property, or safety of EbayCut.com, our customers, or others.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Data Security
            </h2>
            <p>
              We have implemented measures designed to secure your personal
              information from accidental loss and from unauthorized access,
              use, alteration, and disclosure. However, the transmission of
              information via the internet is not completely secure. We cannot
              guarantee the security of your personal information transmitted to
              our website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              7. Your Rights
            </h2>
            <p>
              Depending on your location, you may have certain rights regarding
              your personal information, such as:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                The right to access personal information we hold about you.
              </li>
              <li>
                The right to request correction of inaccurate personal
                information.
              </li>
              <li>
                The right to request deletion of your personal information.
              </li>
              <li>
                The right to object to processing of your personal information.
              </li>
              <li>The right to data portability.</li>
            </ul>
            <p className="mt-4">
              To exercise any of these rights, please contact us using the
              information provided in the "Contact Us" section.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              8. Changes to Our Privacy Policy
            </h2>
            <p>
              We may update our Privacy Policy from time to time. If we make
              material changes to how we treat our users' personal information,
              we will post the new Privacy Policy on this page and notify you
              through a notice on the website home page.
            </p>
            <p className="mt-4">
              The date the Privacy Policy was last revised is identified at the
              top of the page. You are responsible for periodically visiting our
              website and this Privacy Policy to check for any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              9. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> privacy@ebaycut.com
              <br />
              <strong>Address:</strong> 123 Deal Street, Shopping City, DC 12345
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPage;
