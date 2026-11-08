import React from 'react';
import { GalleryItem, GALLERY_DATA } from '../data/websiteData';

interface GalleryModalProps {
  item: GalleryItem | null;
  onClose: () => void;
  onSelect: (item: GalleryItem) => void;
}

export const GalleryModal: React.FC<GalleryModalProps> = ({
  item,
  onClose,
  onSelect,
}) => {
  if (!item) return null;

  const currentIndex = GALLERY_DATA.findIndex((g) => g.id === item.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prevIndex =
      (currentIndex - 1 + GALLERY_DATA.length) % GALLERY_DATA.length;
    onSelect(GALLERY_DATA[prevIndex]);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % GALLERY_DATA.length;
    onSelect(GALLERY_DATA[nextIndex]);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-4xl w-full max-h-[92vh] flex flex-col items-center bg-[#2A2338] text-white rounded-3xl overflow-hidden shadow-2xl border border-white/10"
      >
        {/* Top bar */}
        <div className="w-full flex items-center justify-between px-6 py-4 bg-black/40 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary-color)] text-xs">
              <i className="fa-solid fa-calendar-day"></i>
            </span>
            <span className="text-sm font-bold">اليوم العالمي للسكري - 14 نوفمبر</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        {/* Image frame */}
        <div className="relative flex-1 w-full max-h-[70vh] flex items-center justify-center p-4 overflow-hidden bg-black/30">
          <img
            src={item.img}
            alt={item.alt}
            className="max-h-[64vh] max-w-full object-contain rounded-2xl shadow-2xl"
          />

          {/* Navigation buttons */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white hover:bg-[var(--primary-color)] transition-all cursor-pointer shadow-lg"
            aria-label="الصورة السابقة"
          >
            <i className="fa-solid fa-chevron-right text-base"></i>
          </button>
          <button
            type="button"
            onClick={handleNext}
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white hover:bg-[var(--primary-color)] transition-all cursor-pointer shadow-lg"
            aria-label="الصورة التالية"
          >
            <i className="fa-solid fa-chevron-left text-base"></i>
          </button>
        </div>

        {/* Caption & description bar */}
        <div className="w-full p-5 bg-black/50 text-center border-t border-white/10">
          <h3
            className="text-lg font-bold text-white"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {item.title}
          </h3>
          {item.description && (
            <p className="mt-1 text-xs text-slate-300 max-w-lg mx-auto">
              {item.description}
            </p>
          )}
          <p className="mt-2 text-[0.7rem] text-slate-400">
            {currentIndex + 1} من {GALLERY_DATA.length}
          </p>
        </div>
      </div>
    </div>
  );
};
