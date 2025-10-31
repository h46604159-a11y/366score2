
import React from 'react';
import { Language } from '../types';
import { translations } from '../constants';

interface HeaderProps {
    language: Language;
    setLanguage: (lang: Language) => void;
}

const Header: React.FC<HeaderProps> = ({ language, setLanguage }) => {
    const toggleLanguage = () => {
        setLanguage(language === 'en' ? 'ar' : 'en');
    };

    return (
        <header className="bg-black/20 shadow-md sticky top-0 z-20 backdrop-blur-sm">
            <div className="container mx-auto p-4 flex justify-between items-center max-w-4xl">
                <h1 className="text-xl sm:text-2xl font-bold text-white">
                    {translations[language].title}
                </h1>
                <button
                    onClick={toggleLanguage}
                    className="bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300"
                >
                    {language === 'en' ? 'العربية' : 'English'}
                </button>
            </div>
        </header>
    );
};

export default Header;