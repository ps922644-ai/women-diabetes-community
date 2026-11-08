import React from 'react';
import { GALLERY_DATA, GalleryItem } from '../data/websiteData';

interface WorldDiabetesDayProps {
  onOpenItem: (item: GalleryItem) => void;
}

export const WorldDiabetesDay: React.FC<WorldDiabetesDayProps> = ({
  onOpenItem,
}) => {
  return (
    <section id="gallery" className="section-pad px-5 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <p className="section-kicker justify-center">صممت خصيصاّ لكي</p>
          <h2
            className="mt-4 text-3xl font-bold leading-snug sm:text-4xl text-[#2A2338]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            اليوم العالمي للسكري
          </h2>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-[var(--sage-soft)] px-4 py-1 text-sm font-bold text-[var(--accent-color)]">
            <i className="fa-solid fa-calendar-day text-xs"></i>
            <span>14 نوفمبر</span>
          </div>
          <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
            بطاقات توعوية ورسائل إلهام وتقدير للمرأة في يوم التوعية بالسكري، تذكري دائماً أن صحتكِ تستحق كل العناية.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6">
          {GALLERY_DATA.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onOpenItem(item)}
              className="gallery-item group relative aspect-square overflow-hidden rounded-3xl border border-[var(--glass-border)] shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] cursor-pointer text-start bg-slate-50"
              aria-label={`عرض بطاقة: ${item.title}`}
            >
              <img
                alt={item.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                src={item.img}
              />

              {/* Gradient overlay & caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(42,35,56,0.85)] via-[rgba(42,35,56,0.2)] to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-white text-xs sm:text-sm font-bold block drop-shadow-sm">
                  {item.title}
                </span>
                <span className="mt-1 text-[0.68rem] text-slate-200 hidden sm:inline-flex items-center gap-1">
                  <span>تكبير الصورة</span>
                  <i className="fa-solid fa-arrow-up-right-from-square text-[0.6rem]"></i>
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
