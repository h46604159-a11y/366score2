
import { Language } from "./types";

export const API_KEY = '872ecb8087056fcaad1f99226af747af';
export const API_BASE_URL = 'https://v3.football.api-sports.io';

export const translations: Record<Language, Record<string, string>> = {
  ar: {
    title: 'مواعيد المباريات مباشرة',
    today: 'مباريات اليوم',
    yesterday: 'مباريات الأمس',
    tomorrow: 'مباريات الغد',
    loading: 'جاري التحميل...',
    noMatches: 'لا توجد مباريات في هذا اليوم.',
    error: 'حدث خطأ أثناء جلب البيانات.',
    back: 'العودة',
    lineups: 'التشكيلة',
    stats: 'الإحصائيات',
    noLineups: 'التشكيلة غير متوفرة.',
    noStats: 'الإحصائيات غير متوفرة.',
    startingXI: 'التشكيلة الأساسية',
    substitutes: 'البدلاء',
    coach: 'المدرب',
  },
  en: {
    title: 'Live Football Fixtures',
    today: 'Today\'s Matches',
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    loading: 'Loading...',
    noMatches: 'No matches found for this day.',
    error: 'An error occurred while fetching data.',
    back: 'Back',
    lineups: 'Lineups',
    stats: 'Stats',
    noLineups: 'Lineups are not available.',
    noStats: 'Statistics are not available.',
    startingXI: 'Starting XI',
    substitutes: 'Substitutes',
    coach: 'Coach',
  }
};
