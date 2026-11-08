import React from 'react';
import { BENEFITS_DATA } from '../data/websiteData';

export const WhyOurCommunity: React.FC = () => {
  return (
    <section id="benefits" className="section-pad px-5 sm:px-8">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="section-kicker">لماذا مجتمعنا</p>
          <h2
            className="mt-4 max-w-2xl text-3xl font-bold leading-snug sm:text-4xl text-[#2A2338]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            كل ما تحتاجينه لتشعري بالدعم والاطمئنان.
          </h2>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {BENEFITS_DATA.map((benefit) => (
              <div key={benefit.id} className="benefit-row">
                <div className="benefit-dot"></div>
                <div>
                  <h3 className="text-base font-bold text-[var(--text-color)]">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-muted)]">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="benefit-image-wrap shadow-xl">
          <img
            alt="كل ما تحتاجينه لتشعري بالدعم والاطمئنان"
            className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            src="https://files.cdn-files-a.com/uploads/12596871/800_6aef1d42cdb94.jpg"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
};
