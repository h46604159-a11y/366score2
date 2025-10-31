
import { API_BASE_URL, API_KEY } from '../constants';
import { FixtureResponse, Lineup, Statistic } from '../types';

const headers = {
    'x-rapidapi-host': 'v3.football.api-sports.io',
    'x-rapidapi-key': API_KEY,
};

async function fetchData<T>(endpoint: string): Promise<T> {
    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, { headers });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.errors && Object.keys(data.errors).length > 0) {
            console.error('API Errors:', data.errors);
            throw new Error('API returned an error.');
        }
        return data.response;
    } catch (error) {
        console.error(`Failed to fetch from ${endpoint}:`, error);
        throw error;
    }
}

export const getFixturesByDate = (date: string): Promise<FixtureResponse[]> => {
    return fetchData<FixtureResponse[]>(`fixtures?date=${date}`);
};

export const getLineups = (fixtureId: number): Promise<Lineup[]> => {
    return fetchData<Lineup[]>(`fixtures/lineups?fixture=${fixtureId}`);
};

export const getStatistics = (fixtureId: number): Promise<Statistic[]> => {
    return fetchData<Statistic[]>(`fixtures/statistics?fixture=${fixtureId}`);
};
