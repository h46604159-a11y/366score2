
import React from 'react';
import { FixtureResponse, Language } from '../types';
import { getLocalTime } from '../services/dateService';

interface FixtureCardProps {
    fixtureData: FixtureResponse;
    onSelectFixture: (id: number) => void;
    language: Language;
}

const FixtureCard: React.FC<FixtureCardProps> = ({ fixtureData, onSelectFixture, language }) => {
    const { fixture, teams, goals, league } = fixtureData;

    const renderStatus = () => {
        if (fixture.status.short === 'FT') {
            return (
                <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse text-3xl font-bold">
                    <span>{goals.home}</span>
                    <span className="text-gray-400">-</span>
                    <span>{goals.away}</span>
                </div>
            );
        }
        if (fixture.status.short === 'HT' || fixture.status.elapsed) {
             return (
                 <div className="text-center">
                    <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse text-3xl font-bold text-lime-400">
                        <span>{goals.home}</span>
                        <span className="text-gray-400">-</span>
                        <span>{goals.away}</span>
                    </div>
                    <div className="text-sm text-lime-400 animate-pulse">{fixture.status.elapsed}'</div>
                 </div>
             );
        }
        return <div className="text-xl font-bold">{getLocalTime(fixture.date, language)}</div>;
    };

    return (
        <div 
            className="bg-white/10 rounded-lg p-4 cursor-pointer transition-transform transform hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-400/20"
            onClick={() => onSelectFixture(fixture.id)}
        >
            <div className="text-center text-sm text-gray-400 mb-2 truncate">{league.round}</div>
            <div className="flex items-center justify-between">
                <div className="flex-1 flex flex-col items-center text-center gap-2">
                    <img src={teams.home.logo} alt={teams.home.name} className="w-12 h-12 object-contain" />
                    <span className="font-bold text-sm sm:text-base">{teams.home.name}</span>
                </div>
                <div className="w-28 text-center">
                    {renderStatus()}
                </div>
                <div className="flex-1 flex flex-col items-center text-center gap-2">
                    <img src={teams.away.logo} alt={teams.away.name} className="w-12 h-12 object-contain" />
                    <span className="font-bold text-sm sm:text-base">{teams.away.name}</span>
                </div>
            </div>
        </div>
    );
};

export default FixtureCard;