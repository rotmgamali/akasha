import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Starfield from './components/Starfield';
import PortalView from './components/PortalView';
import HolocronView from './components/HolocronView';
import OracleView from './components/OracleView';
import DailyView from './components/DailyView';
import SavedView from './components/SavedView';
import TimelineView from './components/TimelineView';
import ArticleView from './components/ArticleView';
import CivilizationsView from './components/CivilizationsView';
import CivilizationDetail from './components/CivilizationDetail';
import TopicView from './components/TopicView';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('portal'); // portal, holocron, oracle, daily, saved, timeline, civilizations, civilization-detail
  const [readingExcerpt, setReadingExcerpt] = useState(null); // The excerpt currently being read
  const [selectedCivilization, setSelectedCivilization] = useState(null); // The selected civilization for deep dive
  const [savedExcerpts, setSavedExcerpts] = useState(() => {
    const saved = localStorage.getItem('akasha_saved');
    return saved ? JSON.parse(saved) : [];
  });

  // Save to local storage whenever savedExcerpts changes
  useEffect(() => {
    localStorage.setItem('akasha_saved', JSON.stringify(savedExcerpts));
  }, [savedExcerpts]);

  const toggleSave = (excerpt) => {
    setSavedExcerpts(prev => {
      const isSaved = prev.some(e => e.content === excerpt.content);
      if (isSaved) {
        return prev.filter(e => e.content !== excerpt.content);
      } else {
        return [...prev, excerpt];
      }
    });
  };

  const handleOpenArticle = (excerpt) => {
    setReadingExcerpt(excerpt);
  };

  const handleCloseArticle = () => {
    setReadingExcerpt(null);
  };

  const handleSelectCivilization = (civ) => {
    setSelectedCivilization(civ);
    setCurrentView('civilization-detail');
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <Starfield />

      <AnimatePresence mode="wait">
        {currentView === 'portal' && (
          <PortalView key="portal" onEnter={() => setCurrentView('holocron')} />
        )}

        {currentView === 'holocron' && (
          <HolocronView
            key="holocron"
            onNavigate={(view) => setCurrentView(view)}
            onToggleSave={toggleSave}
            savedExcerpts={savedExcerpts} // Pass savedExcerpts prop
            onOpenArticle={handleOpenArticle}
          />
        )}

        {currentView === 'oracle' && (
          <OracleView key="oracle" onBack={() => setCurrentView('holocron')} />
        )}

        {currentView === 'daily' && (
          <DailyView key="daily" onBack={() => setCurrentView('holocron')} onToggleSave={toggleSave} savedExcerpts={savedExcerpts} />
        )}

        {currentView === 'saved' && (
          <SavedView key="saved" onBack={() => setCurrentView('holocron')} savedExcerpts={savedExcerpts} onToggleSave={toggleSave} onOpenArticle={handleOpenArticle} />
        )}

        {currentView === 'timeline' && (
          <TimelineView key="timeline" onBack={() => setCurrentView('holocron')} onOpenArticle={handleOpenArticle} />
        )}

        {currentView === 'civilizations' && (
          <CivilizationsView
            key="civilizations"
            onBack={() => setCurrentView('holocron')}
            onSelectCivilization={handleSelectCivilization}
          />
        )}

        {currentView === 'civilization-detail' && selectedCivilization && (
          <CivilizationDetail
            key="civilization-detail"
            civilization={selectedCivilization}
            onBack={() => setCurrentView('civilizations')}
            onOpenArticle={handleOpenArticle}
          />
        )}

        {currentView === 'topics' && (
          <TopicView
            key="topics"
            onBack={() => setCurrentView('holocron')}
            onOpenArticle={handleOpenArticle}
          />
        )}
      </AnimatePresence>

      {/* Global Article Overlay */}
      <AnimatePresence>
        {readingExcerpt && (
          <ArticleView
            excerpt={readingExcerpt}
            onClose={handleCloseArticle}
            onToggleSave={toggleSave}
            isSaved={savedExcerpts.some(e => e.content === readingExcerpt.content)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
