
import React, { useState, useEffect } from 'react';
import { getLineups, getStatistics } from '../services/apiService';
import { Lineup, Statistic, Language } from '../types';
import Loader from './Loader';
import { translations } from '../constants';

interface MatchDetailsProps {
    fixtureId: number;
    onBack: () => void;
    language: Language;
}

const MatchDetails: React.FC<MatchDetailsProps> = ({ fixtureId, onBack, language }) => {
    const [lineups, setLineups] = useState<Lineup[] | null>(null);
    const [stats, setStats] = useState<Statistic[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeTab, setActiveTab] = useState<'lineups' | 'stats'>('lineups');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const [lineupsData, statsData] = await Promise.all([
                    getLineups(fixtureId),
                    getStatistics(fixtureId)
                ]);
                setLineups(lineupsData);
                setStats(statsData);
            } catch (err) {
                setError(translations[language].error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [fixtureId, language]);

    const renderLineups = () => {
        if (!lineups || lineups.length < 2) return <p className="text-center text-gray-400 mt-4">{translations[language].noLineups}</p>;
        
        const [home, away] = lineups;

        const PlayerList = ({ title, players, coachName }: { title: string, players: any[], coachName: string }) => (
            <div>
                <h4 className="text-lg font-bold text-lime-400 mb-2 border-b border-gray-600 pb-1">{title}</h4>
                <ul className="space-y-1 text-sm">
                    {players.map(({ player }) => (
                        <li key={player.id} className="flex items-center">
                            <span className="w-6 text-gray-400">{player.number}</span>
                            <span>{player.name}</span>
                            <span className="ms-auto text-gray-500">{player.pos}</span>
                        </li>
                    ))}
                </ul>
                <h4 className="text-lg font-bold text-lime-400 mt-4 mb-2 border-b border-gray-600 pb-1">{translations[language].coach}</h4>
                <p className="text-sm">{coachName}</p>
            </div>
        );

        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <img src={home.team.logo} alt={home.team.name} className="w-8 h-8"/>
                        <h3 className="text-xl font-bold">{home.team.name} ({home.formation})</h3>
                    </div>
                    <PlayerList title={translations[language].startingXI} players={home.startXI} coachName={home.coach.name} />
                    <div className="mt-6">
                        <PlayerList title={translations[language].substitutes} players={home.substitutes} coachName={home.coach.name} />
                    </div>
                </div>
                 <div>
                    <div className="flex items-center gap-3 mb-4">
                        <img src={away.team.logo} alt={away.team.name} className="w-8 h-8"/>
                        <h3 className="text-xl font-bold">{away.team.name} ({away.formation})</h3>
                    </div>
                    <PlayerList title={translations[language].startingXI} players={away.startXI} coachName={away.coach.name} />
                     <div className="mt-6">
                        <PlayerList title={translations[language].substitutes} players={away.substitutes} coachName={away.coach.name} />
                    </div>
                </div>
            </div>
        );
    };

    const renderStats = () => {
        if (!stats || stats.length < 2) return <p className="text-center text-gray-400 mt-4">{translations[language].noStats}</p>;

        const homeStats = stats[0].statistics;
        const awayStats = stats[1].statistics;

        const combinedStats: { type: string; home: string | number; away: string | number }[] = [];

        homeStats.forEach(homeStat => {
            const awayStat = awayStats.find(s => s.type === homeStat.type);
            combinedStats.push({
                type: homeStat.type,
                home: homeStat.value ?? 0,
                away: awayStat?.value ?? 0
            });
        });
        
        return (
            <div className="mt-4 space-y-3">
                <div className="flex justify-between items-center mb-4 font-bold text-lg px-2">
                    <div className="flex items-center gap-2"><img src={stats[0].team.logo} className="w-6 h-6"/><span>{stats[0].team.name}</span></div>
                    <div className="flex items-center gap-2"><span>{stats[1].team.name}</span><img src={stats[1].team.logo} className="w-6 h-6"/></div>
                </div>
                {combinedStats.map(({type, home, away}) => {
                    const homeVal = parseInt(String(home).replace('%', '')) || 0;
                    const awayVal = parseInt(String(away).replace('%', '')) || 0;
                    const total = homeVal + awayVal;
                    const homeWidth = total > 0 ? (homeVal / total) * 100 : 50;
                    const awayWidth = total > 0 ? (awayVal / total) * 100 : 50;

                    return (
                        <div key={type}>
                            <div className="flex justify-between items-center text-sm font-bold mb-1 px-1">
                                <span>{home}</span>
                                <span className="text-gray-300">{type}</span>
                                <span>{away}</span>
                            </div>
                            <div className="flex w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="bg-lime-400" style={{ width: `${homeWidth}%` }}></div>
                                <div className="bg-cyan-400" style={{ width: `${awayWidth}%` }}></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="bg-[#101F1C] p-4 sm:p-6 rounded-lg">
            <button onClick={onBack} className="mb-4 bg-white/10 hover:bg-white/20 text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
                &larr; {translations[language].back}
            </button>

            {loading ? (
                <Loader message={translations[language].loading} />
            ) : error ? (
                <p className="text-center text-red-400 mt-4">{error}</p>
            ) : (
                <>
                    <div className="flex border-b border-gray-700">
                         <button
                            onClick={() => setActiveTab('lineups')}
                            className={`py-2 px-4 font-bold text-lg relative transition-colors ${activeTab === 'lineups' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
                        >
                            <span>{translations[language].lineups}</span>
                            {activeTab === 'lineups' && (
                                <div className="absolute bottom-[-1px] left-0 right-0 h-1 bg-gradient-to-r from-lime-400 to-cyan-400" />
                            )}
                        </button>
                        <button
                             onClick={() => setActiveTab('stats')}
                             className={`py-2 px-4 font-bold text-lg relative transition-colors ${activeTab === 'stats' ? 'text-white' : 'text-gray-400 hover:text-gray-200'}`}
                        >
                            <span>{translations[language].stats}</span>
                             {activeTab === 'stats' && (
                                <div className="absolute bottom-[-1px] left-0 right-0 h-1 bg-gradient-to-r from-lime-400 to-cyan-400" />
                            )}
                        </button>
                    </div>

                    {activeTab === 'lineups' ? renderLineups() : renderStats()}
                </>
            )}
        </div>
    );
};

export default MatchDetails;