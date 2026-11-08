import React, { useState } from 'react';
import { HEALTH_QUESTIONS_DATA, QuestionCard } from '../data/websiteData';

interface ProgramsAndQuestionsProps {
  onJoinQuestion: (card: QuestionCard) => void;
}

export const ProgramsAndQuestions: React.FC<ProgramsAndQuestionsProps> = ({
  onJoinQuestion,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('الكل');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const categories = [
    'الكل',
    'الهرمونات',
    'سكري الحمل',
    'العناية اليومية',
    'الدعم النفسي',
    'صحة المرأة',
  ];

  const filteredCards = HEALTH_QUESTIONS_DATA.filter((card) => {
    const matchesCategory =
      activeCategory === 'الكل' || card.category === activeCategory;
    const matchesSearch =
      card.title.includes(searchTerm) || card.desc.includes(searchTerm);
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="programs" className="section-pad px-5 sm:px-8 bg-white/20">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-3xl mx-auto">
          <p className="section-kicker justify-center">
            كل ما تريدي تسالي عنه تجديه هنا
          </p>
          <h2
            className="mt-4 text-3xl font-bold leading-snug sm:text-4xl text-[#2A2338]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            أدوات عملية ترافقكِ يومًا بيوم.
          </h2>
          <p className="mt-2 text-xl font-medium text-[var(--accent-color)]">
            دعم خاص لكل مرحلة من حياتكِ
          </p>
          <p className="mt-4 text-base leading-8 text-[var(--text-muted)]">
            مجموعة من أهم الأسئلة الصحية واليومية التي تشغل بال المرأة المصابة بالسكري، مع إجابات داعمة وتوجيهات متخصصة تساعدكِ على اتخاذ خطوات واثقة.
          </p>
        </div>

        {/* Filter Pills & Search */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-[var(--primary-color)] text-white shadow-md'
                    : 'bg-[var(--surface-color)] text-[var(--text-muted)] hover:bg-[var(--button-color)] hover:text-[#2A2338]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px] max-w-xs w-full sm:w-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحثي في الأسئلة والبرامج..."
              className="w-full rounded-full border border-[var(--glass-border)] bg-[var(--field-bg)] py-2 pr-10 pl-4 text-xs text-[var(--text-color)] placeholder:text-[var(--text-muted)] focus:border-[var(--accent-color)] focus:outline-none"
            />
            <i className="fa-solid fa-magnifying-glass absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-[var(--accent-color)]"></i>
          </div>
        </div>

        {/* Question Cards Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCards.map((card) => (
            <article
              key={card.id}
              className="program-card glass-panel flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--sage-soft)] text-[var(--accent-color)]">
                    <i className={`fa-solid ${card.icon} text-2xl`}></i>
                  </span>
                  <span className="rounded-full bg-[rgba(109,90,156,0.1)] px-3 py-1 text-[0.7rem] font-bold text-[var(--sage-dark)]">
                    {card.category}
                  </span>
                </div>

                <h3
                  className="mt-6 text-xl font-bold text-[var(--text-color)] leading-snug"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {card.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-8 text-[var(--text-muted)]">
                  {card.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--glass-border)] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onJoinQuestion(card)}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full text-sm font-bold text-[var(--primary-color)] transition-colors hover:text-[var(--primary-hover)] cursor-pointer"
                >
                  <span>اطلبي الانضمام</span>
                  <i className="fa-solid fa-arrow-left text-xs transition-transform group-hover:-translate-x-1"></i>
                </button>
                <span className="text-[0.7rem] text-[var(--text-muted)]">
                  استشارة ودعم
                </span>
              </div>
            </article>
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="mt-12 text-center p-8 rounded-3xl bg-[var(--surface-color)]">
            <i className="fa-solid fa-circle-question text-3xl text-[var(--accent-color)] mb-3"></i>
            <p className="font-bold text-[#2A2338]">لم يتم العثور على نتائج مطابقة لـ "{searchTerm}"</p>
            <button
              onClick={() => {
                setActiveCategory('الكل');
                setSearchTerm('');
              }}
              className="mt-4 text-xs font-bold text-[var(--primary-color)] underline cursor-pointer"
            >
              إعادة تعيين البحث وعرض كافة الأسئلة
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
