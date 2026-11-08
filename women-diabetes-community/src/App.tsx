import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Introduction } from './components/Introduction';
import { ProgramsAndQuestions } from './components/ProgramsAndQuestions';
import { WhyOurCommunity } from './components/WhyOurCommunity';
import { MemberStories } from './components/MemberStories';
import { WorldDiabetesDay } from './components/WorldDiabetesDay';
import { FaqSection } from './components/FaqSection';
import { ArticlesSection } from './components/ArticlesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ArticleModal } from './components/ArticleModal';
import { GalleryModal } from './components/GalleryModal';
import { ArticleItem, GalleryItem, QuestionCard } from './data/websiteData';

export default function App() {
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<GalleryItem | null>(null);

  // Form prefill state when a user clicks "اطلبي الانضمام" on a specific question
  const [contactSubject, setContactSubject] = useState<string>('الانضمام إلى المجتمع');
  const [contactMessage, setContactMessage] = useState<string>('');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleJoinClick = () => {
    scrollToSection('contact');
  };

  const handleHeroSecondaryClick = () => {
    scrollToSection('articles');
  };

  const handleQuestionJoin = (card: QuestionCard) => {
    setContactSubject(card.category || 'استشارة ودعم');
    setContactMessage(`أرغب في الاستفسار عن: "${card.title}" والحصول على الدعم المناسب.`);
    scrollToSection('contact');
  };

  const handleTopicSelect = (topicTitle: string) => {
    setContactSubject('استفسار عن ' + topicTitle);
    scrollToSection('contact');
  };

  return (
    <div className="min-h-screen bg-[#FAF9FC] text-[#2A2338] selection:bg-[#C6B8DE] selection:text-[#2A2338] flex flex-col justify-between">
      {/* SECTION 1 - HEADER */}
      <Header onJoinClick={handleJoinClick} onNavigate={scrollToSection} />

      <main className="flex-grow">
        {/* SECTION 2 - HERO */}
        <Hero
          onPrimaryCtaClick={handleJoinClick}
          onSecondaryCtaClick={handleHeroSecondaryClick}
        />

        {/* SECTION 3 - INTRODUCTION (MISSION & TOPICS) */}
        <Introduction onSelectTopic={handleTopicSelect} />

        {/* SECTION 4 - PROGRAMS AND HEALTH QUESTIONS */}
        <ProgramsAndQuestions onJoinQuestion={handleQuestionJoin} />

        {/* SECTION 5 - WHY OUR COMMUNITY */}
        <WhyOurCommunity />

        {/* SECTION 6 - MEMBER STORIES (TESTIMONIALS) */}
        <MemberStories />

        {/* SECTION 7 - WORLD DIABETES DAY (GALLERY) */}
        <WorldDiabetesDay onOpenItem={(item) => setSelectedGalleryItem(item)} />

        {/* SECTION 8 - FAQ */}
        <FaqSection />

        {/* ARTICLES & RESOURCES LIBRARY */}
        <ArticlesSection onOpenArticle={(article) => setSelectedArticle(article)} />

        {/* SECTION 9 - CONTACT / JOIN */}
        <ContactSection
          initialSubject={contactSubject}
          initialMessage={contactMessage}
          onClearInitial={() => {
            setContactSubject('الانضمام إلى المجتمع');
            setContactMessage('');
          }}
        />
      </main>

      {/* SECTION 10 - FOOTER */}
      <Footer onNavigate={scrollToSection} onJoinClick={handleJoinClick} />

      {/* Interactive Modals */}
      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onJoinClick={handleJoinClick}
      />

      <GalleryModal
        item={selectedGalleryItem}
        onClose={() => setSelectedGalleryItem(null)}
        onSelect={(item) => setSelectedGalleryItem(item)}
      />

      {/* Floating Scroll to Top Button */}
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 z-30 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--primary-color)] text-white shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] cursor-pointer"
        aria-label="العودة إلى الأعلى"
      >
        <i className="fa-solid fa-arrow-up text-sm"></i>
      </button>
    </div>
  );
}
