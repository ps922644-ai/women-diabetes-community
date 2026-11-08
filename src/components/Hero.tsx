import React from 'react';
import { HERO_DATA } from '../data/websiteData';

interface HeroProps {
  onPrimaryCtaClick: () => void;
  onSecondaryCtaClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onPrimaryCtaClick,
  onSecondaryCtaClick,
}) => {
  return (
    <section
      id="top"
      className="hero-split relative isolate overflow-hidden px-5 pb-20 pt-32 sm:px-8 lg:pt-40"
    >
      <div className="orb orb-sage"></div>
      <div className="orb orb-terracotta"></div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="max-w-2xl">
          <p className="section-kicker">{HERO_DATA.kicker}</p>
          <h1
            className="mt-5 text-4xl font-bold leading-tight text-[var(--text-color)] sm:text-5xl lg:text-6xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {HERO_DATA.headline}
          </h1>

          <p className="mt-7 max-w-xl text-lg leading-9 text-[var(--text-muted)]">
            {HERO_DATA.introText}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={onPrimaryCtaClick}
              className="btn btn-lg min-h-12 rounded-full border-0 bg-[var(--button-color)] px-8 font-bold text-[var(--text-color)] shadow-[var(--shadow-button)] transition-all duration-300 hover:bg-[var(--primary-hover)] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] cursor-pointer"
            >
              {HERO_DATA.primaryCta}
            </button>
            <button
              onClick={onSecondaryCtaClick}
              className="btn btn-lg min-h-12 rounded-full border border-[var(--glass-border)] bg-[var(--glass-bg)] px-8 font-bold text-[var(--text-color)] shadow-[var(--shadow-soft)] backdrop-blur-xl transition-all duration-300 hover:border-[var(--accent-color)] hover:bg-[var(--surface-color)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] cursor-pointer"
            >
              {HERO_DATA.secondaryCta}
            </button>
          </div>

          {/* Stat Blocks */}
          <div className="mt-10 grid max-w-md grid-cols-3 gap-3 sm:gap-4">
            {HERO_DATA.stats.map((stat, idx) => (
              <div key={idx} className="stat-block">
                <strong>
                  {stat.title}
                  <br />
                  {stat.subtitle}
                </strong>
                <span>.</span>
              </div>
            ))}
          </div>
        </div>

        {/* Arch Image Frame */}
        <div className="relative mx-auto flex w-full max-w-[540px] justify-center justify-self-center lg:justify-self-end">
          <div className="arch-frame arch-frame-large w-full max-w-[540px] shadow-2xl">
            <img
              alt={HERO_DATA.heroImageAlt}
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              src={HERO_DATA.heroImage}
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
