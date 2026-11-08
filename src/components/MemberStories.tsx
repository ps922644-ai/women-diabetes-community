import React from 'react';
import { STORIES_DATA } from '../data/websiteData';

export const MemberStories: React.FC = () => {
  return (
    <section id="stories" className="section-pad bg-[var(--surface-color)] px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <p className="section-kicker justify-center">قصص العضوات</p>
          <h2
            className="mt-4 text-3xl font-bold leading-snug sm:text-4xl text-[#2A2338]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            تجارب نساء اخترن ألا يمضين الطريق وحدهن.
          </h2>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            كلمات من واقع التجربة اليومية لعضوات وجدن في مجتمعنا الأمان والمعرفة والمؤازرة.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {STORIES_DATA.map((story) => (
            <figure
              key={story.id}
              className="testimonial-card glass-panel flex flex-col justify-between"
            >
              <div>
                <i className="fa-solid fa-quote-right text-2xl text-[var(--accent-color)]"></i>
                <blockquote className="mt-5 text-base leading-8 text-[var(--text-color)] font-medium">
                  {story.quote}
                </blockquote>
              </div>
              <figcaption className="mt-6 border-t border-[var(--glass-border)] pt-4">
                <span className="block font-bold text-[var(--text-color)] text-base">
                  {story.name}
                </span>
                <span className="mt-1 block text-xs text-[var(--text-muted)]">
                  {story.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
