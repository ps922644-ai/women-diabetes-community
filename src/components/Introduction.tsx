import React from 'react';
import { MISSION_DATA } from '../data/websiteData';

interface IntroductionProps {
  onSelectTopic?: (topicTitle: string) => void;
}

export const Introduction: React.FC<IntroductionProps> = ({ onSelectTopic }) => {
  return (
    <section id="mission" className="section-pad px-5 sm:px-8 bg-white/40">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        {/* Visual Frame */}
        <div className="relative mx-auto flex w-full max-w-[460px] justify-center">
          <div className="arch-frame h-[520px] w-full max-w-[440px] rounded-[999px_999px_2.1rem_2.1rem] shadow-xl">
            <img
              alt="معًا نصنع رحلة صحية أكثر هدوءًا وثقة"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              src={MISSION_DATA.image}
              loading="lazy"
            />
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="section-kicker">{MISSION_DATA.kicker}</p>
          <h2
            className="mt-4 max-w-2xl text-3xl font-bold leading-snug sm:text-4xl text-[#2A2338]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {MISSION_DATA.heading}
          </h2>

          <div className="mt-6 max-w-2xl text-base leading-9 text-[var(--text-muted)] space-y-4">
            <p className="font-semibold text-[#4E3D73] text-lg">
              {MISSION_DATA.subheading}
            </p>
            <p>{MISSION_DATA.description}</p>
          </div>

          {/* Original Quiet Details 01 and 02 */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {MISSION_DATA.quietDetails.map((detail, idx) => (
              <div key={idx} className="quiet-detail">
                <span>{detail.num}</span>
                <h4 className="font-bold text-[#2A2338] mb-1">{detail.title}</h4>
                <p>{detail.text}</p>
              </div>
            ))}
          </div>

          {/* Three Key Topics requested */}
          <div className="mt-8 pt-6 border-t border-[rgba(109,90,156,0.18)]">
            <p className="text-xs font-bold text-[var(--sage-dark)] mb-4">
              محاورنا الأساسية لدعمكِ:
            </p>
            <div className="grid gap-3 sm:grid-cols-3">
              {MISSION_DATA.topics.map((topic, i) => (
                <div
                  key={i}
                  onClick={() => onSelectTopic && onSelectTopic(topic.title)}
                  className="rounded-2xl border border-[var(--glass-border)] bg-[rgba(250,249,252,0.9)] p-4 shadow-sm hover:border-[var(--accent-color)] hover:shadow-md transition-all cursor-pointer group"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--sage-soft)] text-[var(--accent-color)] group-hover:bg-[var(--primary-color)] group-hover:text-white transition-colors">
                    <i className={`fa-solid ${topic.icon}`}></i>
                  </span>
                  <h4 className="mt-3 font-bold text-sm text-[#2A2338]">
                    {topic.title}
                  </h4>
                  <p className="mt-1 text-xs leading-6 text-[var(--text-muted)]">
                    {topic.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
