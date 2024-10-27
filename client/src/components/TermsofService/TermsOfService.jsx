import React from 'react';

const TermsOfService = () => {
  return (
    <>
      {/* Terms and Conditions Section */}
      <div className="w-full py-10 px-4 sm:px-6 lg:px-8 bg-black text-white min-h-[78vh] flex items-center justify-center">
        <div className="text-center p-4 sm:p-6 lg:p-8 max-w-full sm:max-w-4xl lg:max-w-6xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">Terms and Conditions</h1>
        </div>
      </div>
      
      <div className="relative" style={{ left: '-10%' }}>

        {/* About Section */}
        <section className="py-10 px-4 sm:px-6  lg:px-8">
          <div className="flex justify-center">
            <div className="w-full max-w-full sm:max-w-4xl lg:max-w-6xl">
              <div className="relative" style={{ left: '-1%' }}>
                <h3 className="text-3xl ml-[27%] max-w-3xl mx-auto sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6 relative">About</h3>
              </div>
              <p className="ml-[27%] text-lg font-serif max-w-3xl mx-auto">
                These terms and conditions outline the rules and regulations for the use of FusionX's Website, located at <a href="https://www.fusionxfoods.com" target="_blank" rel="noopener noreferrer" className="text-red-500">https://www.fusionxfoods.com</a>.
                <br /><br />
                By accessing this website, we assume you accept these terms and conditions. Do not continue to use FusionX if you do not agree to all of the terms and conditions stated on this page.
                <br /><br />
                The following terminology applies to these Terms and Conditions, Privacy Statement, and Disclaimer Notice and all Agreements: "Client", "You", and "Your" refers to you, the person logging on this website and compliant with the Company's terms and conditions. "The Company", "Ourselves", "We", "Our", and "Us" refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of the Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization, and/or he/she or they, are taken as interchangeable and therefore as referring to the same.
              </p>
            </div>
          </div>
        </section>

        {/* Cookies Section */}
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="w-full max-w-full sm:max-w-4xl lg:max-w-6xl">
              <div className="relative" style={{ left: '-1%' }}>
                <h3 className="text-3xl ml-[27%] max-w-3xl mx-auto sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6 relative">Cookies</h3>
              </div>
              <p className="ml-[27%] max-w-3xl mx-auto text-lg font-serif">
                We employ the use of cookies. By accessing FusionX, you agreed to use cookies in agreement with the FusionX's Privacy Policy.
                <br /><br />
                Most interactive websites use cookies to retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas and to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.
              </p>
            </div>
          </div>
        </section>

        {/* License Section */}
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="w-full max-w-full sm:max-w-4xl lg:max-w-6xl">
              <div className="relative" style={{ left: '-1%' }}>
                <h3 className="text-3xl ml-[27%] max-w-3xl mx-auto sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6 relative">License</h3>
              </div>
              <p className="ml-[27%] text-lg font-serif max-w-3xl mx-auto">
                Unless otherwise stated, FusionX and/or its licensors own the intellectual property rights for all material on FusionX. All intellectual property rights are reserved. You may access this from FusionX for your own personal use subjected to restrictions set in these terms and conditions.
                <br /><br />
                You must not:
                <ul className="list-disc ml-6 mt-2">
                  <li>Republish material from FusionX</li>
                  <li>Sell, rent, or sub-license material from FusionX</li>
                  <li>Reproduce, duplicate, or copy material from FusionX</li>
                  <li>Redistribute content from FusionX</li>
                </ul>
              </p>
            </div>
          </div>
        </section>

        {/* Hyperlinking to our Content Section */}
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="w-full max-w-full sm:max-w-4xl lg:max-w-6xl">
              <div className="relative" style={{ left: '-1%' }}>
                <h3 className="text-3xl ml-[27%] max-w-3xl mx-auto sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6 relative">Hyperlinking to our Content</h3>
              </div>
              <p className="ml-[27%] text-lg max-w-3xl mx-auto">
                The following organizations may link to our Website without prior written approval:
                <ul className="list-disc ml-6 mt-2">
                  <li>Government agencies</li>
                  <li>Search engines</li>
                  <li>News organizations</li>
                  <li>Online directory distributors may link to our Website in the same manner as they hyperlink to the Websites of other listed businesses</li>
                  <li>System-wide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Website.</li>
                </ul>
              </p>
            </div>
          </div>
        </section>

        {/* iFrames Section */}
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="w-full max-w-full sm:max-w-4xl lg:max-w-6xl">
              <div className="relative" style={{ left: '-1%' }}>
                <h3 className="text-3xl ml-[27%] max-w-3xl mx-auto sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6 relative">iFrames</h3>
              </div>
              <p className="ml-[27%] text-lg max-w-3xl mx-auto">
                Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.
              </p>
            </div>
          </div>
        </section>

        {/* Content Liability Section */}
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="w-full max-w-full sm:max-w-4xl lg:max-w-6xl">
              <div className="relative" style={{ left: '-1%' }}>
                <h3 className="text-3xl ml-[27%] max-w-3xl mx-auto sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6 relative">Content Liability</h3>
              </div>
              <p className="ml-[27%] text-lg max-w-3xl mx-auto">
                We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims arising from content on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene, or criminal, or which infringes or otherwise violates any third party rights.
              </p>
            </div>
          </div>
        </section>

        {/* Reservation of Rights Section */}
        <section className="py-10 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="w-full max-w-full sm:max-w-4xl lg:max-w-6xl">
              <div className="relative" style={{ left: '-1%' }}>
                <h3 className="text-3xl ml-[27%] max-w-3xl mx-auto sm:text-4xl md:text-5xl lg:text-5xl font-bold mb-6 relative">Reservation of Rights</h3>
              </div>
              <p className="ml-[27%] text-lg max-w-3xl mx-auto">
                We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default TermsOfService;
