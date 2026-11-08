import React from 'react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onJoinClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onJoinClick }) => {
  return (
    <footer className="bg-[var(--footer-bg)] px-5 pb-10 pt-16 text-[var(--text-color)] sm:px-8 border-t border-[var(--glass-border)]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-12">
          {/* Brand info */}
          <div className="flex flex-col items-center text-center lg:items-start lg:text-start max-w-sm">
            <button
              onClick={() => onNavigate('top')}
              className="flex items-center gap-3 text-[var(--accent-color)] transition-opacity hover:opacity-85 text-start cursor-pointer"
            >
              <img
                src="/assets/aistudio/800_6aef1d42cdb94_ceb47c6d.jpg"
                alt="شعار المركز الوطني لعلاج أمراض السكري والغدد الصماء"
                className="h-12 w-12 shrink-0 object-contain rounded-full bg-white p-0.5 shadow-sm border border-[var(--glass-border)]"
              />
              <span className="flex flex-col leading-tight text-start">
                <span
                  className="text-lg font-bold text-[#2A2338]"
                  style={{ fontFamily: 'var(--font-logo)' }}
                >
                  صحة المرأة والسكري
                </span>
                <span className="text-xs font-semibold text-[var(--logo-subtitle-color)]">
                  المركز الوطني لعلاج أمراض السكري والغدد الصماء
                </span>
              </span>
            </button>

            <p className="mt-4 text-sm leading-8 text-[var(--text-muted)]">
              مجتمع داعم للنساء المصابات بالسكري: معلومات موثوقة، برامج دعم وتغذية، ونصائح عملية للعناية اليومية ونمط حياة صحي متوازن.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-around gap-10 sm:gap-16 text-start">
            <div>
              <p className="text-sm font-bold text-[var(--text-color)] mb-4">
                روابط سريعة
              </p>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                <li>
                  <button
                    onClick={() => onNavigate('top')}
                    className="hover:text-[var(--primary-color)] transition-colors cursor-pointer"
                  >
                    الرئيسية
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('mission')}
                    className="hover:text-[var(--primary-color)] transition-colors cursor-pointer"
                  >
                    عن المجتمع
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('programs')}
                    className="hover:text-[var(--primary-color)] transition-colors cursor-pointer"
                  >
                    برامجنا
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('articles')}
                    className="hover:text-[var(--primary-color)] transition-colors cursor-pointer"
                  >
                    المقالات والمصادر
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('faq')}
                    className="hover:text-[var(--primary-color)] transition-colors cursor-pointer"
                  >
                    الأسئلة الشائعة
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-bold text-[var(--text-color)] mb-4">
                تواصل ومشاركة
              </p>
              <ul className="space-y-3 text-sm text-[var(--text-muted)]">
                <li>
                  <button
                    onClick={() => onNavigate('gallery')}
                    className="hover:text-[var(--primary-color)] transition-colors cursor-pointer"
                  >
                    اليوم العالمي للسكري
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('stories')}
                    className="hover:text-[var(--primary-color)] transition-colors cursor-pointer"
                  >
                    قصص العضوات
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('benefits')}
                    className="hover:text-[var(--primary-color)] transition-colors cursor-pointer"
                  >
                    لماذا مجتمعنا
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="hover:text-[var(--primary-color)] transition-colors cursor-pointer"
                  >
                    تواصلي معنا
                  </button>
                </li>
              </ul>
            </div>

            {/* Join CTA in footer */}
            <div className="max-w-xs">
              <p className="text-sm font-bold text-[var(--text-color)]">
                انضمي إلينا
              </p>
              <p className="mt-3 text-xs leading-6 text-[var(--text-muted)]">
                ابدئي رحلتكِ مع مجتمع يفهمكِ ويشارككِ التجربة نفسها بكل محبة ودعم.
              </p>
              <button
                onClick={onJoinClick}
                className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--button-color)] px-6 text-xs font-bold text-[var(--text-color)] shadow-[var(--shadow-button)] transition-all hover:bg-[var(--primary-hover)] hover:text-white cursor-pointer"
              >
                انضمي إلى المجتمع
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-[var(--glass-border)] pt-8 text-xs text-[var(--text-muted)] sm:flex-row">
          <p className="text-center sm:text-start">
            &copy; 2026 صحة المرأة والسكري. جميع الحقوق محفوظة.
          </p>
          <p className="text-center sm:text-end text-[var(--accent-color)] font-medium">
            محتوى توعوي وداعم، ولا يُغني عن استشارة الطبيبة المختصة.
          </p>
        </div>
      </div>
    </footer>
  );
};
