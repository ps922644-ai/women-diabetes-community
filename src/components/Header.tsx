import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onJoinClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onJoinClick, onNavigate }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(sectionId);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 border-b ${
          isScrolled
            ? 'site-header border-[rgba(42,35,56,0.12)] shadow-sm'
            : 'bg-[rgba(250,249,252,0.85)] backdrop-blur-md border-[rgba(42,35,56,0.08)]'
        }`}
      >
        <nav
          className="mx-auto flex max-w-[calc(80rem+4rem)] items-center justify-between gap-4 px-5 py-3 sm:px-8"
          aria-label="التنقل الرئيسي"
        >
          {/* Official National Diabetes and Endocrine Centre Logo */}
          <button
            onClick={() => handleNavClick('top')}
            className="flex items-center gap-3 text-start text-[var(--accent-color)] transition-opacity duration-300 hover:opacity-85 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)]"
            aria-label="المركز الوطني لعلاج أمراض السكري والغدد الصماء - صحة المرأة والسكري"
          >
            <img
              src="/assets/aistudio/800_6aef1d42cdb94_ceb47c6d.jpg"
              alt="شعار المركز الوطني لعلاج أمراض السكري والغدد الصماء"
              className="h-11 w-11 sm:h-12 sm:w-12 shrink-0 object-contain rounded-full bg-white p-0.5 shadow-sm border border-[var(--glass-border)]"
            />
            <span className="flex min-w-0 flex-col leading-tight">
              <span
                className="text-base font-bold sm:text-lg text-[#2A2338]"
                style={{ fontFamily: 'var(--font-logo)' }}
              >
                صحة المرأة والسكري
              </span>
              <span className="text-[0.66rem] font-semibold text-[var(--logo-subtitle-color)]">
                المركز الوطني لعلاج أمراض السكري والغدد الصماء
              </span>
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-5 text-sm font-semibold lg:flex xl:gap-7 text-[#2A2338]">
            <button
              onClick={() => handleNavClick('top')}
              className="transition-colors hover:text-[var(--primary-color)] cursor-pointer"
            >
              الرئيسية
            </button>
            <button
              onClick={() => handleNavClick('mission')}
              className="transition-colors hover:text-[var(--primary-color)] cursor-pointer"
            >
              عن المجتمع
            </button>
            <button
              onClick={() => handleNavClick('programs')}
              className="transition-colors hover:text-[var(--primary-color)] cursor-pointer"
            >
              برامجنا
            </button>
            <button
              onClick={() => handleNavClick('articles')}
              className="transition-colors hover:text-[var(--primary-color)] cursor-pointer"
            >
              المقالات
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="transition-colors hover:text-[var(--primary-color)] cursor-pointer"
            >
              الأسئلة الشائعة
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="transition-colors hover:text-[var(--primary-color)] cursor-pointer"
            >
              تواصلي معنا
            </button>
            <button
              onClick={onJoinClick}
              className="btn h-10 min-h-10 rounded-full border-0 bg-[var(--button-color)] px-6 font-bold text-[var(--text-color)] shadow-[var(--shadow-button)] transition-all duration-300 hover:bg-[var(--primary-hover)] hover:text-white cursor-pointer"
            >
              انضمي إلى المجتمع
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="inline-flex min-h-11 w-11 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--nav-bg)] text-[var(--text-color)] shadow-[var(--shadow-soft)] backdrop-blur-xl transition-all hover:bg-[var(--surface-color)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] lg:hidden cursor-pointer"
            aria-label="فتح القائمة"
          >
            <i className="fa-solid fa-bars text-lg"></i>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[80] flex min-h-dvh flex-col overflow-y-auto bg-[var(--background-color)] text-[var(--text-color)] lg:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div className="shrink-0 border-b border-[var(--border-color)] bg-[var(--background-color)] backdrop-blur-xl">
            <div className="mx-auto flex w-full max-w-[calc(80rem+4rem)] items-center justify-between gap-4 px-5 py-3 sm:px-8">
              <div className="flex min-w-0 items-center gap-3 text-[var(--accent-color)]">
                <img
                  src="/assets/aistudio/800_6aef1d42cdb94_ceb47c6d.jpg"
                  alt="شعار المركز الوطني لعلاج أمراض السكري والغدد الصماء"
                  className="h-10 w-10 shrink-0 object-contain rounded-full bg-white p-0.5 shadow-sm border border-[var(--glass-border)]"
                />
                <span className="flex flex-col leading-tight">
                  <span
                    className="text-base sm:text-lg font-bold text-[#2A2338]"
                    style={{ fontFamily: 'var(--font-logo)' }}
                  >
                    صحة المرأة والسكري
                  </span>
                  <span className="text-[0.62rem] font-semibold text-[var(--logo-subtitle-color)]">
                    المركز الوطني لعلاج أمراض السكري والغدد الصماء
                  </span>
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex min-h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--glass-border)] bg-[var(--surface-color)] text-[var(--text-color)] shadow-[var(--shadow-soft)] transition-all hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-color)] cursor-pointer"
                aria-label="إغلاق القائمة"
              >
                <i className="fa-solid fa-xmark text-lg"></i>
              </button>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center px-5 py-8 sm:max-w-xl sm:px-8 sm:py-12">
            <div className="rounded-[2rem] border border-[var(--glass-border)] bg-[var(--surface-color)] p-4 shadow-[var(--shadow-soft)] backdrop-blur-xl sm:p-6">
              <p className="mb-3 px-2 text-xs font-bold text-[var(--sage-dark)]">
                القائمة الرئيسية
              </p>
              <nav className="grid" aria-label="التنقل عبر الهاتف">
                <button
                  onClick={() => handleNavClick('top')}
                  className="flex min-h-14 items-center justify-between rounded-2xl border-b border-[var(--glass-border)] px-3 text-lg font-bold text-[var(--text-color)] transition-colors hover:text-[var(--primary-color)] text-start"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <span>الرئيسية</span>
                  <i className="fa-solid fa-house text-sm text-[var(--accent-color)]"></i>
                </button>
                <button
                  onClick={() => handleNavClick('mission')}
                  className="flex min-h-14 items-center justify-between rounded-2xl border-b border-[var(--glass-border)] px-3 text-lg font-bold text-[var(--text-color)] transition-colors hover:text-[var(--primary-color)] text-start"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <span>عن المجتمع</span>
                  <i className="fa-solid fa-circle-info text-sm text-[var(--accent-color)]"></i>
                </button>
                <button
                  onClick={() => handleNavClick('programs')}
                  className="flex min-h-14 items-center justify-between rounded-2xl border-b border-[var(--glass-border)] px-3 text-lg font-bold text-[var(--text-color)] transition-colors hover:text-[var(--primary-color)] text-start"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <span>برامجنا</span>
                  <i className="fa-solid fa-hand-holding-heart text-sm text-[var(--accent-color)]"></i>
                </button>
                <button
                  onClick={() => handleNavClick('articles')}
                  className="flex min-h-14 items-center justify-between rounded-2xl border-b border-[var(--glass-border)] px-3 text-lg font-bold text-[var(--text-color)] transition-colors hover:text-[var(--primary-color)] text-start"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <span>المقالات</span>
                  <i className="fa-solid fa-book-open text-sm text-[var(--accent-color)]"></i>
                </button>
                <button
                  onClick={() => handleNavClick('faq')}
                  className="flex min-h-14 items-center justify-between rounded-2xl border-b border-[var(--glass-border)] px-3 text-lg font-bold text-[var(--text-color)] transition-colors hover:text-[var(--primary-color)] text-start"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <span>الأسئلة الشائعة</span>
                  <i className="fa-solid fa-circle-question text-sm text-[var(--accent-color)]"></i>
                </button>
                <button
                  onClick={() => handleNavClick('contact')}
                  className="flex min-h-14 items-center justify-between rounded-2xl px-3 text-lg font-bold text-[var(--text-color)] transition-colors hover:text-[var(--primary-color)] text-start"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  <span>تواصلي معنا</span>
                  <i className="fa-solid fa-envelope text-sm text-[var(--accent-color)]"></i>
                </button>
              </nav>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onJoinClick();
                }}
                className="btn mt-4 min-h-12 w-full rounded-full border-0 bg-[var(--button-color)] font-bold text-[var(--text-color)] shadow-[var(--shadow-button)] transition-all hover:bg-[var(--primary-hover)] hover:text-white"
              >
                انضمي إلى المجتمع
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
