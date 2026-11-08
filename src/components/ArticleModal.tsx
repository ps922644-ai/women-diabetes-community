import React from 'react';
import { ArticleItem } from '../data/websiteData';

interface ArticleModalProps {
  article: ArticleItem | null;
  onClose: () => void;
  onJoinClick: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onJoinClick,
}) => {
  if (!article) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] bg-[#FAF9FC] text-[#2A2338] shadow-2xl border border-[var(--glass-border)] animate-fadeIn">
        {/* Header bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[var(--glass-border)] bg-[#FAF9FC]/90 backdrop-blur-md px-6 py-4">
          <span className="rounded-full bg-[var(--sage-soft)] px-3 py-1 text-xs font-bold text-[var(--sage-dark)]">
            {article.category}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface-color)] text-[#2A2338] hover:bg-slate-200 transition-colors cursor-pointer"
            aria-label="إغلاق المقال"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 sm:p-10">
          <h1
            className="text-2xl sm:text-3xl font-bold leading-snug text-[#2A2338]"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {article.title}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[var(--text-muted)] border-b border-[var(--glass-border)] pb-4">
            <span className="inline-flex items-center gap-1.5">
              <i className="fa-solid fa-user-pen text-[var(--accent-color)]"></i>
              <span>{article.authorInfo}</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <i className="fa-solid fa-clock text-[var(--accent-color)]"></i>
              <span>وقت القراءة: {article.readTime}</span>
            </span>
          </div>

          {/* Article Image in Arch Frame */}
          <div className="my-6 overflow-hidden rounded-3xl aspect-video border border-[var(--glass-border)] shadow-md">
            <img
              src={article.img}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Article HTML Prose */}
          <div
            className="prose text-[#2A2338] text-sm sm:text-base leading-8 space-y-4"
            dangerouslySetInnerHTML={{ __html: article.contentHtml }}
          />

          {/* Join Callout at bottom */}
          <div className="mt-10 rounded-3xl bg-[var(--surface-color)] p-6 sm:p-8 text-center border border-[var(--glass-border)]">
            <h3
              className="text-xl font-bold text-[#2A2338]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              هل أفادكِ هذا المقال؟
            </h3>
            <p className="mt-2 text-sm text-[var(--text-muted)]">
              انضمي إلى مجتمعنا لتحصلي على دعم مستمر ومتابعة أسبوعية من أخواتكِ والمختصات.
            </p>
            <button
              type="button"
              onClick={() => {
                onClose();
                onJoinClick();
              }}
              className="btn mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--button-color)] px-8 font-bold text-[var(--text-color)] shadow-[var(--shadow-button)] hover:bg-[var(--primary-hover)] hover:text-white transition-all cursor-pointer"
            >
              انضمي إلينا الآن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
