import React from 'react';

const ALL_BENEFITS = [
  'Name/Logo on Socials and Website',
  'Host General Company Info Session for SHPE @ SIT Members',
  'Featured Acknowledgement at Membership Meetings',
  'Access to our Mock Interview and Resume Building Events',
  'Host Event Workshop/Tech Talk',
  'Company Excerpt/Event on Socials and Website',
];

const partnershipTiers = [
  {
    name: 'Bronze',
    price: '$800',
    period: '/yr',
    description: 'Get your brand in front of Stevens engineers and build early awareness with a talented student audience.',
    included: [true, false, false, false, false, false],
    highlighted: false,
  },
  {
    name: 'Silver',
    price: '$1,600',
    period: '/yr',
    description: 'Expand your reach and connect with students actively exploring internship and job opportunities.',
    included: [true, true, true, false, false, false],
    highlighted: false,
  },
  {
    name: 'Gold',
    price: '$2,500',
    period: '/yr',
    description: 'Engage directly with SHPE members through workshops and events, building real relationships with future engineers.',
    included: [true, true, true, true, false, false],
    highlighted: false,
  },
  {
    name: 'Platinum',
    price: '$4,000',
    period: '/yr',
    description: 'Maximum visibility and recruiting power. The premier tier for organizations committed to engaging our full community.',
    included: [true, true, true, true, true, true],
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

const XIcon = ({ highlighted }: { highlighted: boolean }) => (
  <svg
    className={`w-4 h-4 shrink-0 mt-0.5 ${highlighted ? 'text-white/40' : 'text-(--color-slate)/40'}`}
    fill="none" stroke="currentColor" viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const PartnershipTiers = () => {
  return (
    <section className="py-5 md:-translate-y-14" style={{ backgroundColor: "var(--color-page-bg)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-5 text-center">
        <h2
          className="text-3xl md:text-4xl font-extrabold mb-10 md:mb-16"
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
                {ALL_BENEFITS.map((benefit, i) => (
                  <li key={benefit} className="flex items-start gap-2">
                    {tier.included[i]
                      ? <CheckIcon highlighted={tier.highlighted} />
                      : <XIcon highlighted={tier.highlighted} />
                    }
                    <span className={`text-sm leading-snug ${
                      tier.included[i]
                        ? tier.highlighted ? 'text-white/90' : 'text-(--color-slate)'
                        : tier.highlighted ? 'text-white/40' : 'text-(--color-slate)/40'
                    }`}>
                      {benefit}
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
