import React from 'react';

const partnershipTiers = [
  {
    name: 'Bronze',
    price: '$0 - $750',
    features: [
      'Company Logo on our website & mailing campaigns',
    ],
    bgColor: 'bg-white',
    textColor: 'text-gray-900',
    buttonColor: 'bg-gray-200',
    buttonTextColor: 'text-gray-900',
  },
  {
    name: 'Silver',
    price: '$750 - $999',
    features: [
      'Company Logo on our website & mailing campaigns',
      'Feature content on our weekly mailing campaign',
      'Access to resume book',
    ],
    bgColor: 'bg-white',
    textColor: 'text-gray-900',
    buttonColor: 'bg-gray-200',
    buttonTextColor: 'text-gray-900',
  },
  {
    name: 'Gold',
    price: '$1000 - $1999',
    features: [
      'Company Logo on our website & mailing campaigns',
      'Feature content on our weekly mailing campaign',
      'Access to resume book',
      'Host private workshop/event for SHPE SIT members',
    ],
    bgColor: 'bg-white',
    textColor: 'text-gray-900',
    buttonColor: 'bg-gray-200',
    buttonTextColor: 'text-gray-900',
  },
  {
    name: 'Platinum',
    price: '$2000+',
    features: [
      'Company Logo on our website & mailing campaigns',
      'Feature content on our weekly mailing campaign',
      'Access to resume book',
      'Host private workshop/event for SHPE SIT members',
      'Priority booking for Lunch & Learn events',
      'Feature company excerpt/event on our social media',
    ],
    bgColor: 'bg-blue-600',
    textColor: 'text-white',
    buttonColor: 'bg-white',
    buttonTextColor: 'text-blue-600',
  },
];

const PartnershipTiers = () => {
  return (
    <section className="py-8" style={{ backgroundColor: "var(--color-page-bg)" }}>
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 
          className="text-4xl font-extrabold mb-4"
          style={{ color: "var(--color-navy)", fontFamily: "var(--font-playfair)" }}
        >
          Partnership Opportunities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {partnershipTiers.map((tier) => (
            <div key={tier.name} className={`p-8 rounded-lg shadow-lg ${tier.bgColor} ${tier.textColor} flex flex-col`}>
              <h3 className="text-2xl font-bold mb-4">{tier.name}</h3>
              <p className="text-4xl font-extrabold mb-6">{tier.price}</p>
              <div className="text-left mb-6 flex-grow">
                <h4 className="font-bold mb-2">What's included?</h4>
                <ul className="space-y-2">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href="mailto:shpe.sit@gmail.com" className={`mt-auto py-2 px-4 rounded-lg font-bold ${tier.buttonColor} ${tier.buttonTextColor}`}>
                Contact Us
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipTiers;
