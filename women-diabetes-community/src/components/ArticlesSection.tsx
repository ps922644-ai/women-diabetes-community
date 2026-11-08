import React, { useState } from 'react';
import { ARTICLES_DATA, ArticleItem } from '../data/websiteData';

interface ArticlesSectionProps {
  onOpenArticle: (article: ArticleItem) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  onOpenArticle,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');

  const categories = ['الكل', 'التغذية', 'الهرمونات', 'الحركة', 'العناية اليومية'];

  const filteredArticles = ARTICLES_DATA.filter((item) => {
    return selectedCategory === 'الكل' || item.category === selectedCategory;
  });

  return (
    <section id="articles" className="section-pad px-5 sm:px-8 bg-white/40">
      <div className="mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto">
          <p className="section-kicker justify-center">مكتبة التوعية</p>
          <h2
            className="mt-4 text-3xl font-bold leading-snug sm:text-4xl text-[#2A2338]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            المقالات والمصادر
          </h2>
          <p className="mt-3 text-base leading-8 text-[var(--text-muted)]">
            محتوى مبسّط مبني على مصادر موثوقة، يمنحكِ خطوة عملية واحدة قابلة للتطبيق بعد كل قراءة.
          </p>
        </div>

        {/* Filter Badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-5 py-2 text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[var(--primary-color)] text-white shadow-md'
                  : 'bg-[var(--surface-color)] text-[var(--text-muted)] hover:bg-[var(--button-color)] hover:text-[#2A2338]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="program-card glass-panel flex flex-col justify-between overflow-hidden group"
            >
              <div>
                <div className="overflow-hidden rounded-2xl aspect-video relative">
                  <img
                    alt={article.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-108"
                    src={article.img}
                    loading="lazy"
                  />
                  <span className="absolute top-3 right-3 rounded-full bg-white/90 backdrop-blur-md px-3 py-1 text-[0.7rem] font-bold text-[var(--sage-dark)] shadow-sm">
                    {article.category}
                  </span>
                </div>

                <h3
                  className="mt-5 text-lg font-bold leading-snug text-[var(--text-color)] group-hover:text-[var(--primary-color)] transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {article.title}
                </h3>
                <p className="mt-3 text-xs leading-6 text-[var(--text-muted)] line-clamp-3">
                  {article.desc}
                </p>
              </div>

              <div className="mt-6 border-t border-[var(--glass-border)] pt-4 flex items-center justify-between">
                <span className="text-[0.7rem] text-[var(--text-muted)]">
                  {article.authorInfo}
                </span>
                <button
                  type="button"
                  onClick={() => onOpenArticle(article)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[var(--primary-color)] hover:text-[var(--accent-color)] cursor-pointer"
                >
                  <span>اقرئي المزيد</span>
                  <i className="fa-solid fa-arrow-left text-[0.65rem]"></i>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
