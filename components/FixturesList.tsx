
import React, { useState, useEffect, useMemo } from 'react';
import { getFixturesByDate } from '../services/apiService';
import { FixtureResponse, Language, League } from '../types';
import FixtureCard from './FixtureCard';
import Loader from './Loader';
import { translations } from '../constants';

interface FixturesListProps {
    date: string;
    onSelectFixture: (id: number) => void;
    language: Language;
}

// Fix: Extracted the inline object type to a type alias for reuse and clarity.
type LeagueWithFixtures = {
    league: League;
    fixtures: FixtureResponse[];
};

interface GroupedFixtures {
    [leagueId: string]: LeagueWithFixtures;
}

// Define the order of priority leagues by their API ID
const PRIORITY_LEAGUE_IDS = [
    140, // La Liga (Spain)
    39,  // Premier League (England)
    61,  // Ligue 1 (France)
    200, // Botola Pro (Morocco)
    135, // Serie A (Italy)
];

const FixturesList: React.FC<FixturesListProps> = ({ date, onSelectFixture, language }) => {
    const [fixtures, setFixtures] = useState<FixtureResponse[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFixtures = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getFixturesByDate(date);
                setFixtures(data);
            } catch (err) {
                setError(translations[language].error);
            } finally {
                setLoading(false);
            }
        };

        fetchFixtures();
    }, [date, language]);

    const groupedFixtures = useMemo(() => {
        return fixtures.reduce((acc, fixture) => {
            const leagueId = fixture.league.id.toString();
            if (!acc[leagueId]) {
                acc[leagueId] = {
                    league: fixture.league,
                    fixtures: [],
                };
            }
            acc[leagueId].fixtures.push(fixture);
            return acc;
        }, {} as GroupedFixtures);
    }, [fixtures]);

    if (loading) {
        return <Loader message={translations[language].loading} />;
    }

    if (error) {
        return <p className="text-center text-red-400 mt-8">{error}</p>;
    }

    if (fixtures.length === 0) {
        return <p className="text-center text-gray-400 mt-8">{translations[language].noMatches}</p>;
    }

    return (
        <div className="space-y-6">
            {Object.values(groupedFixtures)
                .sort((a: LeagueWithFixtures, b: LeagueWithFixtures) => {
                    const indexA = PRIORITY_LEAGUE_IDS.indexOf(a.league.id);
                    const indexB = PRIORITY_LEAGUE_IDS.indexOf(b.league.id);

                    // If a league is not in the priority list, its index is -1. 
                    // We treat -1 as Infinity to push it to the bottom.
                    const sortA = indexA === -1 ? Infinity : indexA;
                    const sortB = indexB === -1 ? Infinity : indexB;

                    // If the sort priorities are different, sort by them.
                    if (sortA !== sortB) {
                        return sortA - sortB;
                    }
                    
                    // If both are non-priority leagues, fallback to alphabetical sorting.
                    return a.league.name.localeCompare(b.league.name);
                })
                .map(({ league, fixtures: leagueFixtures }: LeagueWithFixtures) => (
                <div key={league.id}>
                    <div className="flex items-center gap-3 p-3 mb-4 bg-black/40 backdrop-blur-sm rounded-lg shadow-lg sticky top-[76px] z-10">
                        {league.flag && <img src={league.flag} alt={league.country} className="w-6 h-6 rounded-full object-cover" />}
                        <img src={league.logo} alt={league.name} className="w-6 h-6 object-contain" />
                        <div>
                            <h3 className="font-bold text-white text-base sm:text-lg">{league.name}</h3>
                            <p className="text-xs sm:text-sm text-gray-300">{league.country}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        {leagueFixtures
                          .sort((a, b) => a.fixture.timestamp - b.fixture.timestamp)
                          .map((fixtureData) => (
                            <FixtureCard
                                key={fixtureData.fixture.id}
                                fixtureData={fixtureData}
                                onSelectFixture={onSelectFixture}
                                language={language}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FixturesList;