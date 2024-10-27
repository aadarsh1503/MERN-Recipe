// PrivacyPolicyPage.js
import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-100 text-gray-800 min-h-[78vh]">
      <div className="max-w-full sm:max-w-4xl lg:max-w-6xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-center">Privacy Policy</h1>
        <div className="space-y-8">
          <section>
            <h2 className="text-3xl font-bold mb-4">Introduction</h2>
            <p className="text-lg">
              Welcome to FusionX's Privacy Policy. This policy explains how we handle your personal information when you use our website and services.
            </p>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold mb-4">Information We Collect</h2>
            <p className="text-lg">
              We collect various types of information in connection with your use of our website, including personal information, usage data, and cookies.
            </p>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold mb-4">How We Use Your Information</h2>
            <p className="text-lg">
              The information we collect is used to improve our services, communicate with you, and ensure the security of our website.
            </p>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold mb-4">Your Rights</h2>
            <p className="text-lg">
              You have the right to access, correct, or delete your personal information. Please contact us if you wish to exercise these rights.
            </p>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold mb-4">Changes to This Privacy Policy</h2>
            <p className="text-lg">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page, and we encourage you to review it periodically.
            </p>
          </section>
          
          <section>
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg">
              If you have any questions or concerns about our Privacy Policy, please contact us at [contact@fusionx.com](mailto:contact@fusionx.com).
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
