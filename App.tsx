
import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import FixturesList from './components/FixturesList';
import MatchDetails from './components/MatchDetails';
import { Language } from './types';
import { translations } from './constants';
import { getLocalDate, getFormattedDate } from './services/dateService';

type ActiveTab = 'yesterday' | 'today' | 'tomorrow';

const App: React.FC = () => {
    const [language, setLanguage] = useState<Language>('ar');
    const [activeTab, setActiveTab] = useState<ActiveTab>('today');
    const [selectedFixtureId, setSelectedFixtureId] = useState<number | null>(null);

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    }, [language]);

    const handleSelectFixture = (id: number) => {
        setSelectedFixtureId(id);
    };

    const handleBack = () => {
        setSelectedFixtureId(null);
    };

    const getDateForTab = useCallback((tab: ActiveTab): string => {
        const today = getLocalDate();
        switch (tab) {
            case 'yesterday':
                return getFormattedDate(new Date(today.setDate(today.getDate() - 1)));
            case 'tomorrow':
                return getFormattedDate(new Date(today.setDate(today.getDate() + 1)));
            case 'today':
            default:
                return getFormattedDate(getLocalDate());
        }
    }, []);

    return (
        <div className={`bg-[#0D1C1A] min-h-screen text-white font-sans ${language === 'ar' ? 'font-[Cairo]' : 'font-[Roboto]'}`}>
            <Header language={language} setLanguage={setLanguage} />
            <main className="container mx-auto p-4 max-w-4xl">
                {selectedFixtureId ? (
                    <MatchDetails fixtureId={selectedFixtureId} onBack={handleBack} language={language} />
                ) : (
                    <>
                        <div className="flex justify-center mb-6 bg-black/30 rounded-full p-1">
                            {(['yesterday', 'today', 'tomorrow'] as ActiveTab[]).map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`w-1/3 py-2 px-4 rounded-full text-sm sm:text-base font-bold transition-all duration-300 ${activeTab === tab ? 'bg-gradient-to-r from-lime-400 to-cyan-400 text-black shadow-lg' : 'text-gray-300 hover:bg-white/10'}`}
                                >
                                    {translations[language][tab]}
                                </button>
                            ))}
                        </div>
                        <FixturesList
                            date={getDateForTab(activeTab)}
                            onSelectFixture={handleSelectFixture}
                            language={language}
                        />
                    </>
                )}
            </main>
        </div>
    );
};

export default App;