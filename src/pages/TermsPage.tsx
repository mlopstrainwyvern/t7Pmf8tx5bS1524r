import React from "react";
import Layout from "../components/layout/Layout";

const TermsPage = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Terms of Service
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
              Welcome to EbayCut.com ("we," "our," or "us"). These Terms of
              Service ("Terms") govern your access to and use of the EbayCut.com
              website, including any content, functionality, and services
              offered on or through the website (the "Service").
            </p>
            <p className="mt-4">
              By accessing or using the Service, you agree to be bound by these
              Terms. If you do not agree to these Terms, you must not access or
              use the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Eligibility
            </h2>
            <p>
              The Service is intended for users who are at least 18 years old.
              By using the Service, you represent and warrant that you are of
              legal age to form a binding contract with us and meet all of the
              foregoing eligibility requirements.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. User Accounts
            </h2>
            <p>
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times. Failure to
              do so constitutes a breach of the Terms, which may result in
              immediate termination of your account on our Service.
            </p>
            <p className="mt-4">
              You are responsible for safeguarding the password that you use to
              access the Service and for any activities or actions under your
              password. You agree not to disclose your password to any third
              party. You must notify us immediately upon becoming aware of any
              breach of security or unauthorized use of your account.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Content and Deals
            </h2>
            <p>
              Our Service allows you to view deals and discounts from various
              retailers. We make every effort to ensure that the information
              provided is accurate and up-to-date. However, we do not guarantee
              the accuracy, completeness, or reliability of any deals,
              discounts, or other information displayed on the Service.
            </p>
            <p className="mt-4">
              Prices, availability, and terms of offers may change without
              notice. We are not responsible for any inaccuracies or for any
              actions taken in reliance on information provided on the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Third-Party Websites and Services
            </h2>
            <p>
              The Service may contain links to third-party websites or services
              that are not owned or controlled by EbayCut.com. We have no
              control over, and assume no responsibility for, the content,
              privacy policies, or practices of any third-party websites or
              services.
            </p>
            <p className="mt-4">
              You acknowledge and agree that we shall not be responsible or
              liable, directly or indirectly, for any damage or loss caused or
              alleged to be caused by or in connection with the use of or
              reliance on any such content, goods, or services available on or
              through any such websites or services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Limitation of Liability
            </h2>
            <p>
              In no event shall EbayCut.com, its directors, employees, partners,
              agents, suppliers, or affiliates, be liable for any indirect,
              incidental, special, consequential, or punitive damages, including
              without limitation, loss of profits, data, use, goodwill, or other
              intangible losses, resulting from:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>
                Your access to or use of or inability to access or use the
                Service;
              </li>
              <li>Any conduct or content of any third party on the Service;</li>
              <li>Any content obtained from the Service; and</li>
              <li>
                Unauthorized access, use, or alteration of your transmissions or
                content.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              7. Changes to Terms
            </h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms at any time. If a revision is material, we will try to
              provide at least 30 days' notice prior to any new terms taking
              effect. What constitutes a material change will be determined at
              our sole discretion.
            </p>
            <p className="mt-4">
              By continuing to access or use our Service after those revisions
              become effective, you agree to be bound by the revised terms. If
              you do not agree to the new terms, please stop using the Service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              8. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> support@ebaycut.com
              <br />
              <strong>Address:</strong> 123 Deal Street, Shopping City, DC 12345
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsPage;
