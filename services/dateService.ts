
// Returns the current date in the user's local timezone, but as a Date object.
export const getLocalDate = (): Date => {
    return new Date();
};

// Formats a Date object into 'YYYY-MM-DD' string.
export const getFormattedDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

// Formats a date string (from API) into a localized time string.
export const getLocalTime = (dateString: string, lang: 'en' | 'ar'): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    });
};
