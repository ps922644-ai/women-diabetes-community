import React, { useState } from 'react';
import { FAQ_DATA } from '../data/websiteData';

export const FaqSection: React.FC = () => {
  // Store expanded item IDs
  const [openIds, setOpenIds] = useState<string[]>([FAQ_DATA[0].id]);
  const [allowMultiple, setAllowMultiple] = useState<boolean>(true);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      if (openIds.includes(id)) {
        setOpenIds(openIds.filter((item) => item !== id));
      } else {
        setOpenIds([...openIds, id]);
      }
    } else {
      setOpenIds(openIds.includes(id) ? [] : [id]);
    }
  };

  const expandAll = () => {
    setOpenIds(FAQ_DATA.map((f) => f.id));
  };

  const collapseAll = () => {
    setOpenIds([]);
  };

  return (
    <section id="faq" className="section-pad bg-[var(--surface-color)] px-5 sm:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center max-w-2xl mx-auto">
          <p className="section-kicker justify-center">الأسئلة الشائعة</p>
          <h2
            className="mt-4 text-3xl font-bold leading-snug sm:text-4xl text-[#2A2338]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            لماذا نحن هنا ؟
          </h2>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            إجابات واضحة وشفافة حول رسالة المجتمع، خصوصية بياناتكِ، وكيفية الاستفادة من برامجنا.
          </p>

          {/* Quick controls */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs">
            <button
              type="button"
              onClick={expandAll}
              className="text-[var(--primary-color)] hover:underline font-semibold cursor-pointer"
            >
              فتح جميع الأسئلة
            </button>
            <span className="text-[var(--text-muted)]">·</span>
            <button
              type="button"
              onClick={collapseAll}
              className="text-[var(--text-muted)] hover:text-[#2A2338] hover:underline font-semibold cursor-pointer"
            >
              إغلاق الكل
            </button>
            <span className="text-[var(--text-muted)]">·</span>
            <label className="inline-flex items-center gap-1.5 cursor-pointer text-[var(--text-muted)]">
              <input
                type="checkbox"
                checked={allowMultiple}
                onChange={(e) => setAllowMultiple(e.target.checked)}
                className="rounded accent-[var(--primary-color)]"
              />
              <span>السماح بفتح أكثر من سؤال معاً</span>
            </label>
          </div>
        </div>

        <div className="mt-10 space-y-4">
          {FAQ_DATA.map((item) => {
            const isOpen = openIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`faq-item rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-[var(--accent-color)] bg-white shadow-md'
                    : 'border-[var(--glass-border)] bg-[rgba(250,249,252,0.8)] hover:border-[rgba(109,90,156,0.4)]'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-4 p-5 text-start font-bold text-base sm:text-lg text-[var(--text-color)] cursor-pointer focus:outline-none"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs transition-colors ${
                        isOpen
                          ? 'bg-[var(--primary-color)] text-white'
                          : 'bg-[var(--sage-soft)] text-[var(--accent-color)]'
                      }`}
                    >
                      <i className="fa-solid fa-question"></i>
                    </span>
                    <span>{item.question}</span>
                  </span>
                  <span
                    className={`faq-chevron transform transition-transform duration-300 text-[var(--accent-color)] ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  >
                    <i className="fa-solid fa-chevron-down"></i>
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-sm leading-8 text-[var(--text-muted)] border-t border-[rgba(109,90,156,0.12)] mt-1 animate-fadeIn">
                    <p className="p-3 rounded-xl bg-[#FAF9FC] border border-[rgba(109,90,156,0.1)]">
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
