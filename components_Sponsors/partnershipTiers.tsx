import React from 'react';

const partnershipTiers = [
  {
    name: 'Bronze',
    price: '$750',
    period: '/yr',
    description: 'Get your brand in front of Stevens engineers and build early awareness with a talented student audience.',
    features: [
      'Logo on website & mailing campaigns',
    ],
    highlighted: false,
  },
  {
    name: 'Silver',
    price: '$999',
    period: '/yr',
    description: 'Expand your reach and connect with students actively exploring internship and job opportunities.',
    features: [
      'Logo on website & mailing campaigns',
      'Feature in weekly mailing campaign',
      'Access to resume book',
    ],
    highlighted: false,
  },
  {
    name: 'Gold',
    price: '$1,999',
    period: '/yr',
    description: 'Engage directly with SHPE members through workshops and events, building real relationships with future engineers.',
    features: [
      'Logo on website & mailing campaigns',
      'Feature in weekly mailing campaign',
      'Access to resume book',
      'Host a private workshop or event',
    ],
    highlighted: false,
  },
  {
    name: 'Platinum',
    price: '$2,000+',
    period: '/yr',
    description: 'Maximum visibility and recruiting power. The premier tier for organizations committed to engaging our full community.',
    features: [
      'Logo on website & mailing campaigns',
      'Feature in weekly mailing campaign',
      'Access to resume book',
      'Host a private workshop or event',
      'Priority Lunch & Learn booking',
      'Featured social media content',
      'Priority branding on all materials',
    ],
    highlighted: true,
  },
];

const CheckIcon = ({ highlighted }: { highlighted: boolean }) => (
  <svg
    className={`w-4 h-4 shrink-0 mt-0.5 ${highlighted ? 'text-white' : 'text-(--color-crimson)'}`}
    fill="none" stroke="currentColor" viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
  </svg>
);

const PartnershipTiers = () => {
  return (
    <section className="py-5 -translate-y-14" style={{ backgroundColor: "var(--color-page-bg)" }}>
      <div className="max-w-6xl mx-auto px-5 text-center">
        <h2
          className="text-4xl font-extrabold mb-16"
          style={{ color: "var(--color-navy)", fontFamily: "var(--font-playfair)" }}
        >
          Partnership Opportunities
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
          {partnershipTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl p-7 flex flex-col text-left transition-all duration-300 hover:-translate-y-1 ${
                tier.highlighted
                  ? 'bg-(--color-crimson) text-white shadow-xl'
                  : 'bg-(--page-bg) border border-(--color-border) text-(--color-navy)'
              }`}
            >
              {/* Tier name */}
              <p className={`text-xs font-bold tracking-[0.2em] uppercase mb-4 ${tier.highlighted ? 'text-white/80' : 'text-(--color-crimson)'}`}>
                {tier.name}
              </p>

              {/* Price */}
              <div className="flex items-end gap-1 mb-4">
                <span className={`text-xs font-semibold mb-1 ${tier.highlighted ? 'text-white/70' : 'text-(--color-slate)'}`}>$</span>
                <span className={`text-4xl font-black leading-none tracking-tight ${tier.highlighted ? 'text-white' : 'text-(--color-navy)'}`}>
                  {tier.price.replace('$', '')}
                </span>
                <span className={`text-sm mb-0.5 ${tier.highlighted ? 'text-white/70' : 'text-(--color-slate)'}`}>{tier.period}</span>
              </div>

              {/* Divider */}
              <div className={`h-px w-full mb-4 ${tier.highlighted ? 'bg-white/20' : 'bg-(--color-border)'}`} />

              {/* Features */}
              <p className={`text-[10px] font-bold tracking-[0.15em] uppercase mb-3 ${tier.highlighted ? 'text-white/70' : 'text-(--color-slate)'}`}>
                What&apos;s included
              </p>
              <ul className="flex flex-col gap-2.5 flex-grow">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckIcon highlighted={tier.highlighted} />
                    <span className={`text-sm leading-snug ${tier.highlighted ? 'text-white/90' : 'text-(--color-slate)'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="mailto:shpe.sit@gmail.com"
                className={`mt-6 py-2 px-4 rounded-xl text-sm font-semibold text-center transition-all duration-200 ${
                  tier.highlighted
                    ? 'bg-white text-(--color-crimson) hover:bg-white/90'
                    : 'border border-(--color-crimson) text-(--color-crimson) hover:bg-(--color-crimson) hover:text-white'
                }`}
              >
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
